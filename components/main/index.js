import React from 'react';

export default function Main() {
  return (
    <>
      <main>
        <div className="min-h-screen bg-white pt-8 flex justify-center items-center">
          <div className="h-1/2 w-screen">
            <div className="relative">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      className="h-full w-full object-cover"
                      src="take-control-of-punks.PNG"
                      alt="A snippet of Cryptopunks avatars from the official GitHub repo"
                    />
                    <div
                      className="absolute inset-0 bg-purple-700"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                  </div>
                  <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                    <h1 className="text-center text-10xl font-extrabold tracking-tight sm:text-5xl lg:text-8xl">
                      <span className="block text-purple-200">Cryptopunks</span>
                      <span className="block text-white lg:py-32">
                        Tenant Rights Gifting Protocol
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
