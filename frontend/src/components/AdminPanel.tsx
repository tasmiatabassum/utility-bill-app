import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/billing';

export default function AdminPanel() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [form, setForm] = useState({ ratePerUnit: 0, vatPercentage: 0, serviceCharge: 0 });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const checkPin = () => {
    if (pin === '12345') setIsAuthenticated(true);
    else alert('Invalid PIN');
  };

  const handleUpdate = async () => {
    setStatus('idle');
    try {
      await axios.post(`${API_URL}/admin/update`, form, {
        headers: { 'admin-key': pin }
      });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-sm mx-auto mt-20">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Admin Access</h2>
          <p className="text-sm text-slate-500 mb-6">Enter your security PIN to continue</p>
          
          <input 
            type="password" 
            placeholder="PIN Code" 
            className="block w-full text-center rounded-md border-slate-300 border py-2 mb-4 focus:ring-red-500 focus:border-red-500"
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkPin()}
          />
          <button onClick={checkPin} className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
            Unlock Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">System Configuration</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Rate per Unit ($)</label>
              <input 
                type="number" 
                className="block w-full rounded-md border-slate-300 border py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                placeholder="e.g. 5.0"
                onChange={(e) => setForm({...form, ratePerUnit: Number(e.target.value)})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">VAT Percentage (%)</label>
              <input 
                type="number" 
                className="block w-full rounded-md border-slate-300 border py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                placeholder="e.g. 15"
                onChange={(e) => setForm({...form, vatPercentage: Number(e.target.value)})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Service Charge ($)</label>
              <input 
                type="number" 
                className="block w-full rounded-md border-slate-300 border py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                placeholder="e.g. 10"
                onChange={(e) => setForm({...form, serviceCharge: Number(e.target.value)})} 
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end border-t border-slate-100 pt-6">
            {status === 'success' && <span className="text-green-600 text-sm mr-4 font-medium">✓ Saved Successfully</span>}
            {status === 'error' && <span className="text-red-600 text-sm mr-4 font-medium">⚠ Update Failed</span>}
            
            <button 
              onClick={handleUpdate} 
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Rates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}