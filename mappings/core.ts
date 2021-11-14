import { BigInt, Address, ethereum, log } from "@graphprotocol/graph-ts";

import {
  PunkOffered,
  PunkBought,
  PunkTransfer,
  Assign
} from "../generated/CryptopunkRent/Cryptopunks";
import {
  UserAddress,
  Provenance,
  TenancyDates,
  Cryptopunk
} from "../generated/schema";

let ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
let TIMESTAMP_BIG_BANG = 0;
// let CHECKSUM_MASK = BigInt.fromI32(0xff00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
let RENT_MAX_LENGTH = 99;

createUserAddress(ADDRESS_ZERO);

// TODO: 1. compute the keccak256. the below does not work
// TODO: 2. compute tenancyDates end date. webassembly studio works, but not the below...

// --- Packed Rent Data Verifiers ---
// TODO: shoot myself
// function computeChecksum(minSalePriceInWei: BigInt): string {
//   let checksumThis = CHECKSUM_MASK.bitAnd(minSalePriceInWei);
//   // let checksumThisHex = checksumThis.toHex();
//   // log.debug('[computeChecksum] checksumThisHex = {}', [checksumThisHex]);
//   // let checksumByteArray = ByteArray.fromHexString(checksumThisHex.slice(2, checksumThisHex.length));
//   let k256 = crypto.keccak256(ByteArray.fromHexString(checksumThis.toHexString()));
//   log.debug('[computeChecksum] computedChecksum = {}', [k256.toHex()]);
//   return k256.toHex();
//   // log.info('[checksumThis] {}',  [checksumThis.toHex().slice(2, 4)]);
//   // return checksumThis.toHex().slice(2, 4);
// }

function verifyRentEvent(minSalePriceInWei: BigInt): boolean {
  let hexPacked = minSalePriceInWei.toHex();
  hexPacked = hexPacked + '0'.repeat(66 - hexPacked.length);
  log.debug('[verifyRentEvent] minSalePriceInWei = {}', [hexPacked]);
  let placeholder = hexPacked.slice(2, 4);
  log.debug('[verifyRentEvent] placeholder = {}', [placeholder]);
  if (placeholder != "ff") {
    log.info('[verifyRentEvent] not a rent event. incorrect placeholder.', []);
    return false;
  }
  // slice(8, 12); -> 000e
  let rentLength = unpackRentLength(hexPacked);
  if (rentLength > RENT_MAX_LENGTH) {
    log.info('[verifyRentEvent] not a rent event. rent length exceeds max.', []);
    return false;
  }
  // let checksum = hexPacked.slice(4, 6);
  // log.info('[verifyRentEvent] checksum = {}', [checksum]);
  // let computedChecksum = computeChecksum(minSalePriceInWei);
  // log.info('[verifyRentEvent] computed checksum = {}', [computedChecksum]);
  // if (checksum != computedChecksum) {
  //   log.info('[verifyRentEvent] not a rent event. incorrect checksum.', []);
  //   return false;
  // }
  return true;
}
// --- * ---

// --- ID Getters ---
function getAddressID(userAddress: Address): string {
  return userAddress.toHex();
}

function getCryptopunkID(cryptopunkID: BigInt): string {
  return cryptopunkID.toString();
}

function getTenancyDatesID(cryptopunkID: BigInt, transaction: ethereum.Transaction, event: ethereum.Event): string {
  return getCryptopunkID(cryptopunkID) + "::" + transaction.hash.toHex() + "::" + transaction.index.toHex() + "::" + event.logIndex.toString();
}

function getProvenanceID(cryptopunkID: BigInt, transaction: ethereum.Transaction, event: ethereum.Event): string {
  return getCryptopunkID(cryptopunkID) + "::" + transaction.hash.toHex() + "::" + transaction.index.toHex() + "::" + event.logIndex.toString();
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
    provenance.minSalePriceInWei = '';
    provenance.save();
  }
}
// --- * ---

function unpackRentLength(hexPackedRentData: string): i32 {
  let rentLengthString = '0x' + hexPackedRentData.slice(8, 12);
  log.info('[unpackRentLength] rentLengthString = {}', [rentLengthString]);
  // TODO: does not work in graph runtime. I tested in webassembly studio and works correctly...
  // TODO: tested here https://webassembly.studio/
  // TODO: solution for now: compute rentLength on the front-end
  let rentLength = <i32>Number.parseInt(rentLengthString, 16);
  log.info('[unpackRentLength] rentLength = {}', [<string>rentLength]);
  return rentLength;
}

// --- Handlers ---
export function handlePunkOffered(e: PunkOffered): void {
  let validRentEvent = verifyRentEvent(e.params.minValue);
  if (validRentEvent == false) return;

  let from = e.transaction.from;
  let newTenant = e.params.toAddress;
  let hexPackedRentData = e.params.minValue.toHex();

  let ownerID = getAddressID(from);
  let newTenantID = getAddressID(newTenant);
  let rentLength = unpackRentLength(hexPackedRentData);
  let cryptopunkID = getCryptopunkID(e.params.punkIndex);
  let tenancyDatesID = getTenancyDatesID(e.params.punkIndex, e.transaction, e);
  let provenanceID = getProvenanceID(e.params.punkIndex, e.transaction, e);

  createUserAddress(ownerID);
  createUserAddress(newTenantID);
  createCryptopunk(cryptopunkID);
  createTenancyDates(tenancyDatesID);
  createProvenance(provenanceID, cryptopunkID, tenancyDatesID);

  let cryptopunk = Cryptopunk.load(cryptopunkID);
  cryptopunk.owner = UserAddress.load(ownerID).id;
  cryptopunk.save();

  let tenancyDates = TenancyDates.load(tenancyDatesID);
  let start = e.block.timestamp.toI32();
  let end = e.block.timestamp.toI32() + (<i32>rentLength * 86400);
  tenancyDates.start = start;
  tenancyDates.end = end;
  tenancyDates.save();

  let provenance = Provenance.load(provenanceID);
  provenance.cryptopunk = cryptopunk.id;
  provenance.tenant = UserAddress.load(newTenantID).id;
  provenance.tenancyDates = tenancyDates.id;
  provenance.minSalePriceInWei = hexPackedRentData;
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

export function handleAssign(e: Assign): void {
  let ownerID = getAddressID(e.params.to);
  let cryptopunkID = getCryptopunkID(e.params.punkIndex);

  createUserAddress(ownerID);
  createCryptopunk(cryptopunkID);

  let owner = UserAddress.load(ownerID);
  let cryptopunk = Cryptopunk.load(cryptopunkID);

  cryptopunk.owner = owner.id;
  cryptopunk.save();
}
// --- * ---
