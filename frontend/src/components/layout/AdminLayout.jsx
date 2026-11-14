import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';
import BottomNav from './BottomNav';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col antialiased">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'md:pl-20' : 'md:pl-64'}`}>
        <TopBar onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
