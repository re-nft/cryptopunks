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
      where: { id: "0x7583534d2f2c3699b1acd11b9f2fac9c35acc45c" }
    ) {
      cryptopunks {
        id
        provenance {
          tenant {
            id
          }
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
