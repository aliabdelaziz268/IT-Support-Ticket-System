<!-- # نظام الدعم الفني | IT Support Ticket System

![IT Support System](https://img.shields.io/badge/Status-Completed-success) ![React](https://img.shields.io/badge/React-19-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)

نظام متكامل لإدارة تذاكر الدعم الفني، يتيح للموظفين الإبلاغ عن المشاكل التقنية بسهولة وللمسؤولين إدارتها وحلها. يتميز بواجهة عصرية (Dark Mode) تدعم اللغة العربية بالكامل.

A streamlined IT Support Ticket System allowing employees to report issues and IT staff to manage them. Features a modern bilingual (Arabic/English) interface with Dark Mode.

---

## 🔗 Live Demo | رابط المعاينة
**[https://fir-lec-8d921.web.app](https://fir-lec-8d921.web.app)**

## ✨ المميزات | Features

### 🏢 للموظفين (Employee View)
- **واجهة بسيطة**: صفحة هبوط مخصصة للإبلاغ عن الأعطال فقط.
- **إشعارات فورية**: تنبيهات عند إرسال التذكرة بنجاح.
- **بريد إلكتروني**: إرسال إشعار تلقائي لفريق الدعم عند فتح تذكرة جديدة.
- **خصوصية**: لا يمكن للموظف رؤية باقي التذاكر.

### 🛠️ للدعم الفني (IT Admin Dashboard)
- **لوحة تحكم محمية**: الدخول يتطلب رمز مرور (Passcode).
- **إحصائيات شاملة**: عرض عدد التذاكر (الكل، المفتوحة، قيد التنفيذ، المكتملة).
- **إدارة الحالة**: تغيير حالة التذكرة (Open -> In Progress -> Resolved) بضغطة زر.
- **فلتر وتصنيف**: تصفية التذاكر حسب الحالة.

## 🚀 التقنيات المستخدمة | Tech Stack
- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS (Dark Theme, RTL Support)
- **State Management**: Redux Toolkit
- **Backend/DB**: Firebase Firestore
- **Notifications**: React Hot Toast
- **Email**: EmailJS

## 🛠️ التثبيت والتشغيل | Installation

1. **استنساخ المشروع | Clone the repo**
   ```bash
   git clone https://github.com/your-username/it-support-ticket-system.git
   cd it-support-ticket-system
   ```

2. **تثبيت الحزم | Install dependencies**
   ```bash
   npm install
   ```

3. **إعداد المتغيرات | Environment Setup**
   قم بإنشاء ملف `.env` وأضف بيانات Firebase و EmailJS:
   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_EMAILJS_SERVICE_ID=...
   ```

4. **تشغيل السيرفر | Run Dev Server**
   ```bash
   npm run dev
   ```

## 🔐 بيانات الدخول | Access Credentials
- **رمز مرور المسؤول (IT Admin Passcode)**: `1234` -->
