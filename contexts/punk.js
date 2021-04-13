import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blockies from 'ethereum-blockies';
import { request } from 'graphql-request';

import { parsePackedRentData } from '../utils';
import {
  queryAllGiftedPunks,
  queryProvenancyOfPunk,
  queryProvenancyOfOwner,
} from './utils/queries';

const PunkContext = createContext({
  giftedPunks: [],
  iGiftedPunks: [],
  giftedToMePunks: [],
  ownedPunks: [],
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
  const [ownedPunks, setOwnedPunks] = useState([]);

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

  const parseProvenances = (provenances) =>
    provenances
      .filter((p) => {
        const { rentLength } = parsePackedRentData(p.minSalePriceInWei);
        const end = p.tenancyDates.start + rentLength * 86400;
        const now = Math.round(Date.now() / 1000);
        return end > now;
      })
      .map(
        (p) =>
          new Provenance(
            p.cryptopunk.id,
            p.cryptopunk.owner.id,
            p.tenant.id,
            p.tenancyDates.start,
            p.minSalePriceInWei
          )
      );

  useEffect(() => {
    const provenanceOwnerQuery = queryProvenancyOfOwner(currentAddress);
    // TODO: only pulls this once. add a poller
    request(ENDPOINT, queryAllGiftedPunks)
      .then((d) => {
        const { provenances } = d;
        const parsedProvenances = parseProvenances(provenances || []);

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

    request(ENDPOINT, provenanceOwnerQuery).then(({ cryptopunks }) => {
      const parsedProvenances = parseProvenances(
        cryptopunks.reduce((acc, c) => {
          acc = [...acc, ...c.provenance];
          return acc;
        }, [])
      );
      setOwnedPunks(parsedProvenances);
    });
  }, []);

  return (
    <PunkContext.Provider
      value={{
        ownedPunks,
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
