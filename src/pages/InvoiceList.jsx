import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { InvoiceContext } from '../context/InvoiceContext';
import noInvoice from '../assets/attention.png'

export const InvoiceList = ({ onOpenNewModal }) => {
  const { invoices } = useContext(InvoiceContext);
  const [filter, setFilter] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredInvoices = filter === 'All'
    ? invoices
    : invoices.filter((inv) => inv.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="max-w-[800px] mx-auto py-8 px-4 md:py-12 md:pl-24 pt-28 md:pt-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0c0e16]">Invoices</h1>
          <p className="text-[#888eb0] text-xs md:text-sm">There are {invoices.length} total invoices</p>
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-6">
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="font-bold text-[#0c0e16] text-sm md:text-base cursor-pointer flex items-center gap-2 focus:outline-none"
            >
              Filter {filter !== 'All' && <span className="hidden md:inline">by status</span>} {filter !== 'All' && `: ${filter}`} ▼
            </button>
            {dropdownOpen && (
              <div className="absolute top-8 left-0 bg-white shadow-xl rounded-lg py-3 w-36 z-10">
                {['All', 'Paid', 'Pending', 'Draft'].map((status) => (
                  <p 
                    key={status}
                    onClick={() => { setFilter(status); setDropdownOpen(false); }}
                    className="px-4 py-1.5 cursor-pointer hover:text-[#7c5dfa] font-medium text-sm"
                  >
                    {status}
                  </p>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={onOpenNewModal}
            className="bg-[#7c5dfa] hover:bg-[#9277ff] text-white px-4 md:px-5 py-2.5 md:py-3 rounded-full font-bold flex items-center gap-2 md:gap-3 transition shadow-lg text-sm md:text-base"
          >
            <span className="bg-white text-[#7c5dfa] rounded-full w-5 h-5 flex items-center justify-center font-extrabold">+</span>
            <span>New <span className="hidden sm:inline">Invoice</span></span>
          </button>
        </div>
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="text-5xl md:text-6xl mb-6">
            <img src={noInvoice} alt="noinvoice" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#0c0e16] mb-2">There is nothing here</h2>
          <p className="text-[#888eb0] max-w-xs text-xs md:text-sm">
            Create an invoice by clicking the <span className="font-bold">New Invoice</span> button and get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredInvoices.map((inv) => (
            <Link to={`/invoice/${inv.id}`} key={inv.id} className="no-underline">
              <div className="bg-white p-4 md:p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 shadow-sm hover:border hover:border-[#7c5dfa] transition cursor-pointer">
                <div className="flex justify-between w-full sm:w-auto items-center">
                  <span className="font-bold text-[#0c0e16] text-sm md:text-base"><span className="text-[#888eb0]">#</span>{inv.id}</span>
                  <span className="text-[#888eb0] text-xs sm:hidden">Due {inv.paymentDue}</span>
                </div>
                
                <span className="hidden sm:inline text-[#888eb0] text-sm">Due {inv.paymentDue}</span>
                <span className="text-[#888eb0] text-sm">{inv.clientName}</span>
                
                <div className="flex justify-between w-full sm:w-auto items-center">
                  <span className="font-extrabold text-base md:text-lg">£ {inv.total.toFixed(2)}</span>
                  <span className={`px-4 py-2 rounded-md font-bold text-xs md:text-sm flex items-center gap-2 w-28 justify-center ${
                    inv.status === 'Paid' ? 'bg-[#f4fbf7] text-[#33d69f]' :
                    inv.status === 'Pending' ? 'bg-[#fff8f0] text-[#ff8f00]' :
                    'bg-[#f8f8f8] text-[#373b53]'
                  }`}>
                    ● {inv.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};