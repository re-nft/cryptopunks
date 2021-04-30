import React, { createContext, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import blockies from 'ethereum-blockies';
import { request } from 'graphql-request';

import { parsePackedRentData } from '../utils';
import {
  queryAllCurrentlyGiftedPunks,
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

const ENDPOINT =
  'https://api.thegraph.com/subgraphs/id/QmVUpW3EEa6mkPJWdEGxe24ZvvS8cxfhZqfn3iccX4TSTP';

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
    this.src = `punks/punk${this.getPunkID(this.punkID)}.png`;
  }

  // TODO: complete retardedness. Rename those downloaded files to follow the same naming pattern
  getPunkID(punkID) {
    const intID = parseInt(punkID);
    if (intID > 1000) {
      return punkID;
    } else {
      if (intID < 10) {
        return '00' + punkID;
      } else if (intID < 100) {
        return '0' + punkID;
      } else {
        return punkID;
      }
    }
  }
}

export function PunkProvider({ children }) {
  const { address } = useContext(UserContext);
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
            new Cryptopunk(
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

  // todo: create punks and then filter. that way we will not perform
  // todo: the end computation twice
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
          new Cryptopunk(
            p.cryptopunk.id,
            p.cryptopunk.owner.id,
            p.tenant.id,
            p.tenancyDates.start,
            p.minSalePriceInWei
          )
      );

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
    request(ENDPOINT, queryAllCurrentlyGiftedPunks)
      .then((d) => {
        const { provenances } = d;
        const parsedProvenances = parseProvenances(provenances || []);

        /* eslint-disable */
        setGiftedPunks(parsedProvenances);

        if (address) {
          setIGiftedPunks(
            parsedProvenances.filter((pp) => pp.owner.toLowerCase() === address)
          );
          setGiftedToMePunks(
            parsedProvenances.filter(
              (pp) => pp.tenant.toLowerCase() === address
            )
          );
        }
      })
      /* eslint-enable */
      .catch((e) => {
        console.warn('issue pulling gifted punks');
        console.warn(e);
        setGiftedPunks([]);
      });

    if (address) {
      request(ENDPOINT, queryCryptopunksOfOwner(address)).then(
        ({ userAddresses }) => {
          if (!userAddresses.length) return;
          const { cryptopunks } = userAddresses[0];
          const punks = [];
          cryptopunks.forEach((punk) => {
            if (!punk.provenance) {
              punks.push(new Cryptopunk(punk.id, address, '', '', ''));
            } else {
              // TODO: provenance should be an array!
              punks.push(
                new Cryptopunk(
                  punk.id,
                  address,
                  punk.provenance.tenant ? punk.provenance.tenant.id : '',
                  punk.provenance.tenancyDates
                    ? punk.provenance.tenancyDates.start
                    : '',
                  punk.provenance.minSalePriceInWei
                )
              );
            }
          });
          setOwnedPunks(punks);
        }
      );
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
