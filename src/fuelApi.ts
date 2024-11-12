import axios from "axios";
import { Address, Signer, hashMessage } from 'fuels';

const FUEL_GRAPHQL_ENDPOINT = "https://mainnet.fuel.network/v1/graphql";

export async function getAddressAssetBalance(address: string, assetId: string) {
  const query = `
    query Balance($address: Address, $assetId: AssetId) {
      balance(owner: $address, assetId: $assetId) {
        owner
        amount
        assetId
      }
    }
  `;

  const variables = {
    address,
    assetId,
  };

  try {
    const response = await axios.post(
      FUEL_GRAPHQL_ENDPOINT,
      {
        query,
        variables,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

export async function listAddressAssetBalances(owner: string) {
  const query = `
    query Balances($filter: BalanceFilterInput) {
      balances(filter: $filter, first: 5) {
        nodes {
          amount
          assetId
        }
      }
    }
  `;

  const variables = {
    filter: {
      owner,
    },
  };

  try {
    const response = await axios.post(
      FUEL_GRAPHQL_ENDPOINT,
      {
        query,
        variables,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

export async function getChainName() {
  const query = `
    {
      chain {
        name
      }
    }
  `;

  try {
    const response = await axios.post(
      FUEL_GRAPHQL_ENDPOINT,
      {
        query,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

export async function listAddressMessages(address: string) {
  const query = `
    query MessageInfo($address: Address) {
      messages(owner: $address, first: 5) {
        nodes {
          amount
          sender
          recipient
          nonce
          data
          daHeight
        }
      }
    }
  `;

  const variables = {
    address,
  };

  try {
    const response = await axios.post(
      FUEL_GRAPHQL_ENDPOINT,
      {
        query,
        variables,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

export async function listAddressTransactions(address: string) {
  const query = `
    query Transactions($address: Address) {
      transactionsByOwner(owner: $address, first: 5) {
        nodes {
          id
          inputs {
            __typename
            ... on InputCoin {
              owner
              utxoId
              amount
              assetId
            }
            ... on InputContract {
              utxoId
              contractId
            }
            ... on InputMessage {
              sender
              recipient
              amount
              data
            }
          }
          outputs {
            __typename
            ... on CoinOutput {
              to
              amount
              assetId
            }
            ... on ContractOutput {
              inputIndex
              balanceRoot
              stateRoot
            }
            ... on ChangeOutput {
              to
              amount
              assetId
            }
            ... on VariableOutput {
              to
              amount
              assetId
            }
            ... on ContractCreated {
              contract
              stateRoot
            }
          }
          status {
            __typename
            ... on FailureStatus {
              reason
              programState {
                returnType
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    address,
  };

  try {
    const response = await axios.post(
      FUEL_GRAPHQL_ENDPOINT,
      {
        query,
        variables,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

export async function listContractAssetBalances(contract: string) {
  const query = `
    query ContractBalances($filter: ContractBalanceFilterInput!) {
      contractBalances(filter: $filter, first: 5) {
        nodes {
          amount
          assetId
        }
      }
    }
  `;

  const variables = {
    filter: {
      contract,
    },
  };

  try {
    const response = await axios.post(
      FUEL_GRAPHQL_ENDPOINT,
      {
        query,
        variables,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

export async function listLatestTransactions() {
  const query = `
    query LatestTransactions {
      transactions(last: 5) {
        nodes {
          id
          inputs {
            __typename
            ... on InputCoin {
              owner
              utxoId
              amount
              assetId
            }
            ... on InputContract {
              utxoId
              contractId
            }
            ... on InputMessage {
              sender
              recipient
              amount
              data
            }
          }
          outputs {
            __typename
            ... on CoinOutput {
              to
              amount
              assetId
            }
            ... on ContractOutput {
              inputIndex
              balanceRoot
              stateRoot
            }
            ... on ChangeOutput {
              to
              amount
              assetId
            }
            ... on VariableOutput {
              to
              amount
              assetId
            }
            ... on ContractCreated {
              contract
              stateRoot
            }
          }
          status {
            __typename
            ... on FailureStatus {
              reason
              programState {
                returnType
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      FUEL_GRAPHQL_ENDPOINT,
      {
        query,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

export async function submitTransaction(encodedTransaction: string) {
  const query = `
    mutation submit($encodedTransaction: HexString!) {
      submit(tx: $encodedTransaction) {
        id
      }
    }
  `;

  const variables = {
    encodedTransaction,
  };

  try {
    const response = await axios.post(
      FUEL_GRAPHQL_ENDPOINT,
      {
        query,
        variables,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}


// Define the badRequestError function
function badRequestError(message: string): Error {
  return new Error(message);
}

export const verifyFuelSignature = async ({
  header,
  payload,
  signature,
}: {
  header: { t: string }; // Specify the expected structure of the header
  payload: {
    address: string;
    statement: string;
  };
  signature: string;
}): Promise<boolean> => {
  try {
    // Verify the header type
    if (header.t !== "fuel-v1") {
      throw badRequestError("Invalid header type");
    }

    // Check if the address is empty
    if (payload.address === "") {
      throw badRequestError("Fuel signature verification failed");
    }

    const signerAddress = Address.fromString(payload.address);
    const messageHash = hashMessage(payload.statement);
    const recoveredAddress = await Signer.recoverAddress(
      messageHash,
      signature
    );

    return recoveredAddress.toString() === signerAddress.toString();
  } catch (error) {
    console.log(error);
    throw badRequestError("Fuel signature verification failed");
  }
};

