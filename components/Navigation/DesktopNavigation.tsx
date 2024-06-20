import React from 'react';
import Link from 'next/link';
import { BASE_URL } from 'lib/scopeApi';
import { useRouter } from 'next/router';
import { SettingsIcon } from 'public/assets/icons';
import { scopeImageLoader } from 'helpers';
import Image from 'next/image';
import type { NavigationPropsType } from './Navigation.types';

function DesktopNavigation({ mainMenu, isPipelineFeature }: NavigationPropsType): JSX.Element {
  const router = useRouter();
  const activeClasses = 'text-white bg-gray-900';
  const menuItemClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white';
  const settingsMenuItemURL = `${BASE_URL}/user/settings/`;

  return (
    <>
      <div className="flex items-center">
        <div className="hidden md:block">
          <ul className="flex items-baseline space-x-4">
            {mainMenu?.length &&
              mainMenu.map(item => (
                <li key={item.label}>
                  <Link href={item.url}>
                    <a
                      className={`text-sm font-medium rounded-md px-2 py-2 ${
                        router.pathname === item.url ? activeClasses : menuItemClasses
                      }`}
                    >
                      {item.label}
                    </a>
                  </Link>
                </li>
              ))}
            {isPipelineFeature && (
              <li>
                <Link href="/pipeline">
                  <a
                    className={`text-sm font-medium rounded-md px-2 py-2 ${
                      router.pathname === '/pipeline' ? activeClasses : menuItemClasses
                    }`}
                  >
                    Pipeline
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="hidden md:block">
        <Link href={settingsMenuItemURL}>
          <a
            className={`text-sm font-medium rounded-md px-2 py-2 flex items-center ${
              router.pathname === settingsMenuItemURL ? activeClasses : menuItemClasses
            }`}
          >
            <div className="relative w-5 h-5">
              <Image
                loader={scopeImageLoader}
                src={SettingsIcon}
                layout="fill"
                objectFit="cover"
                unoptimized
              />
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}

export default DesktopNavigation;
