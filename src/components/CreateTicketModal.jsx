import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicket } from '../features/tickets/ticketSlice';
import emailjs from 'emailjs-com';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateTicketModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        requesterName: '',
        department: 'General'
    });
    const [loading, setLoading] = useState(false);

    // EmailJS Configuration
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(createTicket(formData)).unwrap();

            if (SERVICE_ID !== 'YOUR_SERVICE_ID') {
                await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                    to_name: "IT Support Team",
                    from_name: formData.requesterName || "Employee",
                    message: `القسم: ${formData.department}\nالعنوان: ${formData.title}\nالأولوية: ${formData.priority}\nالتفاصيل: ${formData.description}`,
                }, PUBLIC_KEY);
            }

            setFormData({ title: '', description: '', priority: 'Medium', requesterName: '', department: 'General' });
            onClose();
            toast.success("تم إرسال التذكرة بنجاح!");
        } catch (error) {
            console.error("Failed to submit ticket:", error);
            toast.error(`فشل إرسال التذكرة: ${error.message || error}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                {/* Background overlay */}
                <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-slate-800 rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-slate-700">
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl leading-6 font-medium text-white" id="modal-title">
                                إنشاء تذكرة جديدة
                            </h3>
                            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">الاسم</label>
                                <input
                                    type="text"
                                    value={formData.requesterName}
                                    onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="أدخل اسمك"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">القسم</label>
                                <select
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                                >
                                    <option value="General">عام</option>
                                    <option value="HR">الموارد البشرية</option>
                                    <option value="Accounts">المحاسبة</option>
                                    <option value="Sales">المبيعات</option>
                                    <option value="IT">تقنية المعلومات</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">عنوان المشكلة</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="صف المشكلة بإيجاز"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">تفاصيل المشكلة</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    placeholder="اشرح المشكلة بالتفصيل..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">الأولوية</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none"
                                >
                                    <option value="Low">منخفضة</option>
                                    <option value="Medium">متوسطة</option>
                                    <option value="High">عالية</option>
                                    <option value="Critical">حرجة</option>
                                </select>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'جاري الإرسال...' : 'إرسال التذكرة'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-3 w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTicketModal;
