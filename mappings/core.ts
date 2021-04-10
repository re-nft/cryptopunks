import { Bytes, BigInt, Address, ethereum, crypto, ByteArray, log } from "@graphprotocol/graph-ts";

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

const PROTOCOL_PLACEHOLDER_MIN_VALUE = 0xff00000000000000000000000000000000000000000000000000000000000000;
const CHECKSUM_MASK = 0xff00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
const MAX_RENT_LENGTH = 99;

function computeChecksum(minSalePriceInWei: BigInt): string {
  let minSalePriceInWeiInI32 = minSalePriceInWei.toI32();
  log.info('minSalePriceInWeiInI32 = {}', [<string>minSalePriceInWeiInI32]);
  let checksumThisInI32 = CHECKSUM_MASK & minSalePriceInWeiInI32;
  let checksumThis = BigInt.fromI32(checksumThisInI32);
  let checksumThisHex = checksumThis.toHex();
  log.info('checksumThisHex = {}', [checksumThisHex]);
  let checksumByteArray = ByteArray.fromHexString(checksumThisHex);
  let k256 = crypto.keccak256(checksumByteArray);
  log.info('k256 = {}', [k256.toHex()]);
  return k256.toHex().slice(2, 4);
}

function verifyRentEvent(minSalePriceInWei: BigInt): bool {
  let hexPacked = minSalePriceInWei.toHex();
  log.info('hexPacked (minSalePriceInWei) = {}', [hexPacked]);
  let placeholder = hexPacked.slice(2, 4);
  log.info('placeholder = {}', [placeholder]);
  if (placeholder != "ff") {
    return false;
  }
  let checksum = hexPacked.slice(4, 6);
  log.info('checksum = {}', [checksum])
  let computedChecksum = computeChecksum(minSalePriceInWei);
  log.info('computed checksum = {}', [computedChecksum])
  if (checksum != computedChecksum) {
    return false;
  }
  return true;
}

function getAddressID(userAddress: Address): string {
  return userAddress.toHex();
}

function fetchAddress(userAddress: string): UserAddress {
  let address = UserAddress.load(userAddress);
  if (address == null) {
    address = new UserAddress(userAddress);
  }
  return <UserAddress>address;
}

function getTenancyDatesID(transaction: ethereum.Transaction): string {
  return transaction.hash.toHex() + "::" + transaction.index.toString();
}

function fetchTenancyDates(tenancyDatesID: string): TenancyDates {
  let tenancyDates = TenancyDates.load(tenancyDatesID);
  if (tenancyDates == null) {
    tenancyDates = new TenancyDates(tenancyDatesID);
  }
  return <TenancyDates>tenancyDates;
}

function getCryptopunkID(cryptopunkID: BigInt): string {
  return cryptopunkID.toString();
}

function fetchCryptopunk(cryptopunkID: string): Cryptopunk {
  let cryptopunk = Cryptopunk.load(cryptopunkID);
  if (cryptopunk == null) {
    cryptopunk = new Cryptopunk(cryptopunkID);
  }
  return <Cryptopunk>cryptopunk;
}

function getProvenanceID(cryptopunkID: BigInt): string {
  return getCryptopunkID(cryptopunkID);
}

function fetchProvenance(provenanceID: string): Provenance {
  let provenance = Provenance.load(provenanceID);
  if (provenance == null) {
    provenance = new Provenance(provenanceID);
  }
  return <Provenance>provenance;
}

function unpackRentLength(hexPackedRentData: string): BigInt {
  return BigInt.fromI32(Bytes.fromHexString('0x' + hexPackedRentData.slice(8, 12)).toI32());
}

export function handlePunkOffered(e: PunkOffered): void {
  let validRentEvent = verifyRentEvent(e.params.minValue);
  if (!validRentEvent) return;

  let from = e.transaction.from;
  let cryptopunkID = e.params.punkIndex;
  let newTenant = e.params.toAddress;
  let hexPackedRentData = e.params.minValue.toHex();

  let rentLength = unpackRentLength(hexPackedRentData);
  if (rentLength > BigInt.fromI32(MAX_RENT_LENGTH)) return;

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
export function handlePunkBought(e: PunkBought): void {
  let owner = fetchAddress(getAddressID(e.params.toAddress));
  let cryptopunk = fetchCryptopunk(getCryptopunkID(e.params.punkIndex));

  owner.save();

  cryptopunk.owner = owner.id;
  cryptopunk.save();
}

// event PunkTransfer(address indexed from, address indexed to, uint256 punkIndex);
export function handlePunkTransfer(e: PunkTransfer): void {
  let owner = fetchAddress(getAddressID(e.params.to));
  let cryptopunk = fetchCryptopunk(getCryptopunkID(e.params.punkIndex));

  owner.save();

  cryptopunk.owner = owner.id;
  cryptopunk.save();
}
