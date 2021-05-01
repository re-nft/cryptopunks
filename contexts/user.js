import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import Web3Modal, { getInjectedProvider } from 'web3modal';

const DefaultUser = {
  address: '',
};

const UserContext = createContext(DefaultUser);

export const UserProvider = ({ children }) => {
  // const [currentAddress, setAddress] = useState(DefaultUser.currentAddress);
  const [provider, setProvider] = useState();
  const [web3Provider, setWeb3Provider] = useState();
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();

  const providerOptions = {};
  // web3modal is only working in browser\]
  const web3Modal = useMemo(() => {
    return typeof window !== 'undefined'
      ? new Web3Modal({
          cacheProvider: false,
          providerOptions, // required
        })
      : null;
  }, [typeof window]);

  // TODO connect only works if metamask is installed, otherwise it just creates a grayed empty popup
  const connect = useCallback(async () => {
    if (web3Modal) {
      const provider = await web3Modal.connect();
      const web3provider = new ethers.providers.Web3Provider(provider);
      const _signer = await web3provider.getSigner();
      setSigner(_signer);
      setAddress((await _signer.getAddress()).toLowerCase());
      setProvider(provider);
      setWeb3Provider(web3Provider);
      return Promise.resolve(web3provider);
    }
  }, [web3Modal]);

  // reconnect if connected once
  // this is necessary, because metamask window shows connected state in it's wallet
  // this will not connect if never connected or clicked on disconnect, try it in private window
  useEffect(() => {
    const injectedProvider = getInjectedProvider();
    if (web3Modal) {
      if (injectedProvider && !provider) {
        connect();
      }
    }
  }, [web3Modal]);

  // change account
  useEffect(() => {
    if (provider) {
      provider.on('accountsChanged', connect);
    }
    return () => {
      if (provider) {
        provider.off('accountsChanged', connect);
      }
    };
  }, [provider]);

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
