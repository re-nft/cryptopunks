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
      where: { id: "${ownerAddress.toLowerCase()}" }
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
  provenances(where: {id: ${punkID.toString().toLowerCase()}}) {
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
