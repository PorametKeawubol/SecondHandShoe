import React from 'react';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { Bars4Icon } from '@heroicons/react/20/solid';

const HamburgerMenu = ({ handleLogout }) => {
  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              >
                <Bars4Icon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Menu.Items
              className={`${
                open ? 'absolute' : 'hidden'
              } right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/Profile"
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/about"
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hidden group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      About
                    </Link>
                  )}
                </Menu.Item>
                
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/contact"
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      Contact
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  <button onClick={handleLogout} className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none">
                    Logout
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

export default HamburgerMenu;
