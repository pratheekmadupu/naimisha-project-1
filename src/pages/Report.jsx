import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    CheckCircle2, AlertCircle, Terminal,
    Lightbulb, BookOpen, Layers,
    ChevronRight, Download, Share2
} from 'lucide-react';

const Report = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const reportData = location.state?.report;
    const fileName = location.state?.fileName || "Untitled_Project";

    // Redirect if no report data (e.g., direct link access)
    useEffect(() => {
        if (!reportData) {
            navigate('/upload');
        }
    }, [reportData, navigate]);

    if (!reportData) return null;

    const {
        globalScore, grade, technicalAccuracy,
        securityScore, documentationScore, efficiency,
        issues, suggestions, advancedRecommendation
    } = reportData;

    return (
        <div className="container pt-32 pb-20">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12 animate-fade-up">
                <div>
                    <h1 className="text-4xl font-black mb-2">Analysis <span className="text-[#2563EB]">Report</span></h1>
                    <p className="text-slate-500 font-medium">Project: <span className="text-slate-900 font-bold">{fileName}</span></p>
                </div>
                <div className="flex gap-4">
                    <button className="btn btn-secondary border-none shadow-sm"><Share2 size={18} /> Share</button>
                    <button className="btn btn-primary shadow-xl shadow-blue-500/20 px-10"><Download size={18} /> Download Full Report</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Premium Score Gauge */}
                <div className="card lg:col-span-1 flex flex-col items-center justify-center p-12 text-center bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <CheckCircle2 size={120} />
                    </div>
                    <div className="relative w-52 h-52 flex items-center justify-center mb-8">
                        <svg className="w-full h-full transform -rotate-90">
                            {/* Background track */}
                            <circle cx="104" cy="104" r="92" stroke="#f1f5f9" strokeWidth="16" fill="transparent" strokeLinecap="round" />
                            {/* Animated progress bar */}
                            <motion.circle
                                initial={{ strokeDashoffset: 2 * Math.PI * 92 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 92 * (1 - globalScore / 100) }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                cx="104" cy="104" r="92" stroke="url(#gradient)" strokeWidth="16" fill="transparent"
                                strokeDasharray={2 * Math.PI * 92}
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#2563eb" />
                                    <stop offset="100%" stopColor="#7c3aed" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-6xl font-black text-slate-900 leading-none"
                            >
                                {globalScore}
                            </motion.span>
                            <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.3em] mt-2">Score Units</span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Grade: <span className="text-blue-600">{grade}</span></h3>
                    <p className="text-sm text-slate-500 leading-relaxed px-4">Based on AI benchmarking against industry-standard metrics.</p>
                </div>

                {/* Summary Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: 'Technical Accuracy', value: `${technicalAccuracy}%`, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Security Threats', value: `${securityScore} Detected`, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
                        { label: 'Documentation', value: `${documentationScore}%`, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Runtime Efficiency', value: efficiency, icon: Terminal, color: 'text-purple-600', bg: 'bg-purple-50' }
                    ].map((stat, i) => (
                        <div key={i} className="card group flex items-center gap-6 p-10 hover:border-blue-200">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                                <stat.icon size={32} />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-3">{stat.label}</div>
                                <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Issues List */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                        <AlertCircle className="text-red-500" /> Critical Review
                    </h2>
                    {issues.map((issue, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="card border-l-4 border-l-slate-200"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black uppercase text-slate-400 border border-slate-100">{issue.type}</div>
                                <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${issue.severity === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                                    }`}>{issue.severity} Priority</div>
                            </div>
                            <h4 className="text-lg font-black text-slate-800 mb-2">{issue.title}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">{issue.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Improvement Suggestions */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                        <Lightbulb className="text-amber-400" /> Transformation Steps
                    </h2>
                    <div className="card bg-[#0f172a] text-white border-none shadow-2xl">
                        <ul className="space-y-8">
                            {suggestions.map((s, i) => (
                                <li key={i} className="flex gap-5 group items-start">
                                    <div className="mt-1 w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-500/30">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h5 className="font-black group-hover:text-blue-400 transition-colors uppercase text-xs tracking-[0.1em]">{s.title}</h5>
                                        <p className="text-slate-400 text-sm mt-2 leading-relaxed font-medium">{s.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="card border-blue-100 bg-blue-50/30 border-dashed relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-sm font-black flex items-center gap-2 text-blue-600 mb-3 uppercase tracking-wider">
                                <Layers size={18} /> Architecture Evolution
                            </h4>
                            <p className="text-sm text-slate-600 mb-5 leading-relaxed font-medium italic">
                                "{advancedRecommendation}"
                            </p>
                            <button className="text-blue-600 font-black text-[10px] uppercase flex items-center gap-2 hover:gap-4 transition-all">
                                Load Implementation Blueprint <ChevronRight size={14} />
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
