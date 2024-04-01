import { PolygonAmoyTestnet } from '@thirdweb-dev/chains'
import { ThirdwebSDK } from '@thirdweb-dev/react'

export const THIRDWEB_API_KEY = process.env.NEXT_PUBLIC_CLIENT_ID || ''

export const chain = PolygonAmoyTestnet

export const thirdWebSDK = new ThirdwebSDK(chain, {
  clientId: THIRDWEB_API_KEY || '',
})

export const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS || ''
export const subscriptionAddress =
  process.env.NEXT_PUBLIC_SUBSCRIPTION_ADDRESS || ''

export const ACCOUNT_ABI = [
  {
    type: 'constructor',
    name: '',
    inputs: [
      {
        type: 'address',
        name: '_entrypoint',
        internalType: 'contract IEntryPoint',
      },
      {
        type: 'address',
        name: '_factory',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'AdminUpdated',
    inputs: [
      {
        type: 'address',
        name: 'signer',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'bool',
        name: 'isAdmin',
        indexed: false,
        internalType: 'bool',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ContractURIUpdated',
    inputs: [
      {
        type: 'string',
        name: 'prevURI',
        indexed: false,
        internalType: 'string',
      },
      {
        type: 'string',
        name: 'newURI',
        indexed: false,
        internalType: 'string',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        type: 'uint8',
        name: 'version',
        indexed: false,
        internalType: 'uint8',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SignerPermissionsUpdated',
    inputs: [
      {
        type: 'address',
        name: 'authorizingSigner',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'targetSigner',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'tuple',
        name: 'permissions',
        components: [
          {
            type: 'address',
            name: 'signer',
            internalType: 'address',
          },
          {
            type: 'address[]',
            name: 'approvedTargets',
            internalType: 'address[]',
          },
          {
            type: 'uint256',
            name: 'nativeTokenLimitPerTransaction',
            internalType: 'uint256',
          },
          {
            type: 'uint128',
            name: 'permissionStartTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'permissionEndTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'reqValidityStartTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'reqValidityEndTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'bytes32',
            name: 'uid',
            internalType: 'bytes32',
          },
        ],
        indexed: false,
        internalType: 'struct IAccountPermissions.SignerPermissionRequest',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SubscriptionPaid',
    inputs: [
      {
        type: 'address',
        name: 'subscriber',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'address',
        name: 'service',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'amount',
        indexed: false,
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: 'nextPaymentDate',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'function',
    name: 'addDeposit',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'contractURI',
    inputs: [],
    outputs: [
      {
        type: 'string',
        name: '',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'entryPoint',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'contract IEntryPoint',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'execute',
    inputs: [
      {
        type: 'address',
        name: '_target',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '_value',
        internalType: 'uint256',
      },
      {
        type: 'bytes',
        name: '_calldata',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'executeBatch',
    inputs: [
      {
        type: 'address[]',
        name: '_target',
        internalType: 'address[]',
      },
      {
        type: 'uint256[]',
        name: '_value',
        internalType: 'uint256[]',
      },
      {
        type: 'bytes[]',
        name: '_calldata',
        internalType: 'bytes[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'factory',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAllActiveSigners',
    inputs: [],
    outputs: [
      {
        type: 'tuple[]',
        name: 'signers',
        components: [
          {
            type: 'address',
            name: 'signer',
            internalType: 'address',
          },
          {
            type: 'address[]',
            name: 'approvedTargets',
            internalType: 'address[]',
          },
          {
            type: 'uint256',
            name: 'nativeTokenLimitPerTransaction',
            internalType: 'uint256',
          },
          {
            type: 'uint128',
            name: 'startTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'endTimestamp',
            internalType: 'uint128',
          },
        ],
        internalType: 'struct IAccountPermissions.SignerPermissions[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAllAdmins',
    inputs: [],
    outputs: [
      {
        type: 'address[]',
        name: '',
        internalType: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAllSigners',
    inputs: [],
    outputs: [
      {
        type: 'tuple[]',
        name: 'signers',
        components: [
          {
            type: 'address',
            name: 'signer',
            internalType: 'address',
          },
          {
            type: 'address[]',
            name: 'approvedTargets',
            internalType: 'address[]',
          },
          {
            type: 'uint256',
            name: 'nativeTokenLimitPerTransaction',
            internalType: 'uint256',
          },
          {
            type: 'uint128',
            name: 'startTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'endTimestamp',
            internalType: 'uint128',
          },
        ],
        internalType: 'struct IAccountPermissions.SignerPermissions[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getDeposit',
    inputs: [],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getNonce',
    inputs: [],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPermissionsForSigner',
    inputs: [
      {
        type: 'address',
        name: 'signer',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'tuple',
        name: '',
        components: [
          {
            type: 'address',
            name: 'signer',
            internalType: 'address',
          },
          {
            type: 'address[]',
            name: 'approvedTargets',
            internalType: 'address[]',
          },
          {
            type: 'uint256',
            name: 'nativeTokenLimitPerTransaction',
            internalType: 'uint256',
          },
          {
            type: 'uint128',
            name: 'startTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'endTimestamp',
            internalType: 'uint128',
          },
        ],
        internalType: 'struct IAccountPermissions.SignerPermissions',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        type: 'address',
        name: '_defaultAdmin',
        internalType: 'address',
      },
      {
        type: 'bytes',
        name: '',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isActiveSigner',
    inputs: [
      {
        type: 'address',
        name: 'signer',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isAdmin',
    inputs: [
      {
        type: 'address',
        name: '_account',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isValidSignature',
    inputs: [
      {
        type: 'bytes32',
        name: '_hash',
        internalType: 'bytes32',
      },
      {
        type: 'bytes',
        name: '_signature',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        type: 'bytes4',
        name: 'magicValue',
        internalType: 'bytes4',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isValidSigner',
    inputs: [
      {
        type: 'address',
        name: '_signer',
        internalType: 'address',
      },
      {
        type: 'tuple',
        name: '_userOp',
        components: [
          {
            type: 'address',
            name: 'sender',
            internalType: 'address',
          },
          {
            type: 'uint256',
            name: 'nonce',
            internalType: 'uint256',
          },
          {
            type: 'bytes',
            name: 'initCode',
            internalType: 'bytes',
          },
          {
            type: 'bytes',
            name: 'callData',
            internalType: 'bytes',
          },
          {
            type: 'uint256',
            name: 'callGasLimit',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'verificationGasLimit',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'preVerificationGas',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'maxFeePerGas',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
          },
          {
            type: 'bytes',
            name: 'paymasterAndData',
            internalType: 'bytes',
          },
          {
            type: 'bytes',
            name: 'signature',
            internalType: 'bytes',
          },
        ],
        internalType: 'struct UserOperation',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'multicall',
    inputs: [
      {
        type: 'bytes[]',
        name: 'data',
        internalType: 'bytes[]',
      },
    ],
    outputs: [
      {
        type: 'bytes[]',
        name: 'results',
        internalType: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'onERC1155BatchReceived',
    inputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'uint256[]',
        name: '',
        internalType: 'uint256[]',
      },
      {
        type: 'uint256[]',
        name: '',
        internalType: 'uint256[]',
      },
      {
        type: 'bytes',
        name: '',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        type: 'bytes4',
        name: '',
        internalType: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'onERC1155Received',
    inputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
      {
        type: 'bytes',
        name: '',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        type: 'bytes4',
        name: '',
        internalType: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'onERC721Received',
    inputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
      {
        type: 'bytes',
        name: '',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        type: 'bytes4',
        name: '',
        internalType: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'paySubscription',
    inputs: [
      {
        type: 'address',
        name: '_subscriptionService',
        internalType: 'contract SubscriptionService',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'register',
    inputs: [
      {
        type: 'string',
        name: 'username',
        internalType: 'string',
      },
      {
        type: 'string',
        name: 'metadataURI',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'registerSubscription',
    inputs: [
      {
        type: 'address',
        name: '_subscriptionService',
        internalType: 'contract SubscriptionService',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'setAdmin',
    inputs: [
      {
        type: 'address',
        name: '_account',
        internalType: 'address',
      },
      {
        type: 'bool',
        name: '_isAdmin',
        internalType: 'bool',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setContractURI',
    inputs: [
      {
        type: 'string',
        name: '_uri',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPermissionsForSigner',
    inputs: [
      {
        type: 'tuple',
        name: '_req',
        components: [
          {
            type: 'address',
            name: 'signer',
            internalType: 'address',
          },
          {
            type: 'address[]',
            name: 'approvedTargets',
            internalType: 'address[]',
          },
          {
            type: 'uint256',
            name: 'nativeTokenLimitPerTransaction',
            internalType: 'uint256',
          },
          {
            type: 'uint128',
            name: 'permissionStartTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'permissionEndTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'reqValidityStartTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'reqValidityEndTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'bytes32',
            name: 'uid',
            internalType: 'bytes32',
          },
        ],
        internalType: 'struct IAccountPermissions.SignerPermissionRequest',
      },
      {
        type: 'bytes',
        name: '_signature',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'subscriptions',
    inputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: 'isActive',
        internalType: 'bool',
      },
      {
        type: 'uint256',
        name: 'nextPaymentDate',
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: 'registerDate',
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: 'fee',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        type: 'bytes4',
        name: 'interfaceId',
        internalType: 'bytes4',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: '',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'unsubscribe',
    inputs: [
      {
        type: 'address',
        name: '_subscriptionService',
        internalType: 'contract SubscriptionService',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'validateUserOp',
    inputs: [
      {
        type: 'tuple',
        name: 'userOp',
        components: [
          {
            type: 'address',
            name: 'sender',
            internalType: 'address',
          },
          {
            type: 'uint256',
            name: 'nonce',
            internalType: 'uint256',
          },
          {
            type: 'bytes',
            name: 'initCode',
            internalType: 'bytes',
          },
          {
            type: 'bytes',
            name: 'callData',
            internalType: 'bytes',
          },
          {
            type: 'uint256',
            name: 'callGasLimit',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'verificationGasLimit',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'preVerificationGas',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'maxFeePerGas',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
          },
          {
            type: 'bytes',
            name: 'paymasterAndData',
            internalType: 'bytes',
          },
          {
            type: 'bytes',
            name: 'signature',
            internalType: 'bytes',
          },
        ],
        internalType: 'struct UserOperation',
      },
      {
        type: 'bytes32',
        name: 'userOpHash',
        internalType: 'bytes32',
      },
      {
        type: 'uint256',
        name: 'missingAccountFunds',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: 'validationData',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'verifySignerPermissionRequest',
    inputs: [
      {
        type: 'tuple',
        name: 'req',
        components: [
          {
            type: 'address',
            name: 'signer',
            internalType: 'address',
          },
          {
            type: 'address[]',
            name: 'approvedTargets',
            internalType: 'address[]',
          },
          {
            type: 'uint256',
            name: 'nativeTokenLimitPerTransaction',
            internalType: 'uint256',
          },
          {
            type: 'uint128',
            name: 'permissionStartTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'permissionEndTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'reqValidityStartTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'uint128',
            name: 'reqValidityEndTimestamp',
            internalType: 'uint128',
          },
          {
            type: 'bytes32',
            name: 'uid',
            internalType: 'bytes32',
          },
        ],
        internalType: 'struct IAccountPermissions.SignerPermissionRequest',
      },
      {
        type: 'bytes',
        name: 'signature',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: 'success',
        internalType: 'bool',
      },
      {
        type: 'address',
        name: 'signer',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'withdrawDepositTo',
    inputs: [
      {
        type: 'address',
        name: 'withdrawAddress',
        internalType: 'address payable',
      },
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'receive',
    name: '',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
]

export const SUBSCRIPTION_ABI = [
  {
    type: 'constructor',
    name: '',
    inputs: [
      {
        type: 'uint256',
        name: '_subscriptionFee',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'PaymentReceived',
    inputs: [
      {
        type: 'address',
        name: 'subscriber',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: 'amount',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Subscribed',
    inputs: [
      {
        type: 'address',
        name: 'subscriber',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Unsubscribed',
    inputs: [
      {
        type: 'address',
        name: 'subscriber',
        indexed: true,
        internalType: 'address',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'fallback',
    name: '',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'getAllSubscribers',
    inputs: [],
    outputs: [
      {
        type: 'address[]',
        name: '',
        internalType: 'address[]',
      },
      {
        type: 'bool[]',
        name: '',
        internalType: 'bool[]',
      },
      {
        type: 'uint256[]',
        name: '',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPaymentHistory',
    inputs: [
      {
        type: 'address',
        name: '_subscriber',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'tuple[]',
        name: '',
        components: [
          {
            type: 'uint256',
            name: 'amount',
            internalType: 'uint256',
          },
          {
            type: 'uint256',
            name: 'timestamp',
            internalType: 'uint256',
          },
        ],
        internalType: 'struct SubscriptionService.Payment[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'paymentHistory',
    inputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: 'timestamp',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'receivePayment',
    inputs: [
      {
        type: 'address',
        name: '_subscriber',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'subscribe',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'subscriberAddresses',
    inputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'subscribers',
    inputs: [
      {
        type: 'address',
        name: '',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        type: 'bool',
        name: 'isActive',
        internalType: 'bool',
      },
      {
        type: 'uint256',
        name: 'start',
        internalType: 'uint256',
      },
      {
        type: 'uint256',
        name: 'nextPaymentDue',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'subscriptionFee',
    inputs: [],
    outputs: [
      {
        type: 'uint256',
        name: '',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'unsubscribe',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'receive',
    name: '',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
]
