export const queryAllGiftedPunks = `{
  provenances(where: {tenant_not: "0x0000000000000000000000000000000000000000"}) {
    id
    cryptopunk {
      id
      owner {
        id
      }
    }
    tenant {
      id
    }
    minSalePriceInWei
    tenancyDates {
      start
    }
  }
}`;
