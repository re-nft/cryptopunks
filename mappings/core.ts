import { Bytes, BigInt, Address, ethereum } from "@graphprotocol/graph-ts";

import {
  PunkOffered,
  PunkBought,
  PunkTransfer
} from "../generated/CryptopunkRent/Cryptopunks";
import {
  Address as UserAddress,
  Provenance,
  TenancyDates,
  Cryptopunk
} from "../generated/schema";
const getAddressID = (userAddress: Address): string => {
  return userAddress.toHex();
}

const fetchAddress = (userAddress: string): UserAddress => {
  let address = UserAddress.load(userAddress);
  if (address == null) {
    address = new UserAddress(userAddress);
  }
  return <UserAddress>address;
}

const getTenancyDatesID = (transaction: ethereum.Transaction): string => {
  return transaction.hash.toHex() + "::" + transaction.index.toString();
}

const fetchTenancyDates = (tenancyDatesID: string): TenancyDates => {
  let tenancyDates = TenancyDates.load(tenancyDatesID);
  if (tenancyDates == null) {
    tenancyDates = new TenancyDates(tenancyDatesID);
  }
  return <TenancyDates>tenancyDates;
}

const getCryptopunkID = (cryptopunkID: BigInt): string => {
  return cryptopunkID.toString();
}

const fetchCryptopunk = (cryptopunkID: string): Cryptopunk => {
  let cryptopunk = Cryptopunk.load(cryptopunkID);
  if (cryptopunk == null) {
    cryptopunk = new Cryptopunk(cryptopunkID);
  }
  return <Cryptopunk>cryptopunk;
}

const getProvenanceID = (cryptopunkID: BigInt): string => {
  return getCryptopunkID(cryptopunkID);
}

const fetchProvenance = (provenanceID: string): Provenance => {
  let provenance = Provenance.load(provenanceID);
  if (provenance == null) {
    provenance = new Provenance(provenanceID);
  }
  return <Provenance>provenance;
}

const unpackRentLength = (packedRentData: BigInt): BigInt => {
  let hexRentData = packedRentData.toHex();
  return BigInt.fromI32(Bytes.fromHexString(hexRentData.slice(8, 12)).toI32());
}

export const handlePunkOffered = (e: PunkOffered): void => {
  let from = e.transaction.from;
  let cryptopunkID = e.params.punkIndex;
  let newTenant = e.params.toAddress;
  let rentLength = unpackRentLength(e.params.minValue);

  let owner = fetchAddress(getAddressID(from));
  let tenant = fetchAddress(getAddressID(newTenant));
  let provenance = fetchProvenance(getProvenanceID(cryptopunkID))
  let cryptopunk = fetchCryptopunk(getCryptopunkID(cryptopunkID));
  let tenancyDates = fetchTenancyDates(getTenancyDatesID(e.transaction));

  owner.save();
  tenant.save();

  tenancyDates.start = e.block.timestamp;
  tenancyDates.end = e.block.timestamp + rentLength * BigInt.fromI32(86400);
  tenancyDates.save();

  provenance.cryptopunk = cryptopunk.id;
  provenance.tenant = tenant.id;
  provenance.tenancyDates = tenancyDates.id;
  provenance.save();

  cryptopunk.owner = owner.id;
  cryptopunk.save();
}

// event PunkBought(uint indexed punkIndex, uint value, address indexed fromAddress, address indexed toAddress);
export const handlePunkBought = (e: PunkBought): void => {
  let owner = fetchAddress(getAddressID(e.params.toAddress));
  let cryptopunk = fetchCryptopunk(getCryptopunkID(e.params.punkIndex));

  owner.save();

  cryptopunk.owner = owner.id;
  cryptopunk.save();
}

// event PunkTransfer(address indexed from, address indexed to, uint256 punkIndex);
export const handlePunkTransfer = (e: PunkTransfer): void => {
  let owner = fetchAddress(getAddressID(e.params.to));
  let cryptopunk = fetchCryptopunk(getCryptopunkID(e.params.punkIndex));

  owner.save();

  cryptopunk.owner = owner.id;
  cryptopunk.save();
}
