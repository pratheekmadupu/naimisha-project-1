import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Identity confirmed. I am your Cyber Assistant. How can I help you secure your digital workspace today?' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        const newMessages = [...messages, { type: 'user', text: userMsg }];
        setMessages(newMessages);
        setInput('');

        try {
            // Map messages to API format
            const apiMessages = newMessages.map(m => ({
                role: m.type === 'user' ? 'user' : 'assistant',
                content: m.text
            }));

            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages })
            });

            const data = await response.json();
            const reply = data.choices[0].message.content;

            setMessages(prev => [...prev, { type: 'bot', text: reply }]);
        } catch (err) {
            console.error('Chat Error:', err);
            setMessages(prev => [...prev, { type: 'bot', text: "Connection error. Ensure the AI proxy server is running on port 3001." }]);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#00ff9d] text-black shadow-[0_0_20px_rgba(0,255,157,0.5)] flex items-center justify-center z-[100] hover:scale-110 transition-transform cursor-pointer"
            >
                <MessageSquare size={28} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#05060b] animate-pulse" />
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed bottom-24 right-6 w-[400px] h-[600px] max-w-[calc(100vw-48px)] flex flex-col glass-card border-[#00ff9d]/30 z-[100] overflow-hidden shadow-2xl shadow-black/50"
                    >
                        {/* Header */}
                        <div className="bg-[#00ff9d] p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center">
                                    <Bot size={20} className="text-black" />
                                </div>
                                <div>
                                    <h3 className="text-black font-black text-sm uppercase tracking-tighter">Cyber Assistant</h3>
                                    <div className="flex items-center gap-1.5 text-[9px] text-black/60 font-mono font-bold uppercase">
                                        <div className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" /> Live Now
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-black/50 hover:text-black transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.type === 'user'
                                        ? 'bg-[#7b61ff] text-white rounded-tr-none'
                                        : 'bg-white/5 border border-white/5 text-slate-300 rounded-tl-none'
                                        }`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-white/[0.02]">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-[#05060b] border border-white/10 rounded-xl py-4 pl-5 pr-12 text-sm outline-none focus:border-[#00ff9d]/50 transition-colors"
                                    placeholder="Ask about threats, CVEs..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#00ff9d] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="mt-3 text-[9px] text-slate-600 flex items-center justify-center gap-2 uppercase tracking-widest font-mono">
                                <Sparkles size={10} /> Powered by Cyber Intelligence AI v4.0
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
