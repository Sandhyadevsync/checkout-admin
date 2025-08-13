import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NavigationTabs from '../components/NavigationTabs';
import { BrandProvider } from '../contexts/BrandContext';

const MainLayout = () => {
    return (
        <BrandProvider>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <NavigationTabs />
                <main className="overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </BrandProvider>
    );
};

export default MainLayout; 