import React, { useState } from 'react';
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/solid';

export default function Example() {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = isExpanded ? MinusSmIcon : PlusSmIcon;

  return (
    <>
      <div className="relative mt-6 mb-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
            className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Icon
              className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Expand the Social Contract</span>
          </button>
        </div>
      </div>
      {isExpanded && (
        <div>
          {' '}
          <dd className="mt-2 text-base text-gray-500">
            By adopting the protocol, Cryptopunk owners who lease their punks
            are agreeing to the following terms
            <br />
            <br />
            1.&nbsp;Tenants may display their rented punk as an avatar on
            Twitter, Discord, NFT marketplaces and any other social platform
            where punk users congregate.
            <br />
            <br />
            2.&nbsp;Cryptopunk owners will refrain from using their punk on
            these platforms, while a tenant has rights to a punk
            <br />
            <br />
            3.&nbsp;Cryptopunk owners agree to not sell or offer for sale any
            punk to which a tenant has rights.
            <br />
            <br />
            4.&nbsp;Upon expiration, tenants agree to proactively remove their
            rented punk from platforms.
            <br />
            <br />
            5.&nbsp;Our protocol does not prevent an owner from selling a punk
            under lease. Prospective buyers are instead asked to be aware of
            tenant rights. In the unfortunate event of a sale while a tenant has
            rights, those who adopt this protocol commit to siding with the
            tenant, This means tenants retain their rights until their term
            expires. Buyers should be aware that attempting to resell a punk
            with current tenant rights may diminish their resale prospects until
            the tenant term expires.
            <br />
            <br />
          </dd>
        </div>
      )}
    </>
  );
}
