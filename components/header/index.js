import React from 'react';
import { Menu, Transition } from '@headlessui/react';

import { ROUTE_NAME } from '../../utils/consts'

export default function Header({ activeTab }) {
  return (
    <>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="https://claim.renft.io" target="_blank" rel="noreferrer">
                <span className="sr-only">reNFT</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="renft.png"
                  alt="reNFT-logo"
                />
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden z-10">
              <Menu>
                {({ open }) => (
                  <div>
                    <Menu.Button
                      type="button"
                      aria-expanded="false"
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                                  <img
                                    className="h-8 w-auto"
                                    src="renft.png"
                                    alt="reNFT"
                                  />
                                </div>
                                <div className="-mr-2">
                                  <Menu.Item>
                                    <button
                                      type="button"
                                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                                        className="flex-shrink-0 h-6 w-6 text-indigo-600"
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
                                      href={`/${ROUTE_NAME.LEGAL.toLowerCase()}`}
                                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                    >
                                      <svg
                                        className="flex-shrink-0 h-6 w-6 text-indigo-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                        />
                                      </svg>
                                      <span className="ml-3 text-base font-medium text-gray-900">
                                        {ROUTE_NAME.LEGAL}
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
                                        className="flex-shrink-0 h-6 w-6 text-indigo-600"
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
                                <a
                                  href="#"
                                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                  Sign up
                                </a>
                                <p className="mt-6 text-center text-base font-medium text-gray-500">
                                  Existing customer?&nbsp;
                                  <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-500"
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
                {/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="text-4xl text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                {/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="text-4xl text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-expanded="false"
                >
                  <span>
                    <a href={`/${ROUTE_NAME.LEGAL.toLowerCase()}`}>
                      {ROUTE_NAME.LEGAL}
                    </a>
                  </span>
                </button>
              </div>
              <div className="relative">
                {/* Item active: "text-gray-900", Item inactive: "text-gray-500" */}
                <button
                  type="button"
                  className="text-4xl text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
              {/* <a
                href="#"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign up
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
