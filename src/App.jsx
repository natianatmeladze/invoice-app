import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { InvoiceProvider, InvoiceContext } from './context/InvoiceContext';
import { Sidebar } from './components/SideBar';
import { InvoiceList } from './pages/InvoiceList';
import { InvoiceDetail } from './pages/InvoiceDetail';
import { InvoiceFormModal } from './components/InvoiceFormModal';

const AppContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addInvoice } = useContext(InvoiceContext);

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
      <Sidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<InvoiceList onOpenNewModal={() => setIsModalOpen(true)} />} />
          <Route path="/invoice/:id" element={<InvoiceDetail />} />
        </Routes>
      </main>

      <InvoiceFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addInvoice} 
      />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <InvoiceProvider>
        <AppContent />
      </InvoiceProvider>
    </BrowserRouter>
  );
}

export default App;