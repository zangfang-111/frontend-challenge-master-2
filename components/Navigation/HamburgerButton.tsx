import React from 'react';
import Image from 'next/image';
import { scopeImageLoader } from 'helpers';
import { HamburgerIcon } from 'public/assets/icons';
import type { HamburgerButtonPropsType } from './Navigation.types';

function HamburgerButton({ handleMobileMenuClick }: HamburgerButtonPropsType): JSX.Element {
  return (
    <button
      type="button"
      className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      aria-controls="mobile-menu"
      aria-expanded="false"
      onClick={handleMobileMenuClick}
    >
      <span className="sr-only">Open main menu</span>
      {/* Hamburger icon */}
      <div className="relative w-6 h-6">
        <Image
          loader={scopeImageLoader}
          src={HamburgerIcon}
          layout="fill"
          objectFit="cover"
          unoptimized
        />
      </div>
    </button>
  );
}
export default HamburgerButton;
