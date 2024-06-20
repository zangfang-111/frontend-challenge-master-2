import React, { useState } from 'react';
import { useLoggedInContext } from 'context/LoggedInContext';
import { BASE_URL } from 'lib/scopeApi';
import MobileNavigation from './MobileNavigation';
import HamburgerButton from './HamburgerButton';
import DesktopNavigation from './DesktopNavigation';

const mainMenu = [
  {
    url: `${BASE_URL}/search`,
    label: 'Find',
  },
  {
    url: '/content',
    label: 'Content',
  },
  {
    url: '/tracking',
    label: 'Tracking',
  },
];

function Navigation(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClick = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { isPipelineFeature } = useLoggedInContext();

  return (
    <nav className="bg-gray-800 fixed inset-x-0 h-18 z-50 top-0">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <DesktopNavigation mainMenu={mainMenu} isPipelineFeature={isPipelineFeature} />
          {/* <!-- Mobile menu button --> */}
          <div className="-mr-2 flex md:hidden">
            <HamburgerButton handleMobileMenuClick={handleMobileMenuClick} />
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <MobileNavigation mainMenu={mainMenu} isPipelineFeature={isPipelineFeature} />
      )}
    </nav>
  );
}

export default Navigation;
