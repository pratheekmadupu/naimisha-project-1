import React from 'react';
import Navbar from './Navbar';
import ChatBot from '../chat/ChatBot';
import CyberBackground from '../common/CyberBackground';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen">
            <CyberBackground />
            <Navbar />
            <main className="relative z-10">
                {children}
            </main>
            <ChatBot />

            <footer className="relative z-10 py-12 border-t border-slate-200 bg-white">
                <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-500 font-medium text-xs uppercase tracking-widest">
                        © 2026 ProjectScan AI // Intelligent Academic Analysis
                    </div>
                    <div className="flex gap-8 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
                        <a href="#" className="hover:text-[#2563EB]">Privacy Policy</a>
                        <a href="#" className="hover:text-[#2563EB]">Protocol Terms</a>
                        <a href="#" className="hover:text-[#2563EB]">API Access</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
