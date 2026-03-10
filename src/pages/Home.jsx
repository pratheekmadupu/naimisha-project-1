import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Code2, Lightbulb, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="pt-24">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-8"
                            >
                                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                Trusted by 50,000+ Students
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-[1.1]"
                            >
                                AI Project Analyzer for <span className="text-gradient">Students.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0"
                            >
                                Upload your academic projects and let our AI provide detailed analysis,
                                detect technical errors, and suggest improvements to boost your score.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap justify-center lg:justify-start gap-4"
                            >
                                <Link to="/upload" className="btn btn-primary px-8 py-4 text-lg">
                                    Upload Project <Rocket size={20} />
                                </Link>
                                <Link to="/about" className="btn btn-secondary px-8 py-4 text-lg">
                                    Learn More <Play size={18} fill="currentColor" />
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex-1 relative"
                        >
                            <div className="relative z-10 p-4 rounded-[40px] bg-white shadow-2xl border border-slate-100">
                                <img
                                    src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&q=80&w=800"
                                    alt="AI Analysis Dashboard"
                                    className="rounded-[32px] w-full"
                                />
                                <div className="absolute -bottom-10 -left-10 p-6 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center gap-4 animate-float">
                                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">Analysis Complete</div>
                                        <div className="text-xs text-slate-500">Score: 92/100</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#2563EB]/10 blur-[120px] rounded-full" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">Everything you need to <span className="text-[#2563EB]">Excel</span></h2>
                        <p className="text-lg text-slate-500 text-center">
                            Powerful tools designed to help students and developers refine their academic projects.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'AI Analysis', desc: 'Deep contextual understanding of your project scope.', icon: Rocket, color: 'blue' },
                            { title: 'Error Detection', desc: 'Auto-identify technical, logical, and formatting bugs.', icon: ShieldCheck, color: 'purple' },
                            { title: 'Code Review', desc: 'Professional insights into your codebase and logic.', icon: Code2, color: 'cyan' },
                            { title: 'Smart Suggestions', desc: 'Actionable steps to transform your work into industry-level.', icon: Lightbulb, color: 'orange' },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -8 }}
                                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group transition-all"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform bg-${feature.color}-500 text-white`}>
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-slate-50">
                <div className="container">
                    <h2 className="text-center text-4xl font-black mb-20">Streamlined <span className="text-[#2563EB]">Workflow</span></h2>
                    <div className="grid md:grid-cols-3 gap-12 relative">
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-slate-200 -z-0" />
                        {[
                            { step: '01', title: 'Upload Project', desc: 'Drag and drop your project files (ZIP, PDF, DOCX).' },
                            { step: '02', title: 'AI Analysis', desc: 'Our engine scans for errors, logic, and structure.' },
                            { step: '03', title: 'Get Report', desc: 'Download a detailed report with a project score.' }
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-white border-8 border-slate-50 flex items-center justify-center text-2xl font-black text-[#2563EB] shadow-lg mb-8">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 bg-white">
                <div className="container">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800"
                                alt="Students Collaborating"
                                className="rounded-[40px] shadow-2xl"
                            />
                        </div>
                        <div className="flex-1 space-y-8">
                            <h2 className="text-4xl font-black leading-tight">Why Students <span className="text-[#2563EB]">Choose Us?</span></h2>
                            <div className="space-y-6">
                                {[
                                    'Save hours of manual review and error checking.',
                                    'Get industry-standard feedback before submission.',
                                    'Identify critical security flaws in your code.',
                                    'Achieve higher grades with data-driven improvements.'
                                ].map((benefit, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                            <ArrowRight size={14} />
                                        </div>
                                        <p className="text-slate-600 font-medium">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 py-16 text-white">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                    <Rocket size={18} />
                                </div>
                                <span className="text-lg font-bold">ProjectScan AI</span>
                            </div>
                            <p className="text-slate-400 text-sm">
                                Empowering the next generation of developers and researchers.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Platform</h4>
                            <ul className="space-y-4 text-slate-400 text-sm">
                                <li><Link to="/upload" className="hover:text-blue-400">Upload</Link></li>
                                <li><Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
                                <li><Link to="/reports" className="hover:text-blue-400">Reports</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Support</h4>
                            <ul className="space-y-4 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-blue-400">Docs</a></li>
                                <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
                        © 2026 ProjectScan AI // Built for the future of education
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
