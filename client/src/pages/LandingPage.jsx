import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    MessageCircle,
    Zap,
    Shield,
    Image as ImageIcon,
    Menu,
    X,
    ArrowRight,
    Check,
    Play,
    Globe,
    Smartphone,
    Smile,
    MoreHorizontal,
    Search,
    Lock
} from 'lucide-react';

const QuickTalkApp = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">

            {/* --- Ambient Background Effects --- */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/30 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-purple-100/40 rounded-full blur-[120px] mix-blend-multiply" />
            </div>

            {/* --- Navigation --- */}
            <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-white/80 backdrop-blur-xl border-slate-200 py-3' : 'bg-transparent border-transparent py-5'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105">
                            <MessageCircle size={22} strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">QuickTalk</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {['Product', 'Enterprise', 'Resources', 'Pricing'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-full transition-all">
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Auth Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login" className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                            Log in
                        </Link>
                        <Link to="/signup" className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all shadow-lg shadow-slate-200 hover:-translate-y-0.5 active:translate-y-0">
                            Sign Up Free
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col shadow-2xl animate-in slide-in-from-top-5 md:hidden">
                        {['Product', 'Enterprise', 'Resources', 'Pricing'].map((item) => (
                            <a key={item} href="#" className="py-3 text-lg font-medium text-slate-600 border-b border-slate-50 last:border-0">
                                {item}
                            </a>
                        ))}
                        <div className="mt-6 flex flex-col gap-3">
                            <Link to="/login" className="w-full py-3 font-semibold text-slate-700 bg-slate-50 rounded-xl text-center">Log In</Link>
                            <Link to="/signup" className="w-full py-3 font-semibold text-white bg-blue-600 rounded-xl text-center">Sign Up</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 z-10">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-blue-700 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        v2.0 is now live
                    </div>

                    {/* Headline */}
                    <h1 className="max-w-4xl text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Chat designed for <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                            modern teams.
                        </span>
                    </h1>

                    {/* Subheader */}
                    <p className="max-w-2xl text-lg md:text-xl text-slate-500 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                        Stop switching between apps. QuickTalk brings your messages, files, and tools into one unified, lightning-fast workspace.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-200 transition-all hover:scale-105 flex items-center justify-center gap-2">
                            Start for free <ArrowRight size={20} />
                        </Link>
                        <button onClick={() => { alert("Khud krle bhai😒") }} className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group">
                            <Play size={18} fill="currentColor" className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                            Watch Demo
                        </button>
                    </div>

                    {/* --- Hero UI Mockup (Creative Aspect) --- */}
                    <div className="mt-20 relative w-full max-w-5xl mx-auto perspective-1000 animate-in fade-in zoom-in-95 duration-1000 delay-300">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-[3rem]" />

                        {/* Main Window Frame */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl md:rounded-[2rem] shadow-2xl shadow-slate-400/20 overflow-hidden ring-1 ring-black/5">

                            {/* Window Controls Header */}
                            <div className="h-12 border-b border-slate-200/60 bg-white/50 px-6 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-100/50 px-3 py-1 rounded-full">
                                    <Lock size={10} /> QuickTalk-app.com/team-chat
                                </div>
                                <div className="w-16"></div> {/* Spacer */}
                            </div>

                            {/* UI Layout Grid */}
                            <div className="flex h-[400px] md:h-[600px]">

                                {/* Sidebar */}
                                <div className="w-20 md:w-64 bg-slate-50/50 border-r border-slate-200/60 hidden sm:flex flex-col p-4">
                                    <div className="mb-8 flex items-center gap-3 px-2">
                                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                            <MessageCircle size={16} />
                                        </div>
                                        <span className="font-bold text-slate-700 hidden md:inline">QuickTalk</span>
                                    </div>
                                    <div className="space-y-1">
                                        {['Inbox', 'Mentions', 'Drafts'].map((item, i) => (
                                            <div key={item} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-3 cursor-pointer ${i === 0 ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:bg-slate-100'}`}>
                                                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                                                <span className="hidden md:inline">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 mb-4 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:block">Direct Messages</div>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-3 px-2 cursor-pointer opacity-70 hover:opacity-100">
                                                <div className="relative">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} className="w-8 h-8 rounded-full bg-white border border-slate-200" alt="avatar" />
                                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                </div>
                                                <div className="hidden md:block">
                                                    <div className="w-24 h-2.5 bg-slate-200 rounded-full mb-1"></div>
                                                    <div className="w-16 h-2 bg-slate-100 rounded-full"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main Chat Area */}
                                <div className="flex-1 bg-white flex flex-col">
                                    {/* Chat Header */}
                                    <div className="h-16 border-b border-slate-100 px-6 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-bold text-slate-800"># design-team</span>
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full border border-slate-200">24 members</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-slate-400">
                                            <Search size={20} />
                                            <MoreHorizontal size={20} />
                                        </div>
                                    </div>

                                    {/* Messages Stream */}
                                    <div className="flex-1 p-6 space-y-6 overflow-hidden relative">
                                        {/* Message 1 */}
                                        <div className="flex gap-4">
                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-10 h-10 rounded-full bg-slate-100" alt="Felix" />
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-bold text-slate-900">Felix Chen</span>
                                                    <span className="text-xs text-slate-400">10:42 AM</span>
                                                </div>
                                                <p className="text-slate-600 mt-1">Has anyone seen the new mockups for the dashboard? They look incredible! 🔥</p>
                                            </div>
                                        </div>

                                        {/* Message 2 (Image) */}
                                        <div className="flex gap-4">
                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" className="w-10 h-10 rounded-full bg-slate-100" alt="Sarah" />
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-bold text-slate-900">Sarah Miller</span>
                                                    <span className="text-xs text-slate-400">10:45 AM</span>
                                                </div>
                                                <p className="text-slate-600 mt-1">Yes! I just uploaded the assets. Check this out:</p>
                                                <div className="mt-3 p-1 bg-slate-100 border border-slate-200 rounded-xl inline-block max-w-sm cursor-pointer hover:shadow-lg transition-shadow">
                                                    <div className="h-32 w-56 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-lg flex items-center justify-center">
                                                        <ImageIcon className="text-indigo-300" size={32} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Message 3 (User) */}
                                        <div className="flex gap-4">
                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" className="w-10 h-10 rounded-full bg-slate-100" alt="Sarah" />
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-bold text-slate-900">You</span>
                                                    <span className="text-xs text-slate-400">Just now</span>
                                                </div>
                                                <p className="text-slate-600 mt-1">Love the gradients on that one. Let's ship it. 🚀</p>
                                            </div>
                                        </div>

                                        {/* Gradient Fade at bottom */}
                                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 md:p-6 pt-0">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3 shadow-inner">
                                            <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-400 hover:text-blue-500 cursor-pointer transition-colors">
                                                <Zap size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Message #design-team..."
                                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm md:text-base text-slate-700 placeholder:text-slate-400"
                                                readOnly
                                            />
                                            <div className="p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 cursor-pointer transition-transform hover:scale-105 active:scale-95">
                                                <ArrowRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Bento Grid Features Section --- */}
            <section id="product" className="py-24 md:py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Built for speed. Designed for focus.</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">QuickTalk isn't just another chat app. It's a productivity engine designed to keep your team in flow state.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[800px]">

                        {/* Feature 1: Large Left */}
                        <div className="md:col-span-2 md:row-span-2 bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 relative overflow-hidden group hover:border-slate-200 transition-colors">
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-100 to-purple-50 rounded-full blur-[80px] opacity-60 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 mb-6">
                                        <Zap size={28} />
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">Real-time is an understatement.</h3>
                                    <p className="text-lg text-slate-500 max-w-md">Our WebSocket engine delivers messages in under 30ms. That's faster than a blink. Feel the difference of true instant communication.</p>
                                </div>

                                {/* Visual */}
                                <div className="mt-12 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-sm font-mono text-slate-400">Latency: 24ms</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-3 bg-slate-100 rounded-full w-3/4"></div>
                                        <div className="h-3 bg-slate-100 rounded-full w-1/2"></div>
                                        <div className="h-3 bg-slate-100 rounded-full w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2: Top Right */}
                        <div className="md:col-span-1 md:row-span-1 bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
                            <div className="relative z-10">
                                <Shield className="mb-6 text-blue-400" size={32} />
                                <h3 className="text-xl font-bold mb-2">End-to-End Encrypted</h3>
                                <p className="text-slate-400 text-sm">Your data is yours. We can't read it even if we wanted to.</p>
                            </div>
                            <Lock className="absolute -bottom-4 -right-4 text-slate-800 opacity-20 transform rotate-12" size={140} />
                        </div>

                        {/* Feature 3: Bottom Right */}
                        <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden text-center flex flex-col items-center justify-center group hover:scale-[1.02] transition-transform">
                            <div className="relative z-10">
                                <h3 className="text-4xl font-extrabold mb-2">4x</h3>
                                <p className="text-blue-100 font-medium">Productivity Boost</p>
                                <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold">
                                    Read the study <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Social Proof --- */}
            <section className="py-16 border-y border-slate-100 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by forward-thinking teams</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple Text Logos for demo */}
                        {['Acme Corp', 'GlobalBank', 'Nebula', 'Quotient', 'Spherule'].map(brand => (
                            <span key={brand} className="text-xl md:text-2xl font-bold text-slate-800">{brand}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Bottom CTA --- */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight">
                        Ready to reclaim your <br className="hidden md:block" /> team's focus?
                    </h2>
                    <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
                        Join 10,000+ teams who have switched to QuickTalk. No credit card required. Cancel anytime.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/signup" className="px-10 py-5 bg-slate-900 text-white text-lg font-bold rounded-full shadow-2xl shadow-slate-400/50 hover:bg-slate-800 hover:-translate-y-1 transition-all">
                            Get Started for Free
                        </Link>
                        <button className="px-10 py-5 bg-white text-slate-900 border border-slate-200 text-lg font-bold rounded-full hover:bg-slate-50 transition-colors">
                            Talk to Sales
                        </button>
                    </div>
                </div>

                {/* Background Gradients */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-t from-blue-100/50 to-transparent blur-[80px] -z-10 rounded-full pointer-events-none"></div>
            </section>

            {/* --- Footer --- */}
            <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6 text-blue-600">
                                <MessageCircle size={24} strokeWidth={2.5} />
                                <span className="text-xl font-bold text-slate-900">QuickTalk</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                                The communication platform for teams who value focus, speed, and design.
                            </p>
                            <div className="flex gap-4 mt-6">
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                                    <Globe size={18} />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                                    <Smartphone size={18} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                {['Features', 'Integrations', 'Pricing', 'Changelog', 'Docs'].map(item => (
                                    <li key={item}><a href="#" className="hover:text-blue-600 transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                {['About', 'Careers', 'Blog', 'Contact', 'Partners'].map(item => (
                                    <li key={item}><a href="#" className="hover:text-blue-600 transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                {['Privacy', 'Terms', 'Security', 'Cookies', 'Settings'].map(item => (
                                    <li key={item}><a href="#" className="hover:text-blue-600 transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                        <p>© 2024 QuickTalk Inc. All rights reserved.</p>
                        <div className="flex items-center gap-8">
                            <span>Made with React & Tailwind</span>
                            <span className="w-2 h-2 rounded-full bg-green-400"></span>
                            <span>Systems Operational</span>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default QuickTalkApp;