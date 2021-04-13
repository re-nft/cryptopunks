import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { toBN, checksum } from '../utils';

const InputsContext = createContext();

const PROTOCOL_VERSION = '00';

export const InputsProvider = ({ children }) => {
  const [giftingRentLength, _setGiftingRentLength] = useState();
  const [toAddress, setToAddress] = useState();
  const [transaction, setTransaction] = useState('');

  const setGiftingRentLength = useCallback((newRentLength) => {
    if (!newRentLength) return '';
    const newRent = toBN(newRentLength).toHexString();
    const hexNewRent = newRent.slice(2, newRent.length);
    const parsedHexNewRent = '0'.repeat(4 - hexNewRent.length) + hexNewRent;
    const prelimTxn =
      '0xff' + '00' + PROTOCOL_VERSION + parsedHexNewRent + '0'.repeat(54);
    const _checksum = checksum(toBN(prelimTxn));
    // to hex and can only be 4 nybles long. So do not allow input of larger than 0xffff. Which is 65535 in decimal. But since the protocol does not allow anything in excess of 99 days. Set that as the maximum
    setTransaction(
      '0xff' +
        _checksum.slice(2, 4) +
        PROTOCOL_VERSION +
        parsedHexNewRent +
        '0'.repeat(54)
    );
    _setGiftingRentLength(newRentLength);
  }, []);

  return (
    <InputsContext.Provider
      value={{
        giftingRentLength,
        setGiftingRentLength,
        transaction,
        toAddress,
        setToAddress,
      }}
    >
      {children}
    </InputsContext.Provider>
  );
};

InputsProvider.propTypes = {
  children: PropTypes.node,
};

export default InputsContext;
