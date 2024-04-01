'use client'

import ConfirmModal from '@/components/ConfirmModal'
import Spinner from '@/components/Spinner'
import { getFormattedDate } from '@/helper'
import useAccount from '@/hooks/useAccount'
import useToast from '@/hooks/useToast'
import {
  ACCOUNT_ABI,
  SUBSCRIPTION_ABI,
  subscriptionAddress,
  thirdWebSDK,
} from '@/lib/constants'
import {
  Transaction,
  toWei,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react'
import { Signer } from 'ethers'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

enum EnumView {
  SubscribeView,
  MintView,
}

export default function Dashboard() {
  const { setMessage } = useToast()

  const router = useRouter()
  const { wallet, name, address } = useAccount()
  const [user, setUser] = useState<{
    username: string
    balance: string
    address: string
    signer: Signer
  }>({
    username: 'Angela',
    balance: '0.01 MATIC',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    signer: {} as Signer,
  })

  const [showConfirm, setShowConfirm] = useState(false)
  const [isInit, setIsInit] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState('fsdf')
  const [subscribedInfo, setSubscribedInfo] = useState<{
    isActive: boolean
    since: string
    nextPaymentDue: string
  }>()
  const [error, setError] = useState('')

  const copyToClipboard = async (text?: string) => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setMessage('Copied to clipboard')
    setTimeout(() => setMessage(''), 1000)
  }

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm)
  }

  async function fetchWalletData() {
    if (wallet) {
      const balance = await wallet.getBalance()
      const signer = await wallet.getSigner()

      const subscriptionContract = await thirdWebSDK.getContract(
        subscriptionAddress
      )
      const sInfo = await subscriptionContract.call('subscribers', [address])

      setUser({
        balance: balance.displayValue + ' ' + balance.symbol,
        address,
        signer,
        username: name,
      })

      if (sInfo.isActive) {
        setSubscribedInfo({
          isActive: sInfo.isActive,
          since: getFormattedDate(Number(sInfo.start)),
          nextPaymentDue: getFormattedDate(Number(sInfo.nextPaymentDue)),
        })

        console.log({
          isActive: sInfo.isActive,
          since: getFormattedDate(Number(sInfo.start)),
          nextPaymentDue: getFormattedDate(Number(sInfo.nextPaymentDue)),
        })
      }

      setIsInit(false)
    } else {
      router.push('/')
    }
  }

  const goBack = () => {
    setIsLoading(false)
    setError('')
    setLoadingStatus('')
  }

  async function onPay() {
    setIsLoading(true)
    toggleConfirm()

    try {
      setLoadingStatus('Subscribing ...')

      if (!wallet) {
        throw new Error('Wallet not found')
      }

      await wallet.execute(
        (
          await Transaction.fromContractInfo({
            contractAddress: user.address,
            contractAbi: ACCOUNT_ABI,
            provider: thirdWebSDK.getProvider(),
            signer: user.signer,
            method: 'registerSubscription',
            args: [subscriptionAddress],
            storage: thirdWebSDK.storage,
          })
        ).setValue(toWei('0.01')) as any
      )
      setIsLoading(false)
      setLoadingStatus('')
      fetchWalletData()
      setMessage('Subscribed successfully')
      setTimeout(() => setMessage(''), 5000)
    } catch (err) {
      switch ((err as any)!.code) {
        case 'INSUFFICIENT_FUNDS':
          setError(
            'Insufficient funds on your account, please top up your account'
          )
          break
        default:
          setError('An error occurred, please try again')
      }
      console.log({ err })
    }
  }

  useEffect(() => {
      fetchWalletData()
  }, [])

  if (isInit) {
    return (
      <div className='w-[600px] space-y-4 mb-10 h-[500px]'>
        <Spinner />
        <p className='text-slate-500 text-center'>Loading</p>
      </div>
    )
  }

  return (
    <div className='w-[600px] space-y-4 mb-10'>
      {/* top */}
      <div className='flex justify-between'>
        <div className='flex flex-col justify-center-center gap-1'>
          <p className='text-left text-2xl text-slate-800 font-semibold capitalize'>
            Hello, {user?.username}{' '}
          </p>
          <span
            onClick={() => copyToClipboard(user?.address)}
            className='cursor-pointer px-2 py-1 text-sm bg-slate-100 max-w-60 rounded-full text-ellipsis overflow-hidden hover:bg-slate-200 '
          >
            {user?.address}
          </span>
        </div>
        <div
          className='p-2 rounded-lg cursor-pointer  hover:bg-slate-50 transition-all select-none'
          onClick={fetchWalletData}
        >
          <div className='flex flex-col justify-center items-center text-slate-500'>
            <span className='uppercase text-sm'>Balance</span>
            <span className='font-bold'>{user?.balance}</span>
          </div>
        </div>
      </div>

      {/* card */}
      {isLoading ? (
        <div className='h-60 flex justify-center items-center'>
          {!error ? (
            <div className='space-y-4 flex flex-col items-center justify-center'>
              <Spinner />
              <p className='text-slate-500 text-center'>{loadingStatus}</p>
            </div>
          ) : (
            <div className='text-red-500 flex flex-col gap-4 justify-center items-center'>
              <p>{error}</p>
              <button
                data-modal-hide='popup-modal'
                type='button'
                className='w-[100px] py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-slate-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                onClick={goBack}
              >
                Go back
              </button>
            </div>
          )}
        </div>
      ) : subscribedInfo ? (
        <div className='block w-full p-6 bg-white rounded-lg mb-10 h-[350px]'>
          <div className='text-slate-500 flex justify-between'>
            <p>
              Status{' '}
              <span className='text-slate-800'>
                {subscribedInfo.isActive ? 'Active' : 'InActive'}
              </span>
            </p>{' '}
            <p>
              Joined at{' '}
              <span className='text-slate-800'>{subscribedInfo.since}</span>
            </p>
            <p>
              Next payment due at{' '}
              <span className='text-slate-800'>
                {subscribedInfo.nextPaymentDue}
              </span>
            </p>
          </div>
          <div></div>
        </div>
      ) : (
        <div className='block w-full p-6 bg-white rounded-lg mb-10'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-slate-700 dark:text-white text-center'>
            Subscribe it to enjoy <br />
            <span className='text-blue-500'>30 free NFTs every month</span>
          </h5>
          <div className='font-normal w-full h-full flex justify-center items-center  my-4'>
            <div
              className='h-[200px] w-[200px] p-5 border rounded-lg text-center text-slate-500 flex flex-col justify-center hover:shadow-lg transition cursor-pointer'
              onClick={toggleConfirm}
            >
              <p className='text-7xl'>30</p>
              <p className='uppercase font-bold'>Free NFTs</p>
              <p className='uppercase text-sm'>0.01 MATIC / month</p>
            </div>
          </div>
        </div>
      )}

      {/* confirm modal */}
      {showConfirm && (
        <ConfirmModal toggleConfirmModal={toggleConfirm} onPay={onPay} />
      )}

      <div className='text-center'>
        <button
          onClick={() => router.push('/')}
          className='px-2 py-1 text-slate-500 hover:bg-slate-200 rounded-lg border'
        >
          Logout
        </button>
      </div>
    </div>
  )
}
