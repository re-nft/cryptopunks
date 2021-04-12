// will not work right now, because there is an issue with the graphprotocol
// see: https://github.com/re-nft/cryptopunks/issues/21
// for that reason there is a function below: parsePackedRentData to extract
// the correct data and use it on the client side
export const getTenant = (punk) => {
  const { provenance } = punk;
  if (!provenance || provenance.length === 0) { return 'none'; };
  const descendingProvenance = provenance.sort((a, b) => (b.tenancyDates.end - a.tenancyDates.end));
  const latestTenancy = descendingProvenance[0];
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  if (latestTenancy.tenancyDates.end > secondsSinceEpoch) return latestTenancy;
  return 'none';
}

// pass minSalePriceInWei here from the subgraph
export const parsePackedRentData = (packedHexData) => {
  if (!packedHexData.startsWith('0x')) {
    throw new Error('unknown format packed data sent. Should be a hex string');
  }

  const placeholder = '0x' + packedHexData.slice(2, 4);
  const checksum = '0x' + packedHexData.slice(4, 6);
  const protoVersion = parseInt('0x' + packedHexData.slice(6, 8));
  const rentLength = parseInt('0x' + packedHexData.slice(8, 12));

  return { placeholder, checksum, protoVersion, rentLength };
}

export const short = (txt) => {
  return txt.slice(0, 5) + '...' + txt.slice(txt.length - 3, txt.length);
}
