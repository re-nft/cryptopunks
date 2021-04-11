export const getTenant = (punk) => {
  const { provenance } = punk;
  if (!provenance || provenance.length === 0) { return 'none'; };
  const descendingProvenance = provenance.sort((a, b) => (b.tenancyDates.end - a.tenancyDates.end));
  const latestTenancy = descendingProvenance[0];
  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  if (latestTenancy.tenancyDates.end > secondsSinceEpoch) return latestTenancy;
  return 'none';
}
