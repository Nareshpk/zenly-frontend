/* eslint-disable no-loop-func */
import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
    role: "user" | "ai";
    text: string;
};

export default function AIChat() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const aiIndexRef = useRef<number>(-1);
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userText = input.trim();
        setInput("");
        setLoading(true);

        // 🔹 Get user email from localStorage
        const authString = localStorage.getItem("auth");
        const auth = authString ? JSON.parse(authString) : null;
        const email = auth?.user?.email;

        // 1️⃣ Add user + placeholder AI message
        setMessages((prev: any[]) => {
            aiIndexRef.current = prev.length + 1;

            return [
                ...prev,
                { role: "user", text: userText },
                { role: "ai", text: "" },
            ];
        });

        try {
            const response = await fetch(
                "http://localhost:5000/api/ai/chat-stream",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        question: userText,   // ✅ FIXED KEY
                        email: email          // ✅ SEND EMAIL
                    }),
                }
            );
            setLoading(false);
            if (!response.body) throw new Error("No stream body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let aiText = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (!line.startsWith("data: ")) continue;

                    const data = line.replace("data: ", "");

                    if (data === "[DONE]") {
                        setLoading(false);
                        return;
                    }

                    aiText += data;

                    setMessages((prev: any[]) => {
                        const updated = [...prev];
                        const idx = aiIndexRef.current;

                        if (updated[idx]) {
                            updated[idx] = { role: "ai", text: aiText };
                        }

                        return updated;
                    });
                }
            }
        } catch (err) {
            console.error("Streaming error:", err);

            setMessages((prev: any[]) => {
                const updated = [...prev];
                const idx = aiIndexRef.current;

                if (updated[idx]) {
                    updated[idx] = {
                        role: "ai",
                        text: "❌ AI service unavailable",
                    };
                }

                return updated;
            });
        } finally {
            setLoading(false);
        }
    };




    useEffect(() => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, loading]);



    return (
        <div className="h-full  flex flex-col overflow-hidden">

            {/* Header */}
            <header className="flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="font-semibold text-lg text-gray-900">AI Assistant</h1>
                    <p className="text-xs text-gray-500">Free • Smart • Fast</p>
                </div>
            </header>

            {/* Messages (ONLY THIS SCROLLS) */}
            <main ref={scrollRef}
                className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

                {messages.map((m: any, i: number) => {
                    const isUser = m.role === "user";

                    return (
                        <div
                            key={i}
                            className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"
                                }`}
                        >
                            {!isUser && (
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow">
                                    <Bot size={18} className="text-white" />
                                </div>
                            )}

                            <div
                                className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-md text-sm leading-relaxed ${isUser
                                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-md"
                                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                                    }`}
                            >
                                {m.text}
                            </div>

                            {isUser && (
                                <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm">
                                    <User size={18} className="text-gray-600" />
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Typing Indicator */}
                {loading && (
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow">
                            <Bot size={18} className="text-white" />
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm text-gray-500 animate-pulse shadow-sm">
                            AI is thinking…
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="flex-shrink-0">
                <div className="max-w-4xl mx-auto flex items-center gap-3">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                if (!loading && input.trim()) {
                                    sendMessage();
                                }
                            }
                        }}
                        placeholder="Ask anything…"
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
                    />

                    <button
                        onClick={sendMessage}
                        disabled={!input || loading}
                        className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg hover:scale-105 transition disabled:opacity-50"
                    >
                        <Send size={18} className="text-white" />
                    </button>
                </div>
            </footer>
        </div>

    );
}
