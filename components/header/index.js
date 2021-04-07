import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import { ROUTE_NAME } from '../../utils/consts';

export default function Header({ activeTab }) {
  const baseHeaderText =
    'text-4xl group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500';
  const defaultHeaderText = baseHeaderText + ' text-gray-500';
  const activeHeaderText = baseHeaderText + ' text-gray-900';

  return (
    <>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                <>
                  <span className="sr-only">reNFT</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="renft.png"
                    alt="reNFT-logo"
                  />
                </>
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden z-20">
              <Menu>
                {({ open }) => (
                  <div>
                    <Menu.Button
                      type="button"
                      aria-expanded="false"
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                    >
                      <span className="sr-only">Open menu</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </Menu.Button>
                    <Transition
                      show={open}
                      enter="duration-200 ease-out"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="duration-100 ease-in"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items static>
                        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5">
                              <div className="flex items-center justify-between">
                                <div>
                                  <a href="/">
                                    <img
                                      className="h-8 w-auto"
                                      src="renft.png"
                                      alt="reNFT"
                                    />
                                  </a>
                                </div>
                                <div className="-mr-2">
                                  <Menu.Item>
                                    <button
                                      type="button"
                                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                                    >
                                      <span className="sr-only">
                                        Close menu
                                      </span>
                                      <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"
                                        />
                                      </svg>
                                    </button>
                                  </Menu.Item>
                                </div>
                              </div>
                              <div className="mt-6">
                                <nav className="grid gap-y-8">
                                  <Menu.Item>
                                    <a
                                      href={`/${ROUTE_NAME.CRYPTOPUNKS.toLowerCase()}`}
                                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex-shrink-0 h-6 w-6 text-purple-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                      </svg>
                                      <span className="ml-3 text-base font-medium text-gray-900">
                                        {ROUTE_NAME.CRYPTOPUNKS}
                                      </span>
                                    </a>
                                  </Menu.Item>
                                  <Menu.Item>
                                    <a
                                      href={`/${ROUTE_NAME.FAQ.toLowerCase()}`}
                                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex-shrink-0 h-6 w-6 text-purple-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                        />
                                      </svg>
                                      <span className="ml-3 text-base font-medium text-gray-900">
                                        {ROUTE_NAME.FAQ}
                                      </span>
                                    </a>
                                  </Menu.Item>
                                </nav>
                              </div>
                            </div>
                            <div className="py-6 px-5 space-y-6">
                              <div>
                                <p className="mt-6 text-center text-base font-medium text-gray-500">
                                  <a
                                    href="#"
                                    className="text-purple-600 hover:text-purple-500"
                                  >
                                    Sign in
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </div>
                )}
              </Menu>
            </div>
            <nav className="hidden md:flex space-x-10">
              <div className="relative">
                <button
                  type="button"
                  className={
                    activeTab.toLowerCase() ===
                    ROUTE_NAME.CRYPTOPUNKS.toLowerCase()
                      ? activeHeaderText
                      : defaultHeaderText
                  }
                  aria-expanded="false"
                >
                  <span>
                    <a href={`/${ROUTE_NAME.CRYPTOPUNKS.toLowerCase()}`}>
                      {ROUTE_NAME.CRYPTOPUNKS}
                    </a>
                  </span>
                </button>
              </div>
              <div className="relative">
                <button
                  type="button"
                  className={
                    activeTab.toLowerCase() === ROUTE_NAME.FAQ.toLowerCase()
                      ? activeHeaderText
                      : defaultHeaderText
                  }
                  aria-expanded="false"
                >
                  <span>
                    <a href={`/${ROUTE_NAME.FAQ.toLowerCase()}`}>
                      {ROUTE_NAME.FAQ}
                    </a>
                  </span>
                </button>
              </div>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a
                href="#"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </a>
              {
                // TODO: add the sign up without metamask. g's comment about ease of use. gift the NFTs to ID.
                // TODO: proto v1
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  activeTab: PropTypes.string.isRequired,
};
