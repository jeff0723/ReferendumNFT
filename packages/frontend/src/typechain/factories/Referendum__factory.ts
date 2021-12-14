/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Referendum, ReferendumInterface } from "../Referendum";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604080518082018252600a8152695265666572656e64756d60b01b6020808301918252835180850190945260048452631493919560e21b90840152815191929162000060916000916200007f565b508051620000769060019060208401906200007f565b50505062000162565b8280546200008d9062000125565b90600052602060002090601f016020900481019282620000b15760008555620000fc565b82601f10620000cc57805160ff1916838001178555620000fc565b82800160010185558215620000fc579182015b82811115620000fc578251825591602001919060010190620000df565b506200010a9291506200010e565b5090565b5b808211156200010a57600081556001016200010f565b6002810460018216806200013a57607f821691505b602082108114156200015c57634e487b7160e01b600052602260045260246000fd5b50919050565b61183e80620001726000396000f3fe608060405234801561001057600080fd5b50600436106100ba5760003560e01c806301ffc9a7146100bf57806306fdde03146100e8578063081812fc146100fd578063095ea7b31461011d57806323b872dd1461013257806342842e0e146101455780636352211e1461015857806370a082311461016b57806395d89b411461018b578063a22cb46514610193578063b88d4fde146101a6578063c87b56dd146101b9578063d85d3d27146101cc578063e985e9c5146101df575b600080fd5b6100d26100cd36600461109b565b6101f2565b6040516100df9190611204565b60405180910390f35b6100f061023a565b6040516100df919061120f565b61011061010b366004611140565b6102cc565b6040516100df91906111b3565b61013061012b366004611072565b610318565b005b610130610140366004610f31565b6103b0565b610130610153366004610f31565b6103e8565b610110610166366004611140565b610403565b61017e610179366004610ee5565b610438565b6040516100df91906116cb565b6100f061047c565b6101306101a1366004611038565b61048b565b6101306101b4366004610f6c565b6104a1565b6100f06101c7366004611140565b6104e0565b6101306101da3660046110d3565b610601565b6100d26101ed366004610eff565b6106eb565b60006001600160e01b031982166380ac58cd60e01b148061022357506001600160e01b03198216635b5e139f60e01b145b80610232575061023282610719565b90505b919050565b60606000805461024990611743565b80601f016020809104026020016040519081016040528092919081815260200182805461027590611743565b80156102c25780601f10610297576101008083540402835291602001916102c2565b820191906000526020600020905b8154815290600101906020018083116102a557829003601f168201915b5050505050905090565b60006102d782610732565b6102fc5760405162461bcd60e51b81526004016102f390611555565b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061032382610403565b9050806001600160a01b0316836001600160a01b031614156103575760405162461bcd60e51b81526004016102f390611639565b806001600160a01b031661036961074f565b6001600160a01b031614806103855750610385816101ed61074f565b6103a15760405162461bcd60e51b81526004016102f390611396565b6103ab8383610753565b505050565b6103c16103bb61074f565b826107c1565b6103dd5760405162461bcd60e51b81526004016102f39061167a565b6103ab83838361083e565b6103ab838383604051806020016040528060008152506104a1565b6000818152600260205260408120546001600160a01b0316806102325760405162461bcd60e51b81526004016102f390611438565b60006001600160a01b0382166104605760405162461bcd60e51b81526004016102f3906113ee565b506001600160a01b031660009081526003602052604090205490565b60606001805461024990611743565b61049d61049661074f565b838361096b565b5050565b6104b26104ac61074f565b836107c1565b6104ce5760405162461bcd60e51b81526004016102f39061167a565b6104da84848484610a0e565b50505050565b60606104eb82610732565b6105075760405162461bcd60e51b81526004016102f390611504565b6000828152600660205260408120805461052090611743565b80601f016020809104026020016040519081016040528092919081815260200182805461054c90611743565b80156105995780601f1061056e57610100808354040283529160200191610599565b820191906000526020600020905b81548152906001019060200180831161057c57829003601f168201915b5050505050905060006105aa610a41565b90508051600014156105be57509050610235565b8151156105f05780826040516020016105d8929190611184565b60405160208183030381529060405292505050610235565b6105f984610a53565b949350505050565b6008600061060d61074f565b6001600160a01b0316815260208101919091526040016000205460ff16156106475760405162461bcd60e51b81526004016102f390611222565b60016008600061065561074f565b6001600160a01b031681526020810191909152604001600020805460ff191691151591909117905561069061068861074f565b600754610ad6565b6106d260075483838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610bb592505050565b600780549060006106e28361177e565b91905055505050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6001600160e01b031981166301ffc9a760e01b14919050565b6000908152600260205260409020546001600160a01b0316151590565b3390565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061078882610403565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006107cc82610732565b6107e85760405162461bcd60e51b81526004016102f39061134a565b60006107f383610403565b9050806001600160a01b0316846001600160a01b0316148061082e5750836001600160a01b0316610823846102cc565b6001600160a01b0316145b806105f957506105f981856106eb565b826001600160a01b031661085182610403565b6001600160a01b0316146108775760405162461bcd60e51b81526004016102f3906115a1565b6001600160a01b03821661089d5760405162461bcd60e51b81526004016102f3906112d3565b6108a88383836103ab565b6108b3600082610753565b6001600160a01b03831660009081526003602052604081208054600192906108dc908490611700565b90915550506001600160a01b038216600090815260036020526040812080546001929061090a9084906116d4565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b0316141561099d5760405162461bcd60e51b81526004016102f390611317565b6001600160a01b0383811660008181526005602090815260408083209487168084529490915290819020805460ff1916851515179055517f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3190610a01908590611204565b60405180910390a3505050565b610a1984848461083e565b610a2584848484610bf9565b6104da5760405162461bcd60e51b81526004016102f39061124a565b60408051602081019091526000815290565b6060610a5e82610732565b610a7a5760405162461bcd60e51b81526004016102f3906115ea565b6000610a84610a41565b90506000815111610aa45760405180602001604052806000815250610acf565b80610aae84610d14565b604051602001610abf929190611184565b6040516020818303038152906040525b9392505050565b6001600160a01b038216610afc5760405162461bcd60e51b81526004016102f3906114cf565b610b0581610732565b15610b225760405162461bcd60e51b81526004016102f39061129c565b610b2e600083836103ab565b6001600160a01b0382166000908152600360205260408120805460019290610b579084906116d4565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b610bbe82610732565b610bda5760405162461bcd60e51b81526004016102f390611481565b600082815260066020908152604090912082516103ab92840190610e35565b6000610c0d846001600160a01b0316610e2f565b15610d0957836001600160a01b031663150b7a02610c2961074f565b8786866040518563ffffffff1660e01b8152600401610c4b94939291906111c7565b602060405180830381600087803b158015610c6557600080fd5b505af1925050508015610c95575060408051601f3d908101601f19168201909252610c92918101906110b7565b60015b610cef573d808015610cc3576040519150601f19603f3d011682016040523d82523d6000602084013e610cc8565b606091505b508051610ce75760405162461bcd60e51b81526004016102f39061124a565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506105f9565b506001949350505050565b606081610d3957506040805180820190915260018152600360fc1b6020820152610235565b8160005b8115610d635780610d4d8161177e565b9150610d5c9050600a836116ec565b9150610d3d565b60008167ffffffffffffffff811115610d8c57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610db6576020820181803683370190505b5090505b84156105f957610dcb600183611700565b9150610dd8600a86611799565b610de39060306116d4565b60f81b818381518110610e0657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350610e28600a866116ec565b9450610dba565b3b151590565b828054610e4190611743565b90600052602060002090601f016020900481019282610e635760008555610ea9565b82601f10610e7c57805160ff1916838001178555610ea9565b82800160010185558215610ea9579182015b82811115610ea9578251825591602001919060010190610e8e565b50610eb5929150610eb9565b5090565b5b80821115610eb55760008155600101610eba565b80356001600160a01b038116811461023557600080fd5b600060208284031215610ef6578081fd5b610acf82610ece565b60008060408385031215610f11578081fd5b610f1a83610ece565b9150610f2860208401610ece565b90509250929050565b600080600060608486031215610f45578081fd5b610f4e84610ece565b9250610f5c60208501610ece565b9150604084013590509250925092565b60008060008060808587031215610f81578081fd5b610f8a85610ece565b93506020610f99818701610ece565b935060408601359250606086013567ffffffffffffffff80821115610fbc578384fd5b818801915088601f830112610fcf578384fd5b813581811115610fe157610fe16117d9565b604051601f8201601f1916810185018381118282101715611004576110046117d9565b60405281815283820185018b101561101a578586fd5b81858501868301379081019093019390935250939692955090935050565b6000806040838503121561104a578182fd5b61105383610ece565b915060208301358015158114611067578182fd5b809150509250929050565b60008060408385031215611084578182fd5b61108d83610ece565b946020939093013593505050565b6000602082840312156110ac578081fd5b8135610acf816117ef565b6000602082840312156110c8578081fd5b8151610acf816117ef565b600080602083850312156110e5578182fd5b823567ffffffffffffffff808211156110fc578384fd5b818501915085601f83011261110f578384fd5b81358181111561111d578485fd5b86602082850101111561112e578485fd5b60209290920196919550909350505050565b600060208284031215611151578081fd5b5035919050565b60008151808452611170816020860160208601611717565b601f01601f19169290920160200192915050565b60008351611196818460208801611717565b8351908301906111aa818360208801611717565b01949350505050565b6001600160a01b0391909116815260200190565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906111fa90830184611158565b9695505050505050565b901515815260200190565b600060208252610acf6020830184611158565b6020808252600e908201526d105b1c9958591e481b5a5b9d195960921b604082015260600190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252601c908201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604082015260600190565b60208082526024908201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646040820152637265737360e01b606082015260800190565b60208082526019908201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b604082015260600190565b6020808252602c908201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860408201526b34b9ba32b73a103a37b5b2b760a11b606082015260800190565b60208082526038908201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776040820152771b995c881b9bdc88185c1c1c9bdd995908199bdc88185b1b60421b606082015260800190565b6020808252602a908201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604082015269726f206164647265737360b01b606082015260800190565b60208082526029908201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460408201526832b73a103a37b5b2b760b91b606082015260800190565b6020808252602e908201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60408201526d32bc34b9ba32b73a103a37b5b2b760911b606082015260800190565b6020808252818101527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604082015260600190565b60208082526031908201527f45524337323155524953746f726167653a2055524920717565727920666f72206040820152703737b732bc34b9ba32b73a103a37b5b2b760791b606082015260800190565b6020808252602c908201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860408201526b34b9ba32b73a103a37b5b2b760a11b606082015260800190565b60208082526029908201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960408201526839903737ba1037bbb760b91b606082015260800190565b6020808252602f908201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60408201526e3732bc34b9ba32b73a103a37b5b2b760891b606082015260800190565b60208082526021908201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656040820152603960f91b606082015260800190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b90815260200190565b600082198211156116e7576116e76117ad565b500190565b6000826116fb576116fb6117c3565b500490565b600082821015611712576117126117ad565b500390565b60005b8381101561173257818101518382015260200161171a565b838111156104da5750506000910152565b60028104600182168061175757607f821691505b6020821081141561177857634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611792576117926117ad565b5060010190565b6000826117a8576117a86117c3565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b03198116811461180557600080fd5b5056fea2646970667358221220120dee21e29183f6a8221cf6441bea27e4df0a08a4ab4d67d49c75fde6d5e6fc64736f6c63430008000033";

export class Referendum__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Referendum> {
    return super.deploy(overrides || {}) as Promise<Referendum>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Referendum {
    return super.attach(address) as Referendum;
  }
  connect(signer: Signer): Referendum__factory {
    return super.connect(signer) as Referendum__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReferendumInterface {
    return new utils.Interface(_abi) as ReferendumInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Referendum {
    return new Contract(address, _abi, signerOrProvider) as Referendum;
  }
}
