import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';
import BottomNav from './BottomNav';

export default function FacultyLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col antialiased overflow-x-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${collapsed ? 'md:pl-20' : 'md:pl-64'}`}>
        <TopBar onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 min-w-0 p-3.5 sm:p-6 lg:p-8 pb-24 md:pb-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
