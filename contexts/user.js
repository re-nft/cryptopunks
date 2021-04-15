import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const DefaultUser = {
  address: '',
};

const UserContext = createContext(DefaultUser);

export const UserProvider = ({ children }) => {
  // const [currentAddress, setAddress] = useState(DefaultUser.currentAddress);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();

  const getWeb3ModalProvider = async () => {
    const providerOptions = {};
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions, // required
    });
    return await web3Modal.connect();
  };

  const connect = async () => {
    const provider = await getWeb3ModalProvider();
    const web3provider = new ethers.providers.Web3Provider(provider);
    const _signer = await web3provider.getSigner();
    setSigner(_signer);
    setAddress((await _signer.getAddress()).toLowerCase());
    setProvider(web3provider);
    return Promise.resolve(web3provider);
  };

  return (
    <UserContext.Provider value={{ connect, provider, signer, address }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserContext;
