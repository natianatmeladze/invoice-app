import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const InvoiceDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    setInvoice({
      id: id,
      clientName: 'Alex Grim',
      clientEmail: 'alexgrim@mail.com',
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
      paymentDue: '20 Sep 2021',
      status: 'Pending',
      items: [
        { name: 'Banner Design', quantity: 1, price: 156.00, total: 156.00 },
        { name: 'Email Design', quantity: 2, price: 200.00, total: 400.00 }
      ],
      total: 556.00
    });
  }, [id]);

  if (!invoice) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-[700px] mx-auto">
      <button onClick={() => navigate(-1)} className="bg-transparent border-none cursor-pointer font-bold mb-5 text-[#0c0e16] flex items-center gap-2">
        ← Go back
      </button>

      <div className="bg-white p-6 rounded-lg flex justify-between items-center mb-5 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-[#888eb0]">Status</span>
          <span className="px-4 py-2 rounded-md bg-[#fff8f0] text-[#ff8f00] font-bold">
            ● {invoice.status}
          </span>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#f9f9f6] border-none px-5 py-2.5 rounded-full font-bold cursor-pointer">Edit</button>
          <button className="bg-[#ec5757] text-white border-none px-5 py-2.5 rounded-full font-bold cursor-pointer">Delete</button>
          <button className="bg-[#7c5dfa] text-white border-none px-5 py-2.5 rounded-full font-bold cursor-pointer">Mark as Paid</button>
        </div>
      </div>

      <div className="bg-white p-10 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold">#{invoice.id}</h2>
        <p className="text-[#888eb0]">Graphic Design</p>

        <div className="flex justify-between my-8">
          <div>
            <p className="text-[#888eb0]">Invoice Date</p>
            <h3 className="font-bold">21 Aug 2021</h3>
            <p className="text-[#888eb0] mt-5">Payment Due</p>
            <h3 className="font-bold">{invoice.paymentDue}</h3>
          </div>
          <div>
            <p className="text-[#888eb0]">Bill To</p>
            <h3 className="font-bold">{invoice.clientName}</h3>
            <p className="text-[#888eb0] text-sm">{invoice.street}, {invoice.city}, {invoice.postCode}</p>
          </div>
          <div>
            <p className="text-[#888eb0]">Sent to</p>
            <h3 className="font-bold">{invoice.clientEmail}</h3>
          </div>
        </div>

        <div className="bg-[#f9f9fc] rounded-t-lg p-6 mt-8">
          {invoice.items.map((item, index) => (
            <div key={index} className="flex justify-between mb-4">
              <span>{item.name}</span>
              <span className="text-[#888eb0]">{item.quantity} x £ {item.price.toFixed(2)}</span>
              <strong className="font-bold">£ {item.total.toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <div className="bg-[#373b53] text-white p-6 rounded-b-lg flex justify-between items-center">
          <span>Amount Due</span>
          <h2 className="text-2xl font-bold m-0">£ {invoice.total.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};