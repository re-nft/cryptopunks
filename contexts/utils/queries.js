export const queryAllGiftedPunks = `
  {
    provenances(
      where: { tenant_not: "0x0000000000000000000000000000000000000000" }
    ) {
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
  }
`;

export const queryCryptopunksOfOwner = (ownerAddress) => `
  {
    userAddresses(
      where: { id: "0xc352b534e8b987e036a93539fd6897f53488e56a" }
    ) {
      cryptopunks {
        id
        provenance {
          tenant
          minSalePriceInWei
          tenancyDates {
            start
          }
        }
      }
    }
  }
`;

export const queryProvenancyOfPunk = (punkID) => `{
  provenances(where: {id: ${punkID.toLowerCase()}}) {
    cryptopunk {
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
