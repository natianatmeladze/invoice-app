import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInvoices([
        { id: 'XM9141', clientName: 'Alex Grim', paymentDue: '20 Sep 2021', total: 556.00, status: 'Pending' },
        { id: 'RT3080', clientName: 'Jensen Huang', paymentDue: '19 Aug 2021', total: 1800.90, status: 'Paid' },
        { id: 'RG0314', clientName: 'John Morrison', paymentDue: '01 Oct 2021', total: 14002.33, status: 'Paid' },
        { id: 'FV2353', clientName: 'Anita Wainwright', paymentDue: '12 Nov 2021', total: 3102.04, status: 'Draft' }
      ]);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredInvoices = filter === 'All' 
    ? invoices 
    : invoices.filter(inv => inv.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-[#0c0e16]">Invoices</h1>
          <p className="text-[#888eb0]">There are {invoices.length} total invoices</p>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative" ref={dropdownRef}>
            <span 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className="cursor-pointer font-bold text-[#0c0e16]"
            >
              Filter by status {filter !== 'All' ? `: ${filter}` : ''} ▼
            </span>
            {isDropdownOpen && (
              <div className="absolute top-8 left-0 bg-white shadow-xl rounded-lg py-2 w-32 z-10">
                <p onClick={() => { setFilter('All'); setIsDropdownOpen(false); }} className="px-4 py-2 cursor-pointer hover:bg-gray-100">All</p>
                <p onClick={() => { setFilter('Paid'); setIsDropdownOpen(false); }} className="px-4 py-2 cursor-pointer hover:bg-gray-100">Paid</p>
                <p onClick={() => { setFilter('Pending'); setIsDropdownOpen(false); }} className="px-4 py-2 cursor-pointer hover:bg-gray-100">Pending</p>
                <p onClick={() => { setFilter('Draft'); setIsDropdownOpen(false); }} className="px-4 py-2 cursor-pointer hover:bg-gray-100">Draft</p>
              </div>
            )}
          </div>

          <button className="bg-[#7c5dfa] hover:bg-[#9277ff] text-white px-5 py-3 rounded-full font-bold flex items-center gap-3 transition">
            <span className="bg-white text-[#7c5dfa] rounded-full w-5 h-5 flex items-center justify-center">+</span>
            New Invoice
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((inv) => (
            <Link 
              to={`/invoice/${inv.id}`} 
              key={inv.id} 
              className="no-underline text-inherit"
            >
              <div className="bg-white p-6 rounded-lg flex justify-between items-center shadow-sm hover:border hover:border-[#7c5dfa] transition">
                <span className="font-bold text-[#7c5dfa]">#{inv.id}</span>
                <span className="text-[#888eb0]">Due {inv.paymentDue}</span>
                <span className="text-[#333]">{inv.clientName}</span>
                <span className="font-bold text-lg">£ {inv.total.toFixed(2)}</span>
                <span className={`px-4 py-2 rounded-md font-bold flex items-center gap-2 ${
                  inv.status === 'Paid' ? 'bg-[#f4fbf7] text-[#33d69f]' : 
                  inv.status === 'Pending' ? 'bg-[#fff8f0] text-[#ff8f00]' : 
                  'bg-[#f8f8f8] text-[#373b53]'
                }`}>
                  ● {inv.status}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center mt-16">
            <p className="text-[#888eb0]">There is nothing here</p>
          </div>
        )}
      </div>
    </div>
  );
};