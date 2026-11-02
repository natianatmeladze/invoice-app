
export const Sidebar = () => {
  return (
    <aside className="w-full md:w-[100px] h-[80px] md:h-screen bg-[#373b53] flex md:flex-col items-center justify-between py-0 md:py-6 px-6 md:px-0 rounded-none md:rounded-r-[20px] fixed top-0 left-0 z-20 shadow-md">
      <div className="bg-[#7c5dfa] w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-md">
        ^^
      </div>
      <div className="flex md:flex-col items-center gap-4 md:gap-6">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white overflow-hidden border-2 border-gray-500">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHzDX5tEMUC1hKwdaK3qqEvDrlzszwKMdVyzsfKROLg&s=10" alt="profile-pic" className="w-full h-full object-cover" />
        </div>
      </div>
    </aside>
  );
};