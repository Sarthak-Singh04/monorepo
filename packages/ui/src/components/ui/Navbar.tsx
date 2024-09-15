"use client";

import { Home, LineChart, Globe, MapPin, BrainCircuit, Settings, User } from "lucide-react";
import { useCallback } from "react";
import { Button } from "./button";

interface NavItem {
  name: string;
  icon: React.ElementType;
  appName: string;
  basePath: string;
}

interface NavbarProps {
  currentAppName: string;
}

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, appName: 'home', basePath: '/home' },
  { name: 'Dashboard', icon: LineChart, appName: 'dashboard', basePath: '/dashboard' },
  { name: 'Projects', icon: Globe, appName: 'project', basePath: '/projects' },
  { name: 'Map', icon: MapPin, appName: 'map', basePath: '/map' },
  { name: 'AI', icon: BrainCircuit, appName: 'chatbot', basePath: '/c' },
];

const bottomNavItems: NavItem[] = [
  { name: 'Settings', icon: Settings, appName: 'settings', basePath: '/settings' },
  { name: 'Profile', icon: User, appName: 'profile', basePath: '/profile' },
];

/**
 * Helper function to construct the full URL for external navigation.
 */
const getAppUrl = (item: NavItem): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost'; // Fallback to localhost if not defined
  return `${baseUrl}${item.basePath}`; // Construct the full URL based on the base path
};

/**
 * Navbar component for navigating between apps and within the current app.
 */
const Navbar = ({ currentAppName }: NavbarProps) => {
  /**
   * Render a navigation button wrapping an anchor tag inside.
   */
  const renderNavButton = useCallback(
    (item: NavItem) => {
      const isActive = item.appName === currentAppName;
      const appUrl = getAppUrl(item);
      console.log(process.env.NEXT_PUBLIC_BASE_URL)

      return (
        <Button
          key={item.name}
          variant={isActive ? "default" : "ghost"}
          className="w-full flex items-center justify-start gap-3"
          aria-current={isActive ? "page" : undefined} // Set aria-current for accessibility
        >
          <a
            href={appUrl}
            className="w-full flex items-center gap-3"
            style={{ textDecoration: 'none' }} // Prevent underlining the link if not desired
          >
            <item.icon className="w-5 h-5" aria-hidden="true" />
            <span className="hidden lg:inline">{item.name}</span>
          </a>
        </Button>
      );
    },
    [currentAppName]
  );

  return (
    <nav className="flex flex-col justify-between h-full w-[17rem] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-2 p-4">
        {navItems.map(renderNavButton)}
      </div>
      <div className="flex flex-col gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
        {bottomNavItems.map(renderNavButton)}
      </div>
    </nav>
  );
};

export default Navbar;
