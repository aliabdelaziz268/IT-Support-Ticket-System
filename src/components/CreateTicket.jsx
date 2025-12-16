import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicket } from '../features/tickets/ticketSlice';
import emailjs from 'emailjs-com';
import { Send } from 'lucide-react';

const CreateTicket = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        requesterName: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // EmailJS Configuration
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            // 1. Create Ticket in Firestore
            await dispatch(createTicket(formData)).unwrap();

            // 2. Send Email
            if (SERVICE_ID !== 'YOUR_SERVICE_ID') {
                await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                    to_name: "IT Support Team",
                    from_name: formData.requesterName || "Employee",
                    message: `العنوان: ${formData.title}\nالأولوية: ${formData.priority}\nالتفاصيل: ${formData.description}`,
                }, PUBLIC_KEY);
            } else {
                console.warn("EmailJS keys not set. Skipping email.");
            }

            setSuccess(true);
            setFormData({ title: '', description: '', priority: 'Medium', requesterName: '' });
        } catch (error) {
            console.error("Failed to submit ticket:", error);
            alert(`فشل إرسال التذكرة: ${error.message || error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-8 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-2xl font-bold text-gray-900">تسجيل مشكلة جديدة</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        يرجى تزويدنا بتفاصيل المشكلة التي تواجهها.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 text-right">
                    {success && (
                        <div className="bg-green-50 border-r-4 border-green-400 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="mr-3">
                                    <p className="text-sm text-green-700">
                                        تم إرسال التذكرة بنجاح! تم إشعار فريق الدعم الفني.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">الاسم (اختياري)</label>
                        <input
                            type="text"
                            value={formData.requesterName}
                            onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="مثال: أحمد محمد"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">عنوان المشكلة</label>
                        <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="مثال: الطابعة لا تعمل"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">الأولوية</label>
                        <select
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        >
                            <option value="Low">منخفضة - يمكن الانتظار</option>
                            <option value="Medium">متوسطة - تؤثر على العمل</option>
                            <option value="High">عالية - توقف العمل تماماً</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">التفاصيل</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="وصف المشكلة بالتفصيل..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'جاري الإرسال...' : (
                            <>
                                <Send className="w-4 h-4 ml-2" /> إرسال التذكرة
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTicket;
