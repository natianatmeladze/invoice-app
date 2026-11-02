import { createContext, useState } from 'react';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([
    {
      id: 'XM9141',
      clientName: 'Alex Grim',
      clientEmail: 'alexgrim@mail.com',
      paymentDue: '2021-09-20',
      status: 'Pending',
      total: 556.00,
      street: '84 Church Way',
      city: 'Bradford',
      postCode: 'BD1 9PB',
      country: 'United Kingdom',
      items: [{ name: 'Banner Design', quantity: 1, price: 156, total: 156 }, { name: 'Email Design', quantity: 2, price: 200, total: 400 }]
    },
    {
      id: 'RT3080',
      clientName: 'Jensen Huang',
      clientEmail: 'jensen@nvidia.com',
      paymentDue: '2021-08-19',
      status: 'Paid',
      total: 1800.90,
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
      items: [{ name: 'UI/UX Design', quantity: 3, price: 600, total: 1800 }]
    }
  ]);

  const addInvoice = (newInvoice) => {
    setInvoices([newInvoice, ...invoices]);
  };

  const deleteInvoice = (id) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  const markAsPaid = (id) => {
    setInvoices(
      invoices.map((inv) => (inv.id === id ? { ...inv, status: 'Paid' } : inv))
    );
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, deleteInvoice, markAsPaid }}>
      {children}
    </InvoiceContext.Provider>
  );
};