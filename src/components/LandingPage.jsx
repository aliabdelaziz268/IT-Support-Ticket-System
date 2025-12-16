import { useState } from 'react';
import { Plus, ShieldCheck } from 'lucide-react';
import CreateTicketModal from './CreateTicketModal';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="text-center z-10 max-w-2xl">
                <div className="mb-8 flex justify-center">
                    <div className="h-20 w-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 rotate-3">
                        <ShieldCheck className="text-white w-10 h-10" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    نظام الدعم الفني
                    <span className="block text-cyan-400 mt-2 text-2xl md:text-3xl">متواجدون دائماً لمساعدتك</span>
                </h1>

                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                    هل تواجه مشكلة تقنية؟ لا تقلق، قم بفتح تذكرة جديدة وسيتم التعامل معها من قبل فريق الدعم الفني في أسرع وقت.
                </p>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 transition-all duration-200 bg-cyan-400 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 hover:bg-cyan-300 hover:-translate-y-1 shadow-lg shadow-cyan-500/20"
                >
                    <Plus className="w-6 h-6 ml-2" />
                    تسجيل مشكلة جديدة
                </button>
            </div>

            {/* Footer Link to Admin */}
            <div className="absolute bottom-6 text-center">
                <Link to="/admin" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">
                    الدخول كـ مسؤول (IT Support)
                </Link>
            </div>

            <CreateTicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default LandingPage;
