import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Database, ExternalLink, Filter, RotateCcw } from 'lucide-react';
import axios from 'axios';

const Intel = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cveQuery, setCveQuery] = useState('');
    const [cveResults, setCveResults] = useState([]);
    const [isSearchingCve, setIsSearchingCve] = useState(false);

    // Sample data fallback
    const sampleNews = [
        { title: 'New Ransomware Variant "ShadowVolt" Detected', source: 'Global Threat Lab', severity: 'Critical', date: '2026-03-09' },
        { title: 'Major Bank Leak: 5M Customer Records at Risk', source: 'CyberWatch', severity: 'High', date: '2026-03-08' },
        { title: 'Zero-Day Vulnerability in Linux Kernel Patched', source: 'Security Weekly', severity: 'Medium', date: '2026-03-07' },
        { title: 'Phishing Campaign Targeting Remote Workers', source: 'ThreatIntel', severity: 'High', date: '2026-03-06' },
    ];

    useEffect(() => {
        // In real app, fetch from backend proxy
        setTimeout(() => {
            setNews(sampleNews);
            setLoading(false);
        }, 1000);
    }, []);

    const searchCve = async (e) => {
        e.preventDefault();
        if (!cveQuery) return;
        setIsSearchingCve(true);
        try {
            // Calling NVD API directly (or via your proxy)
            const res = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${cveQuery}`);
            const vulnerabilities = res.data.vulnerabilities || [];
            setCveResults(vulnerabilities.map(v => ({
                id: v.cve.id,
                desc: v.cve.descriptions[0].value,
                score: v.cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseScore || 'N/A'
            })).slice(0, 5));
        } catch (err) {
            console.error(err);
            setCveResults([{ id: 'ERROR', desc: 'NVD API unreachable or rate-limited. Using sample.', score: '!!' }]);
        } finally {
            setIsSearchingCve(false);
        }
    };

    return (
        <div className="container pt-40 pb-20">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* News Feed - Left Side */}
                <div className="flex-1 space-y-8">
                    <div className="flex justify-between items-end border-b border-white/5 pb-6">
                        <div>
                            <h2 className="text-3xl font-black mb-2">THREAT <span className="text-[#00ff9d]">FEED</span></h2>
                            <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">Global Security Events</p>
                        </div>
                        <button className="text-xs text-[#00ff9d] flex items-center gap-2 hover:underline">
                            <RotateCcw size={14} /> Refresh Feed
                        </button>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="glass-card h-24 animate-pulse opacity-50" />)
                        ) : (
                            news.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-6 flex items-center justify-between group cursor-pointer"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${item.severity === 'Critical' ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]' :
                                                    item.severity === 'High' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                                                }`}>
                                                {item.severity}
                                            </span>
                                            <span className="text-slate-500 text-[10px] font-mono">{item.date}</span>
                                        </div>
                                        <h3 className="font-bold text-lg group-hover:text-[#00ff9d] transition-colors">{item.title}</h3>
                                        <p className="text-sm text-slate-500">{item.source}</p>
                                    </div>
                                    <ExternalLink size={20} className="text-slate-700 group-hover:text-[#00ff9d]" />
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* CVE Search - Right Side */}
                <div className="w-full lg:w-96 space-y-8">
                    <div className="glass-card p-8 border-[#7b61ff]/20">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Database className="text-[#7b61ff]" size={20} /> CVE LOOKUP
                        </h3>

                        <form onSubmit={searchCve} className="space-y-4 mb-8">
                            <div className="relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="e.g. Log4j, OpenSSL..."
                                    className="w-full bg-[#05060b] border border-white/10 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-[#7b61ff]"
                                    value={cveQuery}
                                    onChange={e => setCveQuery(e.target.value)}
                                />
                            </div>
                            <button disabled={isSearchingCve} className="btn bg-[#7b61ff] text-white w-full shadow-[0_0_15px_rgba(123,97,255,0.3)]">
                                {isSearchingCve ? 'Searching NIST...' : 'Query Database'}
                            </button>
                        </form>

                        <div className="space-y-4">
                            {cveResults.length > 0 ? (
                                cveResults.map((cve, i) => (
                                    <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[#7b61ff] font-mono font-bold">{cve.id}</span>
                                            <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-slate-400">Score: {cve.score}</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">{cve.desc}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-slate-600">
                                    <Database size={40} className="mx-auto mb-4 opacity-10" />
                                    <p className="text-xs uppercase tracking-widest font-mono">No data queried</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="glass-card p-6 border-yellow-500/20 bg-yellow-500/5">
                        <h4 className="text-sm font-bold text-yellow-500 mb-2 flex items-center gap-2">
                            <Filter size={16} /> ADVISORY
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Vulnerability data is pulled live from the NVD (National Vulnerability Database).
                            Rate limits may apply if excessive queries are performed.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Intel;
