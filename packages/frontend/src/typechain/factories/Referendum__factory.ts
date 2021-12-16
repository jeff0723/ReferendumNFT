/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Referendum, ReferendumInterface } from "../Referendum";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startTime_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime_",
        type: "uint256",
      },
    ],
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
    inputs: [],
    name: "democracyToken",
    outputs: [
      {
        internalType: "contract IDemocracyToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endTime",
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
    inputs: [],
    name: "feePayer",
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
        name: "tokenURI_",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI_",
        type: "string",
      },
    ],
    name: "mintDemocracySpiritNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI_",
        type: "string",
      },
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
    ],
    name: "mintTo",
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
    inputs: [],
    name: "startTime",
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
    inputs: [],
    name: "totalSupply",
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
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002e9738038062002e978339810160408190526200003491620001dc565b604080518082018252600a8152695265666572656e64756d60b01b6020808301918252835180850190945260048452631493919560e21b908401528151919291620000829160009162000128565b5080516200009890600190602084019062000128565b5050506009829055600a819055604051620000b390620001b7565b604051809103906000f080158015620000d0573d6000803e3d6000fd5b50600b80546001600160a01b0319166001600160a01b0392909216919091179055620000fb62000124565b600780546001600160a01b0319166001600160a01b0392909216919091179055506200023d9050565b3390565b828054620001369062000200565b90600052602060002090601f0160209004810192826200015a5760008555620001a5565b82601f106200017557805160ff1916838001178555620001a5565b82800160010185558215620001a5579182015b82811115620001a557825182559160200191906001019062000188565b50620001b3929150620001c5565b5090565b610d38806200215f83390190565b5b80821115620001b35760008155600101620001c6565b60008060408385031215620001ef578182fd5b505080516020909101519092909150565b6002810460018216806200021557607f821691505b602082108114156200023757634e487b7160e01b600052602260045260246000fd5b50919050565b611f12806200024d6000396000f3fe60806040526004361061010e5760003560e01c806370f92ec61161009b57806370f92ec6146102f75780637148ccfd1461030c57806378e979251461032c57806395d89b4114610341578063a22cb46514610356578063b88d4fde14610376578063c87b56dd14610396578063d85d3d27146103b6578063dd87acce146103d6578063e985e9c5146103eb578063fe42a2d91461040b57610194565b806301ffc9a71461019957806306fdde03146101cf578063081812fc146101f1578063095ea7b31461021e57806318160ddd1461024057806323b872dd146102625780633197cbb61461028257806342842e0e146102975780636352211e146102b757806370a08231146102d757610194565b3661019457600754610129906001600160a01b03163461042b565b600b546001600160a01b03166340c10f196101426104d5565b346040518363ffffffff1660e01b8152600401610160929190611791565b600060405180830381600087803b15801561017a57600080fd5b505af115801561018e573d6000803e3d6000fd5b50505050005b600080fd5b3480156101a557600080fd5b506101b96101b4366004611602565b6104d9565b6040516101c691906117aa565b60405180910390f35b3480156101db57600080fd5b506101e4610521565b6040516101c691906117b5565b3480156101fd57600080fd5b5061021161020c3660046116ca565b6105b3565b6040516101c69190611740565b34801561022a57600080fd5b5061023e6102393660046115d9565b6105f6565b005b34801561024c57600080fd5b50610255610689565b6040516101c69190611d9f565b34801561026e57600080fd5b5061023e61027d366004611499565b61068f565b34801561028e57600080fd5b506102556106c7565b3480156102a357600080fd5b5061023e6102b2366004611499565b6106cd565b3480156102c357600080fd5b506102116102d23660046116ca565b6106e8565b3480156102e357600080fd5b506102556102f236600461144d565b61071d565b34801561030357600080fd5b50610211610761565b34801561031857600080fd5b5061023e61032736600461163a565b610770565b34801561033857600080fd5b50610255610858565b34801561034d57600080fd5b506101e461085e565b34801561036257600080fd5b5061023e61037136600461159f565b61086d565b34801561038257600080fd5b5061023e6103913660046114d4565b61087f565b3480156103a257600080fd5b506101e46103b13660046116ca565b6108be565b3480156103c257600080fd5b5061023e6103d136600461163a565b6109df565b3480156103e257600080fd5b50610211610a5a565b3480156103f757600080fd5b506101b9610406366004611467565b610a69565b34801561041757600080fd5b5061023e610426366004611679565b610a97565b804710156104545760405162461bcd60e51b815260040161044b9061194a565b60405180910390fd5b6000826001600160a01b03168260405161046d9061173d565b60006040518083038185875af1925050503d80600081146104aa576040519150601f19603f3d011682016040523d82523d6000602084013e6104af565b606091505b50509050806104d05760405162461bcd60e51b815260040161044b906118f0565b505050565b3390565b60006001600160e01b031982166380ac58cd60e01b148061050a57506001600160e01b03198216635b5e139f60e01b145b80610519575061051982610bf3565b90505b919050565b60606000805461053090611e17565b80601f016020809104026020016040519081016040528092919081815260200182805461055c90611e17565b80156105a95780601f1061057e576101008083540402835291602001916105a9565b820191906000526020600020905b81548152906001019060200180831161058c57829003601f168201915b5050505050905090565b60006105be82610c0c565b6105da5760405162461bcd60e51b815260040161044b90611b8c565b506000908152600460205260409020546001600160a01b031690565b6000610601826106e8565b9050806001600160a01b0316836001600160a01b031614156106355760405162461bcd60e51b815260040161044b90611c98565b806001600160a01b03166106476104d5565b6001600160a01b031614806106635750610663816104066104d5565b61067f5760405162461bcd60e51b815260040161044b906119cd565b6104d08383610c29565b60085481565b6106a061069a6104d5565b82610c97565b6106bc5760405162461bcd60e51b815260040161044b90611cd9565b6104d0838383610d14565b600a5481565b6104d08383836040518060200160405280600081525061087f565b6000818152600260205260408120546001600160a01b0316806105195760405162461bcd60e51b815260040161044b90611a6f565b60006001600160a01b0382166107455760405162461bcd60e51b815260040161044b90611a25565b506001600160a01b031660009081526003602052604090205490565b6007546001600160a01b031681565b6107786104d5565b6007546001600160a01b039081169116146107a55760405162461bcd60e51b815260040161044b90611bd8565b600a544210156107c75760405162461bcd60e51b815260040161044b90611d6f565b600b54600160a01b900460ff16156107f15760405162461bcd60e51b815260040161044b906117c8565b600b805460ff60a01b1916600160a01b179055600854610812903090610e41565b61085460085483838080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f2092505050565b5050565b60095481565b60606001805461053090611e17565b6108546108786104d5565b8383610f64565b61089061088a6104d5565b83610c97565b6108ac5760405162461bcd60e51b815260040161044b90611cd9565b6108b884848484611007565b50505050565b60606108c982610c0c565b6108e55760405162461bcd60e51b815260040161044b90611b3b565b600082815260066020526040812080546108fe90611e17565b80601f016020809104026020016040519081016040528092919081815260200182805461092a90611e17565b80156109775780601f1061094c57610100808354040283529160200191610977565b820191906000526020600020905b81548152906001019060200180831161095a57829003601f168201915b50505050509050600061098861103a565b905080516000141561099c5750905061051c565b8151156109ce5780826040516020016109b692919061170e565b6040516020818303038152906040529250505061051c565b6109d78461104c565b949350505050565b6109ec82826104266104d5565b600b546001600160a01b03166340c10f19610a056104d5565b60016040518363ffffffff1660e01b8152600401610a24929190611791565b600060405180830381600087803b158015610a3e57600080fd5b505af1158015610a52573d6000803e3d6000fd5b505050505050565b600b546001600160a01b031681565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6009544210158015610aab5750600a544211155b610ac75760405162461bcd60e51b815260040161044b90611d2a565b6001600160a01b0381166000908152600c602052604090205460ff1615610b005760405162461bcd60e51b815260040161044b906117c8565b6001600160a01b0381166000908152600c60205260409020805460ff19166001179055600854610b319082906110cf565b610b7360085484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610f2092505050565b600b546040516340c10f1960e01b81526001600160a01b03909116906340c10f1990610ba6908490600190600401611791565b600060405180830381600087803b158015610bc057600080fd5b505af1158015610bd4573d6000803e3d6000fd5b505060088054925090506000610be983611e52565b9190505550505050565b6001600160e01b031981166301ffc9a760e01b14919050565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610c5e826106e8565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610ca282610c0c565b610cbe5760405162461bcd60e51b815260040161044b90611981565b6000610cc9836106e8565b9050806001600160a01b0316846001600160a01b03161480610d045750836001600160a01b0316610cf9846105b3565b6001600160a01b0316145b806109d757506109d78185610a69565b826001600160a01b0316610d27826106e8565b6001600160a01b031614610d4d5760405162461bcd60e51b815260040161044b90611c00565b6001600160a01b038216610d735760405162461bcd60e51b815260040161044b90611879565b610d7e8383836104d0565b610d89600082610c29565b6001600160a01b0383166000908152600360205260408120805460019290610db2908490611dd4565b90915550506001600160a01b0382166000908152600360205260408120805460019290610de0908490611da8565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216610e675760405162461bcd60e51b815260040161044b90611b06565b610e7081610c0c565b15610e8d5760405162461bcd60e51b815260040161044b90611842565b610e99600083836104d0565b6001600160a01b0382166000908152600360205260408120805460019290610ec2908490611da8565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b610f2982610c0c565b610f455760405162461bcd60e51b815260040161044b90611ab8565b600082815260066020908152604090912082516104d092840190611357565b816001600160a01b0316836001600160a01b03161415610f965760405162461bcd60e51b815260040161044b906118bd565b6001600160a01b0383811660008181526005602090815260408083209487168084529490915290819020805460ff1916851515179055517f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3190610ffa9085906117aa565b60405180910390a3505050565b611012848484610d14565b61101e848484846110e9565b6108b85760405162461bcd60e51b815260040161044b906117f0565b60408051602081019091526000815290565b606061105782610c0c565b6110735760405162461bcd60e51b815260040161044b90611c49565b600061107d61103a565b9050600081511161109d57604051806020016040528060008152506110c8565b806110a784611204565b6040516020016110b892919061170e565b6040516020818303038152906040525b9392505050565b61085482826040518060200160405280600081525061131e565b60006110fd846001600160a01b0316611351565b156111f957836001600160a01b031663150b7a026111196104d5565b8786866040518563ffffffff1660e01b815260040161113b9493929190611754565b602060405180830381600087803b15801561115557600080fd5b505af1925050508015611185575060408051601f3d908101601f191682019092526111829181019061161e565b60015b6111df573d8080156111b3576040519150601f19603f3d011682016040523d82523d6000602084013e6111b8565b606091505b5080516111d75760405162461bcd60e51b815260040161044b906117f0565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506109d7565b506001949350505050565b60608161122957506040805180820190915260018152600360fc1b602082015261051c565b8160005b8115611253578061123d81611e52565b915061124c9050600a83611dc0565b915061122d565b6000816001600160401b0381111561127b57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156112a5576020820181803683370190505b5090505b84156109d7576112ba600183611dd4565b91506112c7600a86611e6d565b6112d2906030611da8565b60f81b8183815181106112f557634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350611317600a86611dc0565b94506112a9565b6113288383610e41565b61133560008484846110e9565b6104d05760405162461bcd60e51b815260040161044b906117f0565b3b151590565b82805461136390611e17565b90600052602060002090601f01602090048101928261138557600085556113cb565b82601f1061139e57805160ff19168380011785556113cb565b828001600101855582156113cb579182015b828111156113cb5782518255916020019190600101906113b0565b506113d79291506113db565b5090565b5b808211156113d757600081556001016113dc565b80356001600160a01b038116811461051c57600080fd5b60008083601f840112611418578182fd5b5081356001600160401b0381111561142e578182fd5b60208301915083602082850101111561144657600080fd5b9250929050565b60006020828403121561145e578081fd5b6110c8826113f0565b60008060408385031215611479578081fd5b611482836113f0565b9150611490602084016113f0565b90509250929050565b6000806000606084860312156114ad578081fd5b6114b6846113f0565b92506114c4602085016113f0565b9150604084013590509250925092565b600080600080608085870312156114e9578081fd5b6114f2856113f0565b935060206115018187016113f0565b93506040860135925060608601356001600160401b0380821115611523578384fd5b818801915088601f830112611536578384fd5b81358181111561154857611548611ead565b604051601f8201601f191681018501838111828210171561156b5761156b611ead565b60405281815283820185018b1015611581578586fd5b81858501868301379081019093019390935250939692955090935050565b600080604083850312156115b1578182fd5b6115ba836113f0565b9150602083013580151581146115ce578182fd5b809150509250929050565b600080604083850312156115eb578182fd5b6115f4836113f0565b946020939093013593505050565b600060208284031215611613578081fd5b81356110c881611ec3565b60006020828403121561162f578081fd5b81516110c881611ec3565b6000806020838503121561164c578182fd5b82356001600160401b03811115611661578283fd5b61166d85828601611407565b90969095509350505050565b60008060006040848603121561168d578283fd5b83356001600160401b038111156116a2578384fd5b6116ae86828701611407565b90945092506116c19050602085016113f0565b90509250925092565b6000602082840312156116db578081fd5b5035919050565b600081518084526116fa816020860160208601611deb565b601f01601f19169290920160200192915050565b60008351611720818460208801611deb565b835190830190611734818360208801611deb565b01949350505050565b90565b6001600160a01b0391909116815260200190565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611787908301846116e2565b9695505050505050565b6001600160a01b03929092168252602082015260400190565b901515815260200190565b6000602082526110c860208301846116e2565b6020808252600e908201526d105b1c9958591e481b5a5b9d195960921b604082015260600190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252601c908201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604082015260600190565b60208082526024908201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646040820152637265737360e01b606082015260800190565b60208082526019908201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b604082015260600190565b6020808252603a908201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c20726040820152791958da5c1a595b9d081b585e481a185d99481c995d995c9d195960321b606082015260800190565b6020808252601d908201527f416464726573733a20696e73756666696369656e742062616c616e6365000000604082015260600190565b6020808252602c908201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860408201526b34b9ba32b73a103a37b5b2b760a11b606082015260800190565b60208082526038908201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776040820152771b995c881b9bdc88185c1c1c9bdd995908199bdc88185b1b60421b606082015260800190565b6020808252602a908201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604082015269726f206164647265737360b01b606082015260800190565b60208082526029908201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460408201526832b73a103a37b5b2b760b91b606082015260800190565b6020808252602e908201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60408201526d32bc34b9ba32b73a103a37b5b2b760911b606082015260800190565b6020808252818101527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604082015260600190565b60208082526031908201527f45524337323155524953746f726167653a2055524920717565727920666f72206040820152703737b732bc34b9ba32b73a103a37b5b2b760791b606082015260800190565b6020808252602c908201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860408201526b34b9ba32b73a103a37b5b2b760a11b606082015260800190565b6020808252600e908201526d27b7363c903332b2903830bcb2b960911b604082015260600190565b60208082526029908201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960408201526839903737ba1037bbb760b91b606082015260800190565b6020808252602f908201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60408201526e3732bc34b9ba32b73a103a37b5b2b760891b606082015260800190565b60208082526021908201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656040820152603960f91b606082015260800190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b60208082526025908201527f4d696e742074696d65206861736e27742073746172746564206f722068617320604082015264195b99195960da1b606082015260800190565b602080825260169082015275135a5b9d081d1a5b59481a185cdb89dd08195b99195960521b604082015260600190565b90815260200190565b60008219821115611dbb57611dbb611e81565b500190565b600082611dcf57611dcf611e97565b500490565b600082821015611de657611de6611e81565b500390565b60005b83811015611e06578181015183820152602001611dee565b838111156108b85750506000910152565b600281046001821680611e2b57607f821691505b60208210811415611e4c57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611e6657611e66611e81565b5060010190565b600082611e7c57611e7c611e97565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114611ed957600080fd5b5056fea264697066735822122094c151e85e6e6d2165be11cc6f0575af02d4b368088ed8ff908e9458e1eeb18764736f6c6343000800003360806040523480156200001157600080fd5b506040518060400160405280600e81526020016d2232b6b7b1b930b1bcaa37b5b2b760911b81525060405180604001604052806003815260200162444f4d60e81b81525081600390805190602001906200006d929190620000bb565b50805162000083906004906020840190620000bb565b5062000091915050620000b7565b600580546001600160a01b0319166001600160a01b03929092169190911790556200019e565b3390565b828054620000c99062000161565b90600052602060002090601f016020900481019282620000ed576000855562000138565b82601f106200010857805160ff191683800117855562000138565b8280016001018555821562000138579182015b82811115620001385782518255916020019190600101906200011b565b50620001469291506200014a565b5090565b5b808211156200014657600081556001016200014b565b6002810460018216806200017657607f821691505b602082108114156200019857634e487b7160e01b600052602260045260246000fd5b50919050565b610b8a80620001ae6000396000f3fe608060405234801561001057600080fd5b50600436106100af5760003560e01c806306fdde03146100b4578063095ea7b3146100d257806318160ddd146100f257806323b872dd14610107578063313ce5671461011a578063395093511461012f57806340c10f191461014257806356e8771f1461015757806370a082311461016c57806395d89b411461017f578063a457c2d714610187578063a9059cbb1461019a578063dd62ed3e146101ad575b600080fd5b6100bc6101c0565b6040516100c9919061083c565b60405180910390f35b6100e56100e03660046107f4565b610252565b6040516100c99190610831565b6100fa61026f565b6040516100c99190610ade565b6100e56101153660046107b9565b610275565b61012261030e565b6040516100c99190610ae7565b6100e561013d3660046107f4565b610313565b6101556101503660046107f4565b610367565b005b61015f6103af565b6040516100c9919061081d565b6100fa61017a366004610766565b6103be565b6100bc6103dd565b6100e56101953660046107f4565b6103ec565b6100e56101a83660046107f4565b610465565b6100fa6101bb366004610787565b610479565b6060600380546101cf90610b19565b80601f01602080910402602001604051908101604052809291908181526020018280546101fb90610b19565b80156102485780601f1061021d57610100808354040283529160200191610248565b820191906000526020600020905b81548152906001019060200180831161022b57829003601f168201915b5050505050905090565b600061026661025f6104a4565b84846104a8565b50600192915050565b60025490565b600061028284848461055c565b6001600160a01b0384166000908152600160205260408120816102a36104a4565b6001600160a01b03166001600160a01b03168152602001908152602001600020549050828110156102ef5760405162461bcd60e51b81526004016102e690610991565b60405180910390fd5b610303856102fb6104a4565b8584036104a8565b506001949350505050565b601290565b60006102666103206104a4565b84846001600061032e6104a4565b6001600160a01b03908116825260208083019390935260409182016000908120918b16815292529020546103629190610af5565b6104a8565b6005546001600160a01b031661037b6104a4565b6001600160a01b0316146103a15760405162461bcd60e51b81526004016102e69061095a565b6103ab8282610686565b5050565b6005546001600160a01b031681565b6001600160a01b0381166000908152602081905260409020545b919050565b6060600480546101cf90610b19565b600080600160006103fb6104a4565b6001600160a01b03908116825260208083019390935260409182016000908120918816815292529020549050828110156104475760405162461bcd60e51b81526004016102e690610a62565b61045b6104526104a4565b858584036104a8565b5060019392505050565b60006102666104726104a4565b848461055c565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b0383166104ce5760405162461bcd60e51b81526004016102e690610a1e565b6001600160a01b0382166104f45760405162461bcd60e51b81526004016102e6906108d2565b6001600160a01b0380841660008181526001602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061054f908590610ade565b60405180910390a3505050565b6001600160a01b0383166105825760405162461bcd60e51b81526004016102e6906109d9565b6001600160a01b0382166105a85760405162461bcd60e51b81526004016102e69061088f565b6105b383838361074a565b6001600160a01b038316600090815260208190526040902054818110156105ec5760405162461bcd60e51b81526004016102e690610914565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610623908490610af5565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161066d9190610ade565b60405180910390a361068084848461074a565b50505050565b6001600160a01b0382166106ac5760405162461bcd60e51b81526004016102e690610aa7565b6106b86000838361074a565b80600260008282546106ca9190610af5565b90915550506001600160a01b038216600090815260208190526040812080548392906106f7908490610af5565b90915550506040516001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061073a908590610ade565b60405180910390a36103ab600083835b505050565b80356001600160a01b03811681146103d857600080fd5b600060208284031215610777578081fd5b6107808261074f565b9392505050565b60008060408385031215610799578081fd5b6107a28361074f565b91506107b06020840161074f565b90509250929050565b6000806000606084860312156107cd578081fd5b6107d68461074f565b92506107e46020850161074f565b9150604084013590509250925092565b60008060408385031215610806578182fd5b61080f8361074f565b946020939093013593505050565b6001600160a01b0391909116815260200190565b901515815260200190565b6000602080835283518082850152825b818110156108685785810183015185820160400152820161084c565b818111156108795783604083870101525b50601f01601f1916929092016040019392505050565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201526265737360e81b606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604082015261737360f01b606082015260800190565b60208082526026908201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604082015265616c616e636560d01b606082015260800190565b6020808252601d908201527f4f6e6c79206d617374657220636f6e74726163742063616e206d696e74000000604082015260600190565b60208082526028908201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616040820152676c6c6f77616e636560c01b606082015260800190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604082015264647265737360d81b606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646040820152637265737360e01b606082015260800190565b60208082526025908201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604082015264207a65726f60d81b606082015260800190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b90815260200190565b60ff91909116815260200190565b60008219821115610b1457634e487b7160e01b81526011600452602481fd5b500190565b600281046001821680610b2d57607f821691505b60208210811415610b4e57634e487b7160e01b600052602260045260246000fd5b5091905056fea2646970667358221220240002b71e1cc3ef8a0f0867e3e0f036cf09073babed77a8d041d8430c119ded64736f6c63430008000033";

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
    startTime_: BigNumberish,
    endTime_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Referendum> {
    return super.deploy(
      startTime_,
      endTime_,
      overrides || {}
    ) as Promise<Referendum>;
  }
  getDeployTransaction(
    startTime_: BigNumberish,
    endTime_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(startTime_, endTime_, overrides || {});
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
