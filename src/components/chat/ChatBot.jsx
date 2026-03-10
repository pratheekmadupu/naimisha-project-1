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
                className="fixed bottom-6 right-6 w-16 h-16 rounded-2xl bg-primary text-white shadow-xl shadow-blue-500/20 flex items-center justify-center z-[100] hover:scale-110 active:scale-95 transition-all cursor-pointer border-none"
            >
                <div className="relative">
                    <MessageSquare size={28} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                </div>
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50, x: 20 }}
                        className="fixed bottom-24 right-6 w-[400px] h-[600px] max-w-[calc(100vw-48px)] flex flex-col bg-white rounded-[32px] border border-slate-200 z-[100] overflow-hidden shadow-2xl shadow-blue-900/10"
                    >
                        {/* Header */}
                        <div className="bg-primary p-6 flex justify-between items-center text-white">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Bot size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-wider">AI Assistant</h3>
                                    <div className="flex items-center gap-1.5 text-[9px] opacity-80 font-bold uppercase tracking-widest mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live Now
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${m.type === 'user'
                                        ? 'bg-primary text-white shadow-lg shadow-blue-500/10 rounded-tr-none'
                                        : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none'
                                        }`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-6 pr-14 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-blue-500/20 border-none cursor-pointer">
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-4 text-[10px] text-slate-400 flex items-center justify-center gap-2 font-black uppercase tracking-[0.15em]">
                                <Sparkles size={12} className="text-blue-500" /> ProjectScan Intelligence v2.0
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
