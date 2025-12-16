import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketList from './components/TicketList';
import LandingPage from './components/LandingPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100 font-['Cairo'] pb-20">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
            },
            success: {
              iconTheme: {
                primary: '#22d3ee',
                secondary: '#1e293b',
              },
            },
          }}
        />

        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<TicketList />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
