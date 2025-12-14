import { useState } from "react";
import axios from "axios";
import { Bot, Send, User } from "lucide-react";

type Message = {
    role: "user" | "ai";
    text: string;
};

export default function AIChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/api/ai/chat", {
                message: input,
            });

            const aiMessage: Message = {
                role: "ai",
                text: res.data.reply,
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "ai", text: "❌ AI not available" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[800px] flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-800">

            {/* Header */}
            <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-gray-200 px-6 py-4 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="font-semibold text-lg text-gray-900">AI Assistant</h1>
                    <p className="text-xs text-gray-500">Free • Smart • Fast</p>
                </div>
            </header>

            {/* Messages */}
            <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
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

                {/* Typing indicator */}
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

            {/* Input */}
            <footer className="p-4 border-t border-gray-200 bg-white/90 backdrop-blur-xl">
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
