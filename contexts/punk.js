import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blockies from 'ethereum-blockies';
import { request } from 'graphql-request';

import { parsePackedRentData } from '../utils';
import { queryAllGiftedPunks, queryProvenancyOfPunk } from './utils/queries';

const PunkContext = createContext({
  giftedPunks: [],
  iGiftedPunks: [],
  giftedToMePunks: [],
  activePunk: '',
  setActivePunk: () => {
    throw new Error('must be implemented');
  },
});

// const ME = '0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE';
// const G = 'gmoney.eth';
// const NICK = 'nickev.eth';
// const ALGO_TWO = '0x00000444e5a1a667663b0ADfD853E8Efa0470698';

// https://catonmat.net/tools/generate-random-unix-timestamps
// 1601919546 (2020-10-05 17:39:06)
// 1600638555 (2020-09-20 21:49:15)
// 1596326532 (2020-08-02 00:02:12)
// 1584104076 (2020-03-13 12:54:36)
// 1604756529 (2020-11-07 13:42:09)
// 1577854257 (2020-01-01 04:50:57)
// 1592543730 (2020-06-19 05:15:30)
// 1601046607 (2020-09-25 15:10:07)
// 1578674879 (2020-01-10 16:47:59)
// 1592080693 (2020-06-13 20:38:13)

// Punk spec
// id: punk id
// src: image src
// owner: current owner of the punk
// tenant: current tenant of the punk
// tenancyDates: tenancy dates for the current tenant
// provenance: historical tenants of the punk

const ENDPOINT =
  'https://api.thegraph.com/subgraphs/id/QmanEVMeFXE8v2NgUHg9kYCpB4xJr1opYsojmdhohYZDTg';

class Provenance {
  constructor(punkID, owner, tenant, start, minSalePriceInWei) {
    this.punkID = punkID;
    this.owner = owner;
    this.tenant = tenant;
    this.tenantIcon = blockies
      .create({
        seed: tenant,
        color: '#dfe',
        bgcolor: '#aaa',
        size: 15,
        scale: 3,
        spotcolor: '#000',
      })
      .toDataURL();
    this.start = start;
    const { rentLength } = parsePackedRentData(minSalePriceInWei);
    this.end = this.start + rentLength * 86400;
    this.rentLengthInDays = rentLength;
    this.src = `https://www.larvalabs.com/cryptopunks/cryptopunk${this.punkID}.png`;
  }
}

// const mockAllGiftedPunks = [
//   {
//     id: 1138,
//     src: 'punks/1138.PNG',
//     owner: ALGO_TWO,
//     provenance: [
//       { tenant: G, tenancyDates: { start: 1584104176, end: 1628169538 } },
//       { tenant: NICK, tenancyDates: { start: 1578674879, end: 1584104076 } },
//     ],
//   },
//   {
//     id: 1357,
//     src: 'punks/1357.PNG',
//     owner: ALGO_TWO,
//     provenance: [
//       { tenant: G, tenancyDates: { start: 1592287627, end: 1599053719 } },
//       { tenant: ME, tenancyDates: { start: 1590979751, end: 1592287626 } },
//     ],
//   },
//   {
//     id: 1701,
//     src: 'punks/1701.PNG',
//     owner: ALGO_TWO,
//     provenance: [
//       { tenant: G, tenancyDates: { start: 1600638555, end: 1638169538 } },
//       { tenant: ME, tenancyDates: { start: 1590979751, end: 1592287626 } },
//     ],
//   },
//   {
//     id: 2009,
//     src: 'punks/2009.PNG',
//     owner: ME,
//     provenance: [
//       { tenant: G, tenancyDates: { start: 1600638555, end: 1601919546 } },
//       { tenant: ME, tenancyDates: { start: 1590979751, end: 1592287626 } },
//       { tenant: G, tenancyDates: { start: 1592287626, end: 1599053719 } },
//     ],
//   },
//   {
//     id: 2214,
//     src: 'punks/2214.PNG',
//     owner: NICK,
//     provenance: [
//       { tenant: G, tenancyDates: { start: 1600638555, end: 1601919546 } },
//       { tenant: NICK, tenancyDates: { start: 1600638555, end: 1601919546 } },
//     ],
//   },
//   {
//     id: 2345,
//     src: 'punks/2345.PNG',
//     owner: ME,
//     provenance: [
//       { tenant: G, tenancyDates: { start: 1600638555, end: 1601919546 } },
//       { tenant: NICK, tenancyDates: { start: 1600638555, end: 1601919546 } },
//     ],
//   },
//   {
//     id: 2468,
//     src: 'punks/2468.PNG',
//     owner: ME,
//     provenance: [
//       { tenant: G, tenancyDates: { start: 1600638555, end: 1601919546 } },
//       { tenant: NICK, tenancyDates: { start: 1600638555, end: 1601919546 } },
//     ],
//   },
//   {
//     id: 2499,
//     src: 'punks/2499.PNG',
//     owner: ME,
//     provenance: [
//       { tenant: G, tenancyDates: { start: 1600638555, end: 1601919546 } },
//       { tenant: NICK, tenancyDates: { start: 1600638555, end: 1601919546 } },
//     ],
//   },
// ];

// const mockIGiftedPunks = mockAllGiftedPunks.filter((punk) => punk.owner === ME);
// const mockGiftedToMePunks = mockAllGiftedPunks.filter(
//   (punk) => punk.tenant === ME
// );

export function PunkProvider({ children }) {
  // const [giftedPunks, setGiftedPunks] = useState(mockAllGiftedPunks);
  // const [iGiftedPunks] = useState(mockIGiftedPunks);
  // const [giftedToMePunks] = useState(mockGiftedToMePunks);
  // todo
  const currentAddress = '';
  const [giftedPunks, setGiftedPunks] = useState([]);
  const [iGiftedPunks, setIGiftedPunks] = useState([]);
  const [giftedToMePunks, setGiftedToMePunks] = useState([]);

  const [activePunk, _setActivePunk] = useState(null);

  const setActivePunk = (punk) => {
    _setActivePunk(punk);
  };

  const provenanceOfPunk = (punk) => {
    // TODO: not dry. repeated below
    return request(ENDPOINT, queryProvenancyOfPunk(punk.punkID)).then((d) => {
      const { provenances } = d;
      return provenances.map(
        (p) =>
          new Provenance(
            p.cryptopunk.id,
            p.cryptopunk.owner.id,
            p.tenant.id,
            p.tenancyDates.start,
            p.minSalePriceInWei
          )
      );
    }).catch((e) => { console.warn('issue fetching punk"s provenance'); return []; });
  };

  useEffect(() => {
    // TODO: only pulls this once. add a poller
    request(ENDPOINT, queryAllGiftedPunks)
      .then((d) => {
        const { provenances } = d;
        const parsedProvenances = [];

        for (const p of provenances) {
          // TODO: not the cleanest code, because this is repeated in constructor
          const { rentLength } = parsePackedRentData(p.minSalePriceInWei);
          const end = p.tenancyDates.start + rentLength * 86400;
          const now = Math.round(Date.now() / 1000);
          if (end > now) {
            parsedProvenances.push(
              new Provenance(
                p.cryptopunk.id,
                p.cryptopunk.owner.id,
                p.tenant.id,
                p.tenancyDates.start,
                p.minSalePriceInWei
              )
            );
          }
        }

        setGiftedPunks(parsedProvenances);
        setIGiftedPunks(
          currentAddress
            ? parsedProvenances.filter(
                (pp) => pp.cryptopunk.owner.toLowerCase() === currentAddress
              )
            : []
        );
        setGiftedToMePunks(
          currentAddress
            ? parsedProvenances.filter(
                (pp) => pp.tenant.toLowerCase() === currentAddress
              )
            : []
        );
      })
      .catch((e) => {
        console.warn('issue pulling gifted punks');
        console.warn(e);
        setGiftedPunks([]);
      });
  }, []);

  return (
    <PunkContext.Provider
      value={{
        giftedPunks,
        iGiftedPunks,
        giftedToMePunks,
        activePunk,
        setActivePunk,
        provenanceOfPunk,
      }}
    >
      {children}
    </PunkContext.Provider>
  );
}

PunkProvider.propTypes = {
  children: PropTypes.node,
};

export default PunkContext;
