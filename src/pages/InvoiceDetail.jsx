import  { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InvoiceContext } from '../context/InvoiceContext';
import { InvoiceFormModal } from '../components/InvoiceFormModal';

export const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, markAsPaid, addInvoice } = useContext(InvoiceContext);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return <div className="pl-6 md:pl-32 py-24 text-xl font-bold">ინვოისი ვერ მოიძებნა</div>;
  }

  const handleDelete = () => {
    deleteInvoice(invoice.id);
    navigate('/');
  };

  const handleUpdate = (updatedInvoice) => {
    deleteInvoice(invoice.id);
    addInvoice(updatedInvoice);
  };

  return (
    <div className="max-w-[700px] mx-auto py-8 px-4 md:py-12 md:pl-24 pt-28 md:pt-12 relative">
      <button onClick={() => navigate('/')} className="font-bold mb-6 text-[#0c0e16] flex items-center gap-2 cursor-pointer text-sm md:text-base">
        ← Go back
      </button>

      <div className="bg-white p-4 md:p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <span className="text-[#888eb0] text-sm">Status</span>
          <span className={`px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2 ${
            invoice.status === 'Paid' ? 'bg-[#f4fbf7] text-[#33d69f]' :
            invoice.status === 'Pending' ? 'bg-[#fff8f0] text-[#ff8f00]' :
            'bg-[#f8f8f8] text-[#373b53]'
          }`}>
            ● {invoice.status}
          </span>
        </div>
        <div className="flex items-center justify-end w-full sm:w-auto gap-2 md:gap-3 flex-wrap">
          <button 
            onClick={() => setIsEditModalOpen(true)} 
            className="bg-[#f9f9f6] text-[#7e88c3] px-4 md:px-5 py-2.5 rounded-full font-bold text-xs md:text-sm cursor-pointer hover:bg-gray-200"
          >
            Edit
          </button>
          
          <button 
            onClick={() => setShowDeleteModal(true)} 
            className="bg-[#ec5757] text-white px-4 md:px-5 py-2.5 rounded-full font-bold text-xs md:text-sm cursor-pointer hover:bg-[#ff9797]"
          >
            Delete
          </button>

          {invoice.status !== 'Paid' && (
            <button 
              onClick={() => markAsPaid(invoice.id)} 
              className="bg-[#7c5dfa] text-white px-4 md:px-5 py-2.5 rounded-full font-bold text-xs md:text-sm cursor-pointer hover:bg-[#9277ff]"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#0c0e16]">#{invoice.id}</h2>
            <p className="text-[#888eb0] text-sm">{invoice.projectDescription}</p>
          </div>
          <div className="text-left sm:text-right text-[#888eb0] text-xs md:text-sm">
            <p>{invoice.street}</p>
            <p>{invoice.city}</p>
            <p>{invoice.postCode}</p>
            <p>{invoice.country}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-[#888eb0] text-sm mb-1">Invoice Date</p>
            <h3 className="font-bold text-base">{invoice.invoiceDate}</h3>
            <p className="text-[#888eb0] text-sm mt-4 mb-1">Payment Due</p>
            <h3 className="font-bold text-base">{invoice.paymentDue}</h3>
          </div>
          <div>
            <p className="text-[#888eb0] text-sm mb-1">Bill To</p>
            <h3 className="font-bold text-base">{invoice.clientName}</h3>
            <p className="text-[#888eb0] text-xs mt-1">{invoice.clientStreet}, {invoice.clientCity}, {invoice.clientPostCode}</p>
          </div>
          <div>
            <p className="text-[#888eb0] text-sm mb-1">Sent to</p>
            <h3 className="font-bold text-base break-all">{invoice.clientEmail}</h3>
          </div>
        </div>

        <div className="bg-[#f9f9fc] rounded-t-xl p-4 md:p-6 overflow-x-auto">
          <div className="grid grid-cols-4 text-[#888eb0] text-xs mb-4 font-bold min-w-[300px]">
            <span>Item Name</span>
            <span className="text-center">QTY.</span>
            <span className="text-right">Price</span>
            <span className="text-right">Total</span>
          </div>
          {invoice.items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 items-center mb-3 font-medium text-xs md:text-sm min-w-[300px]">
              <span className="text-[#0c0e16] truncate pr-2">{item.name}</span>
              <span className="text-center text-[#888eb0]">{item.quantity}</span>
              <span className="text-right text-[#888eb0]">£ {item.price.toFixed(2)}</span>
              <span className="text-right font-bold text-[#0c0e16]">£ {item.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#373b53] text-white p-4 md:p-6 rounded-b-xl flex justify-between items-center">
          <span className="text-xs md:text-sm">Amount Due</span>
          <h2 className="text-xl md:text-2xl font-extrabold">£ {invoice.total.toFixed(2)}</h2>
        </div>
      </div>

      <InvoiceFormModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={handleUpdate}
        initialData={invoice}
      />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold text-[#0c0e16] mb-4">Confirm Deletion</h3>
            <p className="text-[#888eb0] text-xs md:text-sm mb-6">
              Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 md:gap-4">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="bg-[#f9f9f6] text-[#7e88c3] px-4 md:px-5 py-2.5 rounded-full font-bold text-xs md:text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="bg-[#ec5757] text-white px-4 md:px-5 py-2.5 rounded-full font-bold text-xs md:text-sm cursor-pointer hover:bg-[#ff9797]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};