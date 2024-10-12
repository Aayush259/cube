"use client";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import authService from '@/appwrite/authService';
import { HoveredLink, Menu, MenuItem } from './Menu';
import { RootState } from '@/interfaces/interface';

export default function Navbar() {

    // Getting authenticaiton state from redux store.
    const { status: authStatus } = useSelector((state: RootState) => state.auth);

    // State to track the active menu item.
    const [active, setActive] = useState<string | null>(null);

    // Function to handle logout.
    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        try {
            await authService.logout();
            window.location.reload();
        } catch (error) {
            alert("Failed to logout");
        }
    };

    // Function to get nav link object.
    const getNavLink = (name: string, slug: string, active: boolean, onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => Promise<void>) => ({
        name, slug, active, onClick
    });

    // Array of nav items.
    const navItems = [
        getNavLink('Home', '/', authStatus),
        getNavLink('Login', '/login', !authStatus),
        getNavLink('Sign Up', '/signup', !authStatus),
        getNavLink('Profile', '/profile', authStatus),
        getNavLink('Logout', '/logout', authStatus, handleLogout),
    ];

    return (
        <div className="text-xl">
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 sm:min-w-44">
                        {
                            navItems.map(item => (
                                item.active ? (
                                    <HoveredLink
                                        key={item.name}
                                        link={item.slug}
                                        onClick={item.onClick}
                                    >
                                        {item.name}
                                    </HoveredLink>
                                ) : null
                            ))
                        }
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};
