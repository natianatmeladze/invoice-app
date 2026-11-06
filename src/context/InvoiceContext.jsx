import React, { createContext, useState, useEffect } from 'react';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {

  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem('invoices');
    if (savedInvoices) {
      try {
        return JSON.parse(savedInvoices);
      } catch (error) {
        console.error('Failed to parse invoices from localStorage', error);
      }
    }

    return [
      {
        id: 'XM9141',
        clientName: 'Alex Grim',
        clientEmail: 'alexgrim@mail.com',
        clientStreet: '84 Church Way',
        clientCity: 'Bradford',
        clientPostCode: 'BD1 9PB',
        clientCountry: 'United Kingdom',
        invoiceDate: '2021-08-20',
        paymentDue: '2021-09-20',
        paymentTerms: '30',
        projectDescription: 'Graphic Design',
        status: 'Pending',
        total: 556.00,
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
        items: [
          { name: 'Banner Design', quantity: 1, price: 156.00, total: 156.00 },
          { name: 'Email Design', quantity: 2, price: 200.00, total: 400.00 }
        ]
      },
      {
        id: 'RT3080',
        clientName: 'Jensen Huang',
        clientEmail: 'jensen@nvidia.com',
        clientStreet: '12 Silicon Way',
        clientCity: 'San Jose',
        clientPostCode: '95134',
        clientCountry: 'United States',
        invoiceDate: '2021-07-19',
        paymentDue: '2021-08-19',
        paymentTerms: '30',
        projectDescription: 'UI/UX Design',
        status: 'Paid',
        total: 1800.90,
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
        items: [
          { name: 'UI/UX Design', quantity: 3, price: 600.00, total: 1800.00 }
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

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