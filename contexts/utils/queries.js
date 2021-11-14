// TODO add timestamp
export const queryAllPunks = `
  {
    provenances {
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
  provenances(where: {cryptopunk: "${punkID.toString().toLowerCase()}"}) {
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
