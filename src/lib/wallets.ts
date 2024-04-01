import { LocalWallet, SmartWallet } from '@thirdweb-dev/wallets'
import {
  ACCOUNT_ABI,
  THIRDWEB_API_KEY,
  chain,
  factoryAddress,
  subscriptionAddress,
} from './constants'
import {
  ThirdwebSDK,
  Transaction,
  isContractDeployed,
  toWei,
} from '@thirdweb-dev/react'

export function createSmartWallet(): SmartWallet {
  const smartWallet = new SmartWallet({
    chain: chain,
    factoryAddress: factoryAddress,
    gasless: true,
    clientId: THIRDWEB_API_KEY || '',
  })
  return smartWallet
}

export async function getWalletAddressForUser(
  sdk: ThirdwebSDK,
  username: string
): Promise<string> {
  const factory = await sdk.getContract(factoryAddress)

  const smartWalletAddress: string = await factory.call('accountOfUsername', [
    username,
  ])
  return smartWalletAddress
}

export async function connectToSmartWallet(
  { username, password }: { username: string; password: string },
  isLogin: boolean,
  statusCallback?: (status: string) => void
): Promise<SmartWallet> {
  statusCallback?.('Loading ...')

  const sdk = new ThirdwebSDK(chain, {
    clientId: THIRDWEB_API_KEY || '',
  })

  const smartWalletAddress = await getWalletAddressForUser(sdk, username)

  const isDeployed = await isContractDeployed(
    smartWalletAddress,
    sdk.getProvider()
  )

  const smartWallet = createSmartWallet()
  const personalWallet = new LocalWallet()

  if (isLogin) {
    // CASE 1 - existing wallet - fetch metadata, decrypt, load local wallet, connect
    if (isDeployed) {
      statusCallback?.('User data found, \nnow accessing onchain data...')

      // download encrypted wallet from IPFS
      const contract = await sdk.getContract(smartWalletAddress)
      const metadata = await contract.metadata.get()
      console.log({ metadata })

      console.log('Fetching wallet for', metadata.name)

      const encryptedWallet = metadata.encryptedWallet
      if (!encryptedWallet) {
        throw new Error('No encrypted wallet found')
      }

      statusCallback?.('Decrypting personal wallet...')
      // wait before importing as it blocks the main thread rendering
      await new Promise((resolve) => setTimeout(resolve, 300))

      await personalWallet.import({
        encryptedJson: encryptedWallet,
        password,
      })

      statusCallback?.('Connecting...')
      await smartWallet.connect({
        personalWallet,
      })


      return smartWallet
    } else {
      throw new Error('User not found, please register first')
    }
  } else {
    // register
    if (!isDeployed) {
      // CASE 1 - fresh start - create local wallet, encrypt, connect, call register on account with username + metadata
      console.log('Registering new user ...')

      statusCallback?.('Generating personal wallet...')
      // generate local wallet
      await personalWallet.generate()
      // encrypt it
      const encryptedWallet = await personalWallet.export({
        strategy: 'encryptedJson',
        password,
      })

      await smartWallet.connect({
        personalWallet,
      })

      // register account
      // upload encrypted wallet to IPFS
      statusCallback?.('Uploading encrypted wallet to IPFS...')
      const encryptedWalletUri = await sdk.storage.upload({
        name: username,
        encryptedWallet,
      })

      statusCallback?.(`Deploying & registering username onchain...`)
      // this will deploy the smart wallet and register the username
      await smartWallet.execute(
        (await Transaction.fromContractInfo({
          contractAddress: await smartWallet.getAddress(),
          contractAbi: ACCOUNT_ABI,
          provider: sdk.getProvider(),
          signer: await personalWallet.getSigner(),
          method: 'register',
          args: [username, encryptedWalletUri],
          storage: sdk.storage,
        })) as any
      )

      statusCallback?.(
        `Account registered successfully, redirecting to Login page.`
      )

      return smartWallet
    } else {
      throw new Error('This username is already exist, please use another name')
    }
  }
}
