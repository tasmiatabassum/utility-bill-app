import { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/billing';


export default function BillCalculator() {
  const [units, setUnits] = useState<number | ''>('');
  const [bill, setBill] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!units) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/calculate`, { units: Number(units) });
      setBill(res.data);
    } catch (err) {
      alert("Error calculating bill. Ensure server is running.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!bill) return;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Utility Bill", 14, 22);
    
    // Date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [['Description', 'Details']],
      body: [
        ['Units Consumed', `${bill.units} units`],
        ['Rate per Unit', `$${bill.ratePerUnit}`],
        ['Subtotal', `$${bill.subTotal}`],
        ['VAT', `$${bill.vatAmount} (${bill.vatPercentage}%)`],
        ['Service Charge', `$${bill.serviceCharge}`],
        ['TOTAL PAYABLE', `$${bill.totalAmount}`],
      ],
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] },
    });
    
    doc.save(`bill-${Date.now()}.pdf`);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Utility Calculator</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Consumption</label>
              <div className="relative rounded-md shadow-sm">
                <input 
                  type="number" 
                  className="block w-full rounded-md border-slate-300 pl-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border" 
                  placeholder="Enter units (e.g. 150)" 
                  value={units} 
                  onChange={(e) => setUnits(Number(e.target.value))} 
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 sm:text-sm">units</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCalculate} 
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Calculate Bill'}
            </button>
          </div>
        </div>

        {/* Receipt Section */}
        {bill && (
          <div className="bg-slate-50 px-8 py-6 border-t border-slate-100">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal ({bill.units} × ${bill.ratePerUnit})</span>
                <span className="font-medium">${bill.subTotal}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>VAT ({bill.vatPercentage}%)</span>
                <span className="font-medium text-red-500">+${bill.vatAmount}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Service Charge</span>
                <span className="font-medium text-red-500">+${bill.serviceCharge}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center mt-3">
                <span className="text-base font-bold text-slate-900">Total Payable</span>
                <span className="text-xl font-bold text-indigo-600">${bill.totalAmount}</span>
              </div>
            </div>
            
            <button 
              onClick={downloadPDF} 
              className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
