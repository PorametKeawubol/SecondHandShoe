import React from 'react';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { Bars4Icon } from '@heroicons/react/20/solid';

const HamburgerMenu = ({ handleLogout }) => {
  const isAdmin = sessionStorage.getItem("role");
  const userProfile = sessionStorage.getItem("Profile_Picture");
  console.log("🚀 ~ HamburgerMenu ~ isAdmin:", isAdmin)

  return (
    <div className="relative group">
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                className="inline-flex justify-center items-center w-10 h-10 rounded-full border border-gray-300 shadow-sm bg-cover bg-center bg-no-repeat bg-gray-200 overflow-hidden focus:outline-none transition duration-300 transform hover:scale-110"
                style={{ backgroundImage: `url(${userProfile})` }}
              >
                <span className="sr-only">Open menu</span>
              </Menu.Button>
            </div>

            <Menu.Items
              className={`absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
            >
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/Profile"
                      className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm border-b`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/message/"
                      className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      message
                    </Link>
                  )}
                </Menu.Item>
                {isAdmin === "admin" && (
                  <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/admin"
                      className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm border-b `}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.2" className="w-6 h-6 mr-2" stroke-linecap="round" stroke-linejoin="round"><path fill-rule="evenodd" d="M17 10v1.1l1 .5.8-.8 1.4 1.4-.8.8.5 1H21v2h-1.1l-.5 1 .8.8-1.4 1.4-.8-.8a4 4 0 0 1-1 .5V20h-2v-1.1a4 4 0 0 1-1-.5l-.8.8-1.4-1.4.8-.8a4 4 0 0 1-.5-1H11v-2h1.1l.5-1-.8-.8 1.4-1.4.8.8a4 4 0 0 1 1-.5V10h2Zm.4 3.6c.4.4.6.8.6 1.4a2 2 0 0 1-3.4 1.4A2 2 0 0 1 16 13c.5 0 1 .2 1.4.6ZM5 8a4 4 0 1 1 8 .7 7 7 0 0 0-3.3 3.2A4 4 0 0 1 5 8Zm4.3 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h6.1a7 7 0 0 1-1.8-7Z" clip-rule="evenodd"/></svg>
                      Admin
                    </Link>
                  )}
                </Menu.Item>                
                )}

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/contact"
                      className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm border-b `}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      Contact
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  <button onClick={handleLogout} className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none border-b">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
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