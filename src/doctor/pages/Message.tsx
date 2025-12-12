import React, { useState, useRef, useEffect } from "react";
import {
    Search,
    MoreVertical,
    Send,
    Paperclip,
    Smile,
    Mic,
    Play,
    Check,
    Clock,
} from "lucide-react";

type User = { id: string; name: string; avatar?: string; online?: boolean };

type Message = {
    id: string;
    from: string; // user id
    text?: string;
    time?: string;
    type?: "text" | "image" | "audio" | "link";
    attachment?: string; // url for image/audio
};

const sampleUsers: User[] = [
    { id: "u1", name: "Adrian Marshall", avatar: "https://i.pravatar.cc/40?img=5", online: true },
    { id: "u2", name: "Dr Joseph Boyd", avatar: "https://i.pravatar.cc/40?img=6", online: false },
    { id: "u3", name: "Dr Edalin Hendry", avatar: "https://i.pravatar.cc/40?img=7", online: true },
    { id: "u4", name: "Kelly Stevens", avatar: "https://i.pravatar.cc/40?img=8", online: true },
    { id: "me", name: "You", avatar: "https://i.pravatar.cc/40?img=12", online: true },
];

const initialMessages: Message[] = [
    { id: "m1", from: "u3", type: "text", text: "Hello Doctor, could you tell a diet plan that suits for me?", time: "8:16 PM" },
    { id: "m2", from: "u3", type: "audio", attachment: "", time: "9:45 AM" },
    { id: "m3", from: "me", type: "text", text: "https://www.youtube.com/watch?v=G...", time: "9:47 AM" },
    { id: "m4", from: "me", type: "image", attachment: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg", time: "9:47 AM" },
];

export default function ChatUI() {
    const [users] = useState<User[]>(sampleUsers);
    const [selected, setSelected] = useState<User>(sampleUsers[2]); // Dr Edalin
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, selected]);

    function sendMessage() {
        if (!input.trim()) return;
        const msg: Message = { id: Date.now().toString(), from: "me", text: input.trim(), type: "text", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages((s) => [...s, msg]);
        setInput("");
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">Messages</h1>
                <div className="flex items-center gap-3 text-gray-600">
                    <Search />
                    <MoreVertical />
                </div>
            </div>
            <div className="w-full px-6 grid grid-cols-4 gap-6">
                {/* Left: Chats */}
                <aside className="col-span-1 bg-white rounded-lg shadow p-4 h-[80vh] overflow-hidden">
                    <div className="mb-3">
                        <h3 className="text-lg font-semibold">All Chats</h3>
                        <div className="mt-2 relative">
                            <input placeholder="Search" className="w-full border rounded-md px-3 py-2 pr-10 text-sm" />
                            <Search className="absolute right-3 top-3 text-gray-400" />
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">Online Now</div>
                            <button className="text-xs text-indigo-600">View All</button>
                        </div>

                        <div className="flex gap-2 overflow-x-auto py-2">
                            {users.slice(0, 6).map((u) => (
                                <div key={u.id} className="flex flex-col items-center text-xs">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                        <img src={u.avatar} alt={u.name} className="w-full h-full object-cover rounded-full" />
                                        <span className={`absolute right-0 bottom-0 w-3 h-3 rounded-full border-2 border-white ${u.online ? 'bg-green-400' : 'bg-gray-300'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 text-sm font-medium">Pinned Chat</div>
                        <div className="mt-2 space-y-2">
                            {users.slice(0, 3).map((u) => (
                                <div key={u.id} className="flex items-center gap-3 border rounded-md p-2">
                                    <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 text-sm">
                                        <div className="font-medium">{u.name}</div>
                                        <div className="text-xs text-gray-500">Have you called them?</div>
                                    </div>
                                    <div className="text-xs text-green-500">Just Now</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 text-sm font-medium">Recent Chat</div>
                        <div className="mt-2 space-y-2 overflow-auto h-36">
                            {users.slice(3).map((u) => (
                                <div key={u.id} className="flex items-center gap-3 border rounded-md p-2">
                                    <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 text-sm">
                                        <div className="font-medium">{u.name}</div>
                                        <div className="text-xs text-gray-500">{u.online ? 'Online' : 'Yesterday'}</div>
                                    </div>
                                    <div className="text-xs text-slate-600">{u.online ? '•' : ''}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Right: Chat panel */}
                <main className="col-span-3 bg-white rounded-lg shadow p-4 h-[80vh] flex flex-col">
                    {/* Header */}
                    <header className="flex items-center gap-4 border-b pb-3">
                        <img src={selected.avatar} alt={selected.name} className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                            <div className="font-semibold">{selected.name}</div>
                            <div className="text-xs text-green-500">Online</div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Search />
                            <MoreVertical />
                        </div>
                    </header>

                    {/* Messages area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                        <div className="flex justify-center">
                            <span className="bg-gray-100 text-xs text-gray-600 px-3 py-1 rounded-full">Today, March 25</span>
                        </div>

                        {messages.map((m) => {
                            const from = users.find((u) => u.id === m.from) || { name: 'Unknown', avatar: '' };
                            const isMe = m.from === 'me';
                            return (
                                <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-3`}>
                                    {!isMe && <img src={from.avatar} className="w-8 h-8 rounded-full" />}

                                    <div className={`${isMe ? 'text-right' : 'text-left'}`}>
                                        <div className={`inline-block max-w-[60ch] p-3 rounded-2xl ${isMe ? 'bg-indigo-50 text-slate-800' : 'bg-white border border-gray-100 text-slate-800'}`}>
                                            {m.type === 'text' && <div className="text-sm">{m.text}</div>}

                                            {m.type === 'image' && (
                                                <div className="w-full max-w-xs">
                                                    <img src={m.attachment} alt="att" className="rounded-lg shadow-sm" />
                                                </div>
                                            )}

                                            {m.type === 'audio' && (
                                                <div className="flex items-center gap-3">
                                                    <button className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center"><Play /></button>
                                                    <div className="text-sm">0:05</div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-xs text-gray-400 mt-1">{m.time}</div>
                                    </div>

                                    {isMe && <img src={users.find(u => u.id === 'me')!.avatar} className="w-8 h-8 rounded-full" />}
                                </div>
                            );
                        })}
                    </div>

                    {/* Composer */}
                    <div className="border-t pt-3 mt-3 flex items-center gap-3">
                        <button className="p-2 rounded-md hover:bg-gray-100"><Smile /></button>
                        <button className="p-2 rounded-md hover:bg-gray-100"><Paperclip /></button>
                        <button className="p-2 rounded-md hover:bg-gray-100"><Mic /></button>

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message here..."
                            className="flex-1 px-4 py-2 border rounded-full focus:outline-none text-sm"
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } }}
                        />

                        <button onClick={sendMessage} className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center"><Send /></button>
                    </div>
                </main>
            </div>
        </div>
    );
}
