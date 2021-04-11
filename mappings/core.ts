/* tslint:disable */
import { Bytes, BigInt, Address, ethereum, crypto, ByteArray, log } from "@graphprotocol/graph-ts";

import {
  PunkOffered,
  PunkBought,
  PunkTransfer
} from "../generated/CryptopunkRent/Cryptopunks";
import {
  UserAddress,
  Provenance,
  TenancyDates,
  Cryptopunk
} from "../generated/schema";

let ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
let TIMESTAMP_BIG_BANG = BigInt.fromI32(0);
let CHECKSUM_MASK = BigInt.fromI32(0xff00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
let MAX_RENT_LENGTH = BigInt.fromI32(99);

createUserAddress(ADDRESS_ZERO);

// --- Packed Rent Data Verifiers ---
function computeChecksum(minSalePriceInWei: BigInt): string {
  let checksumThis = CHECKSUM_MASK.bitAnd(minSalePriceInWei);
  let checksumThisHex = checksumThis.toHex();
  log.info('[computeChecksum] checksumThisHex = {}', [checksumThisHex]);
  let checksumByteArray = ByteArray.fromHexString(checksumThisHex);
  let k256 = crypto.keccak256(checksumByteArray);
  log.info('[computeChecksum] k256 = {}', [k256.toHex()]);
  return k256.toHex().slice(2, 4);
}

function verifyRentEvent(minSalePriceInWei: BigInt): boolean {
  let hexPacked = minSalePriceInWei.toHex();
  log.info('[verifyRentEvent] hexPacked (minSalePriceInWei) = {}', [hexPacked]);
  let placeholder = hexPacked.slice(2, 4);
  log.info('[verifyRentEvent] placeholder = {}', [placeholder]);
  // if (placeholder != "ff") {
  //   return false;
  // }
  let checksum = hexPacked.slice(4, 6);
  log.info('[verifyRentEvent] checksum = {}', [checksum]);
  return true;
  // let computedChecksum = computeChecksum(minSalePriceInWei);
  // log.info('[verifyRentEvent] computed checksum = {}', [computedChecksum])
  // if (checksum != computedChecksum) {
  //   return false;
  // }
  // return true;
}
// --- * ---

// --- ID Getters ---
function getAddressID(userAddress: Address): string {
  return userAddress.toHex();
}

function getCryptopunkID(cryptopunkID: BigInt): string {
  return cryptopunkID.toString();
}

function getTenancyDatesID(cryptopunkID: BigInt, transaction: ethereum.Transaction): string {
  return getCryptopunkID(cryptopunkID) + "::" + transaction.hash.toHex() + "::" + transaction.index.toHex();
}

function getProvenanceID(cryptopunkID: BigInt): string {
  return getCryptopunkID(cryptopunkID);
}
// --- * ---

// --- Entity Creators ---
function createUserAddress(userAddress: string): void {
  let addr = UserAddress.load(userAddress);
  if (addr == null) {
    addr = new UserAddress(userAddress);
    addr.save();
  }
}

function createTenancyDates(tenancyDatesID: string): void {
  let tenancyDates = TenancyDates.load(tenancyDatesID);
  if (tenancyDates == null) {
    tenancyDates = new TenancyDates(tenancyDatesID);
    tenancyDates.start = TIMESTAMP_BIG_BANG;
    tenancyDates.end = TIMESTAMP_BIG_BANG;
    tenancyDates.save();
  }
}

function createCryptopunk(cryptopunkID: string): void {
  let cryptopunk = Cryptopunk.load(cryptopunkID);
  if (cryptopunk == null) {
    cryptopunk = new Cryptopunk(cryptopunkID);
    cryptopunk.owner = UserAddress.load(ADDRESS_ZERO).id;
    cryptopunk.save();
  }
}

function createProvenance(provenanceID: string, cryptopunkID: string, tenancyID: string): void {
  createCryptopunk(cryptopunkID);
  createTenancyDates(tenancyID);
  let provenance = Provenance.load(provenanceID);
  if (provenance == null) {
    provenance = new Provenance(provenanceID);
    provenance.tenant = UserAddress.load(ADDRESS_ZERO).id;
    provenance.cryptopunk = Cryptopunk.load(cryptopunkID).id;
    provenance.tenancyDates = TenancyDates.load(tenancyID).id;
    provenance.save();
  }
}
// --- * ---

function unpackRentLength(hexPackedRentData: string): BigInt {
  return BigInt.fromI32(Bytes.fromHexString('0x' + hexPackedRentData.slice(8, 12)).toI32());
}

export function handlePunkOffered(e: PunkOffered): void {
  // let validRentEvent = verifyRentEvent(e.params.minValue);
  // if (!validRentEvent) return;

  let from = e.transaction.from;
  let newTenant = e.params.toAddress;
  let hexPackedRentData = e.params.minValue.toHex();

  let ownerID = getAddressID(from);
  let newTenantID = getAddressID(newTenant);
  let rentLength = unpackRentLength(hexPackedRentData);
  let cryptopunkID = getCryptopunkID(e.params.punkIndex);
  let tenancyDatesID = getTenancyDatesID(e.params.punkIndex, e.transaction);
  let provenanceID = getProvenanceID(e.params.punkIndex);

  createUserAddress(ownerID);
  createUserAddress(newTenantID);
  createCryptopunk(cryptopunkID);
  createTenancyDates(tenancyDatesID);
  createProvenance(provenanceID, cryptopunkID, tenancyDatesID);

  // ? redundant loading. I am scared of subgraph, so extra caution is warranted
  let cryptopunk = Cryptopunk.load(cryptopunkID);
  cryptopunk.owner = UserAddress.load(ownerID).id;
  cryptopunk.save();

  let tenancyDates = TenancyDates.load(tenancyDatesID);
  tenancyDates.start = e.block.timestamp;
  tenancyDates.end = e.block.timestamp.plus(rentLength.times(BigInt.fromI32(86400)));
  tenancyDates.save();

  let provenance = Provenance.load(provenanceID);
  provenance.cryptopunk = cryptopunk.id;
  provenance.tenant = UserAddress.load(newTenantID).id;
  provenance.tenancyDates = tenancyDates.id;
  provenance.save();
}

export function handlePunkBought(e: PunkBought): void {
  let ownerID = getAddressID(e.params.toAddress);
  let cryptopunkID = getCryptopunkID(e.params.punkIndex);

  createUserAddress(ownerID);
  createCryptopunk(cryptopunkID);

  let owner = UserAddress.load(ownerID);
  let cryptopunk = Cryptopunk.load(cryptopunkID);

  cryptopunk.owner = owner.id;
  cryptopunk.save();
}

export function handlePunkTransfer(e: PunkTransfer): void {
  let ownerID = getAddressID(e.params.to);
  let cryptopunkID = getCryptopunkID(e.params.punkIndex);

  createUserAddress(ownerID);
  createCryptopunk(cryptopunkID);

  let owner = UserAddress.load(ownerID);
  let cryptopunk = Cryptopunk.load(cryptopunkID);

  cryptopunk.owner = owner.id;
  cryptopunk.save();
}
