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

  // TODO: rename class Provenance to Punk and define it as per initial spec
  // TODO: there should be no need for two queries to punks! just one
  const provenanceOfPunk = (punk) => {
    // TODO: not dry. repeated below
    return request(ENDPOINT, queryProvenancyOfPunk(punk.punkID))
      .then((d) => {
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
      })
      .catch((e) => {
        console.warn('issue fetching punk"s provenance');
        return [];
      });
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
