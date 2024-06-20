import React from 'react';
import Link from 'next/link';
import { BASE_URL } from 'lib/scopeApi';
import type { NavigationPropsType } from './Navigation.types';

function MobileNavigation({ mainMenu, isPipelineFeature }: NavigationPropsType): JSX.Element {
  const settingsMenuItemURL = `${BASE_URL}/user/settings/`;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {mainMenu?.length &&
          mainMenu.map(item => (
            <Link href={item.url} key={item.label}>
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                {item.label}
              </a>
            </Link>
          ))}
        {isPipelineFeature && (
          <Link href="/pipeline">
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Pipeline
            </a>
          </Link>
        )}
        <Link href={settingsMenuItemURL}>
          <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center">
            Settings
          </a>
        </Link>
      </div>
    </div>
  );
}

export default MobileNavigation;
