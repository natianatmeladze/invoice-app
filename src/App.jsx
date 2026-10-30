import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InvoiceList } from './components/InvoiceList';
import { InvoiceDetail } from './components/InvoiceDetail';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
        
        <aside className="w-[100px] bg-[#373b53] flex flex-col items-center justify-between py-5 rounded-r-[20px]">
          <div className="bg-[#7c5dfa] w-[50px] h-[50px] rounded-full flex items-center justify-center text-white font-bold text-xl">
            ^^
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHzDX5tEMUC1hKwdaK3qqEvDrlzszwKMdVyzsfKROLg&s=10" alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </aside>

        <main className="flex-1 px-16 py-10">
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/invoice/:id" element={<InvoiceDetail />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;