import React from 'react';
import { motion } from 'framer-motion';
import {
    Plus, Search, Calendar,
    BarChart3, FileText, ChevronRight,
    Clock, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const projects = [
        { name: 'E-Commerce Marketplace', date: 'Oct 12, 2026', score: 84, type: 'React/Node' },
        { name: 'Stock Prediction Model', date: 'Sep 28, 2026', score: 92, type: 'Python/ML' },
        { name: 'Hospital Management System', date: 'Sep 05, 2026', score: 76, type: 'Java' },
        { name: 'Personal Portfolio Web', date: 'Aug 21, 2026', score: 88, type: 'HTML/CSS' },
    ];

    return (
        <div className="container pt-32 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black mb-2">Student <span className="text-primary">Dashboard</span></h1>
                    <p className="text-slate-500 font-medium">Welcome back, Alex. You have <span className="text-slate-900">4 active projects</span>.</p>
                </div>
                <Link to="/upload" className="btn btn-primary px-8 py-4">
                    <Plus size={20} /> New Analysis
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Stats & Activity Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="card bg-slate-900 shadow-2xl shadow-blue-900/10 border-none text-white p-8 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 mb-6 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
                                <BarChart3 size={24} />
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Academic Standing</div>
                            <div className="text-5xl font-black mb-4">85.4</div>
                            <div className="flex items-center gap-2 text-xs font-bold text-green-400 bg-green-400/10 w-fit px-3 py-1 rounded-full border border-green-400/20">
                                <ArrowUpRight size={14} /> +2.4% Progress
                            </div>
                        </div>
                        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
                    </div>

                    <div className="card border-slate-100 p-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                            <Clock size={14} /> Performance Feed
                        </h3>
                        <div className="space-y-8">
                            {[
                                { icon: FileText, text: 'Report Generated', time: '2h ago', color: 'text-blue-600', bg: 'bg-blue-50' },
                                { icon: Plus, text: 'Project Uploaded', time: '1d ago', color: 'text-green-600', bg: 'bg-green-50' },
                                { icon: BarChart3, text: 'Score Updated', time: '3d ago', color: 'text-purple-600', bg: 'bg-purple-50' }
                            ].map((activity, i) => (
                                <div key={i} className="flex gap-4 items-start relative">
                                    {i !== 2 && <div className="absolute left-4 top-10 w-0.5 h-6 bg-slate-100" />}
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activity.bg} ${activity.color} shadow-sm`}>
                                        <activity.icon size={16} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-slate-800 leading-tight">{activity.text}</div>
                                        <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{activity.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Grid Section */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-2xl font-black text-slate-900">Your Portfolio</h2>
                        <div className="relative w-full sm:w-auto">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search repository..."
                                className="w-full sm:w-72 py-3 pl-12 pr-6 text-sm bg-white border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="card group hover:border-blue-500/30 transition-all p-8"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="px-2 py-0.5 bg-blue-50 text-[10px] font-black uppercase text-blue-600 rounded-md tracking-wider border border-blue-100">
                                                {p.type}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{p.name}</h3>
                                    </div>
                                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-sm border ${p.score >= 90 ? 'bg-green-50 border-green-100 text-green-600' :
                                        p.score >= 80 ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-orange-50 border-orange-100 text-orange-600'
                                        }`}>
                                        <span className="text-xl font-black leading-none">{p.score}</span>
                                        <span className="text-[8px] font-black uppercase opacity-60 tracking-tighter mt-1">Score</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <span>Readiness</span>
                                        <span>{p.score}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${p.score}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={`h-full rounded-full ${p.score >= 90 ? 'bg-green-500' : p.score >= 80 ? 'bg-blue-600' : 'bg-orange-500'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                        <Calendar size={12} className="text-slate-300" /> {p.date}
                                    </div>
                                    <Link to="/report" className="text-blue-600 font-bold text-xs uppercase flex items-center gap-2 hover:gap-4 transition-all">
                                        Open Insight <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
