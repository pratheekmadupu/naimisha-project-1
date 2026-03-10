import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Check, File, AlertCircle, Sparkles, TrendingUp, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UploadPage = () => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(0); // 0: upload, 1: processing
    const [reportData, setReportData] = useState(null);
    const navigate = useNavigate();

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const startAnalysis = async () => {
        setUploading(true);
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            if (p <= 90) setProgress(p);
        }, 50);

        try {
            const response = await axios.post('http://localhost:3001/api/analyze', {
                fileName: file.name || 'Project_Submission',
                fileType: file.type || 'Source Code'
            });

            clearInterval(interval);
            setProgress(100);
            setReportData(response.data);
            setTimeout(() => setPhase(1), 500);
        } catch (error) {
            console.error('Analysis failed', error);
            setUploading(false);
            clearInterval(interval);
            alert("Analysis failed. Please ensure the server is running.");
        }
    };

    return (
        <div className="container pt-32 pb-20 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black mb-4">Analyze Your <span className="text-[#2563EB]">Project</span></h1>
                    <p className="text-slate-500">Supported formats: PDF, DOCX, ZIP, Code Files (.js, .py, .java)</p>
                </div>

                {phase === 0 && (
                    <div className="space-y-6">
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`relative border-2 border-dashed rounded-[32px] p-16 text-center transition-all duration-300 ${dragActive ? 'border-primary bg-blue-50/50 scale-[1.02]' : 'border-slate-200 bg-white'
                                }`}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => setFile(e.target.files[0])}
                            />

                            <div className="flex flex-col items-center">
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/10 transition-colors ${file ? 'bg-green-500 text-white' : 'bg-primary text-white bg-[#2563EB]'}`}>
                                    {file ? <Check size={32} /> : <Upload size={32} />}
                                </div>

                                {file ? (
                                    <div className="space-y-2">
                                        <p className="text-xl font-bold text-slate-900">Project Selected</p>
                                        <p className="text-sm text-slate-500">{file.name}</p>
                                        <button onClick={() => setFile(null)} className="text-xs text-red-500 font-bold uppercase hover:underline">Remove file</button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <p className="text-xl font-bold text-slate-900">Drag & drop your project here</p>
                                        <p className="text-sm text-slate-500">or click to browse your local storage</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {uploading ? (
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-bold animate-pulse">
                                    <span className="text-primary text-[#2563EB]">Transmitting Data...</span>
                                    <span className="text-slate-900">{progress}%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#7c3aed] transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <button
                                disabled={!file}
                                onClick={startAnalysis}
                                className={`btn btn-primary w-full py-5 text-xl ${!file ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Start AI Analysis
                            </button>
                        )}
                    </div>
                )}

                {phase === 1 && <ProcessingScreen onComplete={() => navigate('/report', { state: { report: reportData, fileName: file.name } })} />}
            </div>
        </div>
    );
};

const ProcessingScreen = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const steps = [
        { text: 'Reading project files...', icon: File },
        { text: 'Detecting technical errors...', icon: AlertCircle },
        { text: 'Performing code review...', icon: Sparkles },
        { text: 'Calculating AI Project Score...', icon: TrendingUp }
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => {
                if (s >= steps.length - 1) {
                    clearInterval(timer);
                    setTimeout(onComplete, 1500);
                    return s;
                }
                return s + 1;
            });
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="space-y-12 py-10">
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 relative flex items-center justify-center">
                    <div className="absolute inset-0 border-8 border-slate-100 rounded-full" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-8 border-t-primary border-transparent rounded-full border-t-[#2563EB]"
                    />
                    <Loader2 className="w-12 h-12 text-primary animate-spin text-[#2563EB]" />
                </div>
                <div className="mt-8 text-center text-xl font-bold text-slate-900">AI Analysis in Progress</div>
            </div>

            <div className="grid gap-4">
                {steps.map((s, i) => (
                    <div
                        key={i}
                        className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 ${step >= i ? 'bg-white border-slate-200' : 'opacity-30 border-transparent'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step > i ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'
                            }`}>
                            {step > i ? <Check size={20} /> : <s.icon size={20} />}
                        </div>
                        <span className={`font-semibold ${step >= i ? 'text-slate-900' : 'text-slate-400'}`}>{s.text}</span>
                        {step === i && <Loader2 size={16} className="ml-auto animate-spin text-[#2563EB]" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadPage;
