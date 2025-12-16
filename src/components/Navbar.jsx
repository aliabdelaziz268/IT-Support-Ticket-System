import { Plus } from 'lucide-react';
import { Headset } from 'lucide-react';

const Navbar = ({ onOpenModal }) => {
    return (
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo / Title (Right side in RTL) */}
                    <div className="flex items-center gap-2 ">
                        <div className="h-10 w-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <Headset className="text-white w-6 h-6" />
                        </div>
                        <div className="text-right ml-4">
                            <h1 className="text-xl font-bold text-white leading-tight">نظام الدعم الفني</h1>
                            <p className="text-xs text-slate-400 mt-2">إدارة تذاكر الدعم الفني</p>
                        </div>
                    </div>

                    {/* Create Button (Left side in RTL) */}
                    <div>
                        <button
                            onClick={onOpenModal}
                            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-bold rounded-xl text-slate-900 bg-cyan-400 hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/20"
                        >
                            <Plus className="w-5 h-5 ml-2" />
                            تذكرة جديدة
                        </button>
                    </div>


                </div>
            </div>
        </nav>
    );
};

export default Navbar;
