import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import blockies from 'ethereum-blockies';
import { request } from 'graphql-request';
import { ethers } from 'ethers';

import { parsePackedRentData, sortByTimestamp } from '../utils';
import {
  queryAllPunks,
  queryProvenancyOfPunk,
  queryCryptopunksOfOwner,
} from './utils/queries';
import UserContext from '../contexts/user';

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

// 'https://api.thegraph.com/subgraphs/id/QmYf71puLa7q67Kztmpxv6ZxmahAgbm7PLiiRePNwhGXdW';
class Cryptopunk {
  constructor(punkID, owner, tenant, start, minSalePriceInWei) {
    this.punkID = punkID;
    this.owner = owner;
    this.tenant = tenant;
    this.tenantIcon = tenant
      ? blockies
          .create({
            seed: tenant,
            color: '#dfe',
            bgcolor: '#aaa',
            size: 15,
            scale: 3,
            spotcolor: '#000',
          })
          .toDataURL()
      : '';
    this.provenance = [];
    this.start = start || '';

    if (minSalePriceInWei) {
      const { rentLength } = parsePackedRentData(minSalePriceInWei);
      this.end = this.start + rentLength * 86400;
      this.rentLengthInDays = rentLength;
    } else {
      this.end = '';
      this.rentLengthInDays = '';
    }
    this.src = `punks/punk-${this.punkID}.png`;
  }
}

export const mapToPunk = (p) =>
  new Cryptopunk(
    p.cryptopunk.id,
    p.cryptopunk.owner.id,
    p.tenant.id,
    p.tenancyDates.start,
    p.minSalePriceInWei
  );

export const filterNonZeroTenant = (p) => {
  return p.tenant.id !== ethers.constants.AddressZero;
};

export const filterCurrentPunk = (p) => {
  const { rentLength } = parsePackedRentData(p.minSalePriceInWei);
  const end = p.tenancyDates.start + rentLength * 86400;
  const now = Math.round(Date.now() / 1000);
  return end > now && filterNonZeroTenant(p);
};

const errorFromRequest = (errorText) => (e) => {
  console.warn(errorText);
  console.warn(e);
};

const getProvenances = (query, errorText) => {
  return request(process.env.GRAPH_ENDPOINT, query)
    .then(({ provenances }) => {
      return provenances || [];
    })
    .catch(errorFromRequest(errorText));
};

export function PunkProvider({ children }) {
  const { address } = useContext(UserContext);
  const [giftedPunks, setGiftedPunks] = useState([]);
  const [allGiftedPunks, setAllGiftedPunks] = useState([]);
  const [iGiftedPunks, setIGiftedPunks] = useState([]);
  const [giftedToMePunks, setGiftedToMePunks] = useState([]);
  const [ownedPunks, setOwnedPunks] = useState([]);

  const [activePunk, _setActivePunk] = useState(null);

  const setActivePunk = (punk) => {
    _setActivePunk(punk);
  };

  const provenanceOfPunk = useCallback((punk) => {
    return getProvenances(
      queryProvenancyOfPunk(punk.punkID),
      'issue fetching punk"s provenance'
    ).then((result) => {
      if (result) return result.sort(sortByTimestamp).map(mapToPunk);
      return [];
    });
  }, []);

  useEffect(() => {
    if (address) {
      setIGiftedPunks(
        giftedPunks.filter((pp) => pp.owner.toLowerCase() === address)
      );
      setGiftedToMePunks(
        giftedPunks.filter((pp) => pp.tenant.toLowerCase() === address)
      );
    }
  }, [address, giftedPunks]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setOwnedPunks([
        new Cryptopunk(
          1138,
          '0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE',
          '0x465DCa9995D6c2a81A9Be80fBCeD5a770dEE3daE',
          1619277539,
          '0xff3600000f000000000000000000000000000000000000000000000000000000'
        ),
      ]);
    }

    // TODO: only pulls this once. add a poller
    getProvenances(queryAllPunks, 'issue fetching all punks').then((result) => {
      if (result) {
        const sortedResult = result.sort(sortByTimestamp);
        setAllGiftedPunks(
          sortedResult.filter(filterNonZeroTenant).map(mapToPunk)
        );
        // todo: create punks and then filter. that way we will not perform
        // todo: the end computation twice
        setGiftedPunks(sortedResult.filter(filterCurrentPunk).map(mapToPunk));
      }
    });

    if (address) {
      request(process.env.GRAPH_ENDPOINT, queryCryptopunksOfOwner(address))
        .then(({ userAddresses }) => {
          if (!userAddresses.length && userAddresses.length > 0) return;
          const { cryptopunks } = userAddresses[0];
          const punks = cryptopunks.map((punk) => {
            // TODO: provenance should be an array!
            return new Cryptopunk(
              punk.id,
              address,
              punk.provenance && punk.provenance.tenant
                ? punk.provenance.tenant.id
                : '',
              punk.provenance && punk.provenance.tenancyDates
                ? punk.provenance.tenancyDates.start
                : '',
              punk.provenance ? punk.provenance.minSalePriceInWei : ''
            );
          });
          setOwnedPunks(punks);
        })
        .catch(errorFromRequest('Could not fetch the cryptopunks of owner'));
    }
  }, [address]);

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
        allGiftedPunks,
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
