import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, updateTicketStatus } from '../features/tickets/ticketSlice';
import { CheckCircle, Clock, AlertCircle, Ticket, User, Building, ChevronLeft, Search, Lock, LogIn } from 'lucide-react';
import Navbar from './Navbar'; // Reuse Navbar for the Dashboard view
import CreateTicketModal from './CreateTicketModal';

const TicketList = () => {
    const dispatch = useDispatch();
    const { tickets, loading, error } = useSelector((state) => state.tickets);
    const [filter, setFilter] = useState('All');

    // Auth Logic
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [authError, setAuthError] = useState('');

    // Modal Logic for Admin to also create tickets if needed
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchTickets());
        }
    }, [dispatch, isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (passcode === '1234') {
            setIsAuthenticated(true);
            setAuthError('');
        } else {
            setAuthError('كلمة المرور غير صحيحة');
        }
    };

    const handleStatusChange = (id, newStatus) => {
        dispatch(updateTicketStatus({ id, status: newStatus }));
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': case 'Critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'Low': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Resolved':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">تم الحل</span>;
            case 'In Progress':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">قيد المعالجة</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">مفتوحة</span>;
        }
    };

    const totalTickets = tickets.length;
    const openTickets = tickets.filter(t => t.status === 'Open').length;
    const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
    const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;

    const filteredTickets = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);

    // If not authenticated, show login screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="mx-auto h-12 w-12 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                            <Lock className="h-6 w-6 text-cyan-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">تسجيل دخول IT</h2>
                        <p className="text-slate-400 mt-2 text-sm">أدخل رمز المرور للوصول إلى لوحة التحكم</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-center text-white text-lg tracking-widest placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="****"
                                maxLength={4}
                            />
                            {authError && <p className="text-red-400 text-sm mt-2 text-center">{authError}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
                        >
                            <LogIn className="w-4 h-4 ml-2" />
                            دخول
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Authenticated View
    return (
        <>
            <Navbar onOpenModal={() => setIsModalOpen(true)} />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Total Card */}
                    <div className="bg-slate-800 rounded-2xl p-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">إجمالي التذاكر</p>
                                <h3 className="text-4xl font-bold text-white mt-2">{totalTickets}</h3>
                            </div>
                            <div className="h-10 w-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
                                <Ticket className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    {/* Open Card */}
                    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">تذاكر مفتوحة</p>
                                <h3 className="text-3xl font-bold text-white mt-1">{openTickets}</h3>
                            </div>
                            <div className="h-10 w-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    {/* In Progress Card */}
                    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">قيد المعالجة</p>
                                <h3 className="text-3xl font-bold text-white mt-1">{inProgressTickets}</h3>
                            </div>
                            <div className="h-10 w-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    {/* Resolved Card */}
                    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">تم الحل</p>
                                <h3 className="text-3xl font-bold text-white mt-1">{resolvedTickets}</h3>
                            </div>
                            <div className="h-10 w-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 mb-6 bg-slate-800/50 p-1.5 rounded-xl w-fit border border-slate-700/50">
                    {['All', 'Open', 'In Progress', 'Resolved'].map((status) => {
                        const labels = { 'All': 'الكل', 'Open': 'مفتوحة', 'In Progress': 'قيد المعالجة', 'Resolved': 'تم الحل' };
                        const isActive = filter === status;
                        return (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/25'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {labels[status]}
                                {status === 'All' && <span className="mr-2 bg-black/20 px-1.5 py-0.5 rounded text-[10px]">{totalTickets}</span>}
                                {status !== 'All' && <span className="mr-2 bg-black/20 px-1.5 py-0.5 rounded text-[10px]">
                                    {tickets.filter(t => t.status === status).length}
                                </span>}
                            </button>
                        );
                    })}
                </div>

                {/* Loading State */}
                {loading && tickets.length === 0 && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                    </div>
                )}

                {/* Ticket List Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTickets.map((ticket) => (
                        <div key={ticket.id} className="group bg-slate-800 rounded-2xl p-5 border border-slate-700/50 hover:border-slate-600 transition-all hover:shadow-xl hover:shadow-black/20 flex flex-col justify-between">

                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                {getStatusBadge(ticket.status)}
                                <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-[10px] uppercase tracking-wider font-bold border px-1.5 py-0.5 rounded ${getPriorityColor(ticket.priority)}`}>
                                        {ticket.priority}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 leading-relaxed line-clamp-2">
                                    {ticket.title}
                                </h3>
                                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                                    {ticket.description}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <User className="w-3.5 h-3.5" />
                                        <span>{ticket.requesterName || "مجهول"}</span>
                                    </div>
                                    {ticket.department && (
                                        <div className="flex items-center gap-1">
                                            <Building className="w-3.5 h-3.5" />
                                            <span>{ticket.department}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('ar-EG') : 'الان'}</span>
                                </div>
                            </div>

                            {/* Admin Action */}
                            <div className="mt-4 pt-3 border-t border-slate-700/50 flex justify-end">
                                <select
                                    value={ticket.status}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                                    className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded px-2 py-1 outline-none focus:border-cyan-500 cursor-pointer"
                                >
                                    <option value="Open">مفتوحة</option>
                                    <option value="In Progress">قيد المعالجة</option>
                                    <option value="Resolved">تم الحل</option>
                                </select>
                            </div>

                        </div>
                    ))}

                    {filteredTickets.length === 0 && !loading && (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-20 h-20 bg-slate-800 mx-auto rounded-full flex items-center justify-center mb-4">
                                <Search className="w-10 h-10 text-slate-600" />
                            </div>
                            <h3 className="text-slate-300 font-medium text-lg">لا توجد نتائج</h3>
                            <p className="text-slate-500 text-sm mt-1">حاول تغيير الفلاتر أو البحث عن شيء آخر</p>
                        </div>
                    )}
                </div>

                <CreateTicketModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />

            </div>
        </>
    );
};

export default TicketList;
