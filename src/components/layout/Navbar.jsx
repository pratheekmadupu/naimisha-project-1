import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scan, LayoutDashboard, UploadCloud, FileBarChart, User, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Upload Project', path: '/upload', icon: UploadCloud },
        { name: 'Reports', path: '/reports', icon: FileBarChart },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all ${scrolled ? 'bg-white border-b py-3 shadow-sm' : 'py-6'}`}>
            <div className="container flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                        <Scan size={24} />
                    </div>
                    <span className="text-xl font-bold text-slate-900">
                        ProjectScan <span className="text-blue-600">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}
                            >
                                <Icon size={18} />
                                {link.name}
                            </Link>
                        );
                    })}
                    <Link to="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200">
                        <User size={20} />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b transition-all overflow-hidden ${isOpen ? 'py-6' : 'h-0'}`}>
                <div className="container flex flex-col gap-4">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 text-sm font-bold text-slate-700 p-4 hover:bg-slate-50 rounded-xl"
                            >
                                <Icon size={20} className="text-blue-600" />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
