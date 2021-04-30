import React from 'react';

export default function FAQ() {
  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Can’t find the answer you’re looking for? Reach out to our{' '}
                <a
                  href="https://www.twitter.com/renftlabs"
                  target="_"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  customer Twitter support
                </a>{' '}
                team.
              </p>
              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Disclaimer
              </h3>
              <p className="mt-4 text-base font-bold text-red-500">
                Whilst the utmost care has been taken in developing the
                protocol, the full responsibility of any loss/damages resides
                with the user.
              </p>
            </div>

            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-12">
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    How does this work?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    CryptoPunk owners sign a special transaction. This
                    transaction follows the tenant rights protocol which gives
                    sole permission to display the cryptopunk as your Avatar for
                    a fixed period of time up to 99 days.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    How does this transaction work, and is it safe?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    We leverage the offerPunkToAddress function within the
                    Cryptopunks contract to avoid smart contract risk. The
                    protocol requires a minimum value of Eth that is an order of
                    magnitude more than all Eth in existence which ensures it is
                    impossible for someone to actually accept the offer.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    What are Tenant rights and obligations for for Cryptopunk
                    Owners?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    By adopting the protocol below, Cryptopunk owners who lease
                    their punks are agreeing to the following terms
                    <br />
                    <br />
                    1.&nbsp;Tenants may display as avatar their rented punk on
                    Twitter, Discord, NFT marketplaces and any other social
                    platform where punk users congregate.
                    <br />
                    2.&nbsp;Cryptopunk owners will refrain from using their own
                    punk on these platforms while a tenant has rights to a punk
                    <br />
                    3.&nbsp;Cryptopunk owners agree to not sell or offer for
                    sale any punk to which a tenant has rights.
                    <br />
                    4.&nbsp;Upon expiration, tenants agree to proactively remove
                    their rented punk from platforms.
                    <br />
                    5.&nbsp;Our protocol does not prevent an owner from selling
                    a punk under lease. Prospective buyers are instead asked to
                    be aware of tenant rights. In the unfortunate event of a
                    sale while a tenant has rights, those who adopt this
                    protocol commit to siding with the tenant, This means
                    tenants retain their rights until their term expires. Buyers
                    should be aware that attempting to resell a punk with
                    current tenant rights may diminish their resale prospects
                    until the tenant term expires.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Why would someone want to use someone else’s Cryptopunk?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    There is an authentic experience of having an NFT that is
                    different than just looking at it. This extends to tenant
                    rights. If you have bought any NFTs, you understand this.The
                    most prominent punks serve as a great example: If Perugia
                    used the protocol to gift you tenant rights for a month to
                    his alien, you would feel honored. The provenance of this
                    gift is on chain forever. Would you use it as your Avatar?
                    Punk owners that have never had a zombie ape or alien should
                    probably see the instant appeal here. Now extrapolate. For
                    many people a Cryptopunk is too expensive to justify owning
                    one, with their current finances. Would they not feel
                    honored to have one temporarily?
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Are you associated with Larva Labs?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">No.</dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Can’t someone simply give me a cryptopunk?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    One does not simply give a Cryptopunk in 2021. They could.
                    But It’s a very expensive gift. Tenant rights allow more
                    people the experience of a Cryptopunk NFT that they may not
                    otherwise be able to afford.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Are there any other benefits to tenant rights?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    The on chain transaction proves owner intent to use this
                    protocol and give tenant rights. All transactions become
                    part of a Cryptopunk’s provenance, the story of its history.
                    As tenant, your Ethereum address is forever embedded in this
                    particular cryptopunk’s history, and anyone who understands
                    this protocol will know that an owner gave your Ethereum
                    address tenant rights for a period of time.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Can I pay for tenant rights?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Not with this protocol version.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Can’t I just right-click-save a Cryptopunk and use it as my
                    Avatar?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    You have the physical ability to do this, just as you have
                    the ability to save someone’s picture and use it as your
                    own. It’s called stealing someone’s property.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Can I sell my tenant rights?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Tenant rights expire within 99 days and are
                    non-transferrable.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    What about the timezones?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    One day is short hand for 5760 blocks. At 15 seconds for an
                    average block, the equates to 1 day.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    I want to give the tenant rights beyond 99 days. Can I do
                    that?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    The best way to accomplish this is to wait for tenant rights
                    to expire and then giift them for an additional 99 days. The
                    protocol only reads the first 2 digits following protocol
                    version 0.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Why can’t I gift tenant rights for longer than 99 days?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    This rule is to protect tenants and owners from a prolonged
                    state of limbo. If an owner gifted tenant rights and then
                    sold the punk to an unsuspecting buyer, there could be a
                    dispute who actually had rights to display the punk as
                    avatar. By protocol design, we are calling on the community
                    to side with tenant rights until they expire. But this is a
                    strange state where a new punk owner who does not
                    technically have full access to punk rights for a period of
                    time. We believe that in the vast majority of cases punk
                    owner integrity will prevent a state of limbo, but the 99
                    day limit ensures any potential limbo will be resolved in
                    months rather than years. This guarantees the long term
                    ownership integrity of each punk.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Why should a punk owner acknowledge the tenant rights given
                    by a former owner?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Ideally a prospective buyer would not buy a punk with
                    existing tenant rights because a sale violates the agreement
                    of using this protocol. It is possible, however, that a
                    buyer may purchase a punk under this scenario without
                    knowing the gift existed. We believe it is in the
                    community&apos;s interest to acknowledge and respect tenant
                    rights, and to inform perspective buyers if a punk
                    previously gifted is offered for sale before expiration.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
