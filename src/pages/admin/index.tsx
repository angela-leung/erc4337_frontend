'use client'

import { getFormattedDate } from '@/helper'
import {
  SUBSCRIPTION_ABI,
  subscriptionAddress,
  thirdWebSDK,
} from '@/lib/constants'
import { ethers } from 'ethers'
import {
  ConnectEmbed,
  ConnectWallet,
  SmartContract,
  lightTheme,
  useBalanceForAddress,
  useConnect,
  useConnectionStatus,
  useContract,
  useContractRead,
  useContractWrite,
  useShowConnectEmbed,
  useWallet,
} from '@thirdweb-dev/react'
import { useEffect, useState } from 'react'
import useToast from '@/hooks/useToast'
import Spinner from '@/components/Spinner'

const customTheme = lightTheme({
  colors: {
    modalBg: 'white',
  },
})

export default function AdminHome() {
  const { setMessage } = useToast()
  const wallet = useWallet()
  const connectionStatus = useConnectionStatus()
  const [balance, setBalance] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { contract: subscriptionContract } = useContract(
    subscriptionAddress,
    SUBSCRIPTION_ABI
  )
  const { data: subData } = useContractRead(
    subscriptionContract,
    'getAllSubscribers'
  )

  const { mutateAsync, error: mutateError } = useContractWrite(
    subscriptionContract,
    'receivePayment'
  )

  const [subscribers, setSubscribers] = useState<
    {
      userAddress: string
      isActive: boolean
      paymentDue: string
    }[]
  >([])

  // const [subscriptionContract, setSubscriptionContract] =
  //   useState<SmartContract>()

  // console.log({ balance })

  async function fetchSubscriptionContract() {
    setIsLoading(true)
    try {
      const balance = await thirdWebSDK.getBalance(subscriptionAddress)
      setBalance(balance.displayValue + ' ' + balance.symbol)

      if (subData) {
        const [addressList, isActiveList, paymentDueList] = subData

        const _subscribers = addressList.map((a: string, idx: number) => {
          return {
            userAddress: a,
            isActive: isActiveList[idx],
            paymentDue: getFormattedDate(Number(paymentDueList[idx])),
          }
        })

        setSubscribers(_subscribers)
      }
    } catch (err) {
      console.error(err)
      setMessage((err as any).message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  async function onCollect(address: string) {
    if (!subscriptionContract) return

    try {
      await mutateAsync({ args: [address] })
    } catch (err) {
      const match = (err as any).message.match(/Reason: (.*)/)

      if (match) {
        const reason = match[1]
        console.log(reason) // Outputs "Too early for payment"
        setMessage(reason + ' for user <br/>' + `<span style="display: block; text-overflow: ellipsis; overflow: hidden; width: 10rem">${address}</span>`)
        return
      }

      setMessage('An error occurred')
    }

    // console.log({ contract })
    // const signer = wallet?.getSigner()
    // console.log()

    // const tx = await subscriptionContract.prepare('receivePayment', [address])
    // const encoded = await tx.encode() // Encode the transaction
    // const gasCost = await tx.estimateGasCost() // Estimate the gas cost
    // const simulatedTx = await tx.simulate() // Simulate the transaction
    // const signedTx = await tx.sign() // Sign the transaction for later use

    // const sentTx = await tx.send()
    // console.log('Submitted transaction:', sentTx.hash)
    // const result = await subscriptionContract.call('receivePayment', [address], {
    //   ``
    // })
    // console.log(result)
  }

  useEffect(() => {
    if (connectionStatus === 'connected') {
      fetchSubscriptionContract()
    }
  }, [subData])

  return (
    <div className='w-[700px] text-center mb-10'>
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      <div className='my-2'>
        <ConnectWallet theme={customTheme} />
      </div>

      {connectionStatus === 'connected' &&
        (isLoading ? (
          <div className='h-[500px] w-full shadow-lg rounded-lg my-8 p-4 flex justify-center items-center'>
            <Spinner />
          </div>
        ) : (
          <div className='h-[500px] w-full shadow-lg rounded-lg my-8 p-4'>
            <div className='text-xl text-slate-400 my-2'>
              {' '}
              Current Contract balance:{' '}
              <span className='text-slate-800 font-bold'>{balance}</span>
            </div>

            <div className='px-10 my-4'>
              <hr />
            </div>
            <h4 className='text-xl text-slate-400 my-2'>List of Subscribers</h4>

            <div className='relative overflow-x-auto'>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      User
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Status
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Payment Due
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Collect
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr
                      key={subscriber.userAddress}
                      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                    >
                      <td className='px-6 py-4 '>
                        <div className='overflow-hidden overflow-ellipsis w-40'>
                          {subscriber.userAddress}
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        {subscriber.isActive ? 'Active' : 'Inactive'}
                      </td>
                      <td className='px-6 py-4'>{subscriber.paymentDue}</td>
                      <td className='px-6 py-4'>
                        <button
                          className='bg-blue-500 text-white rounded-lg px-3 py-1'
                          onClick={() => onCollect(subscriber.userAddress)}
                        >
                          Collect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </div>
  )
}
