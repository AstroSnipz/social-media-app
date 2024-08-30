'use client'
import Link from 'next/link';
import React, { useState } from 'react';

function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative z-40 md:hidden">
            <div className="flex flex-col gap-[4.5px] cursor-pointer" onClick={toggleMenu}>
                <div className={`w-6 h-1 bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 rounded-sm ease-in-out duration-500 ${isOpen ? 'rotate-45' : ''} origin-left`}></div>
                <div className={`w-6 h-1 bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 rounded-sm ease-in-out duration-500 ${isOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-1 bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 rounded-sm ease-in-out duration-500 ${isOpen ? '-rotate-45' : ''} origin-left`}></div>
            </div>

            {isOpen && (
                <div className="fixed top-24 left-0 w-full h-full bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-30">
                    <Link href="/" onClick={toggleMenu}>Home</Link>
                    <Link href="/friends">Friends</Link>
                    <Link href="/groups">Groups</Link>
                    <Link href="/stories">Stories</Link>
                    <Link href="/login">Login</Link>
                </div>
            )}
        </div>
    );
}

export default MobileMenu;
