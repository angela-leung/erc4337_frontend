import { SmartWallet } from '@thirdweb-dev/wallets'
import { useRouter } from 'next/navigation'
import { Signer } from 'ethers'
import React, { useState } from 'react'
import Spinner from './Spinner'
import { connectToSmartWallet } from '@/lib/wallets'
import useAccount from '@/hooks/useAccount'

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [signer, setSigner] = useState<Signer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()
  const { setWallet, setName, setAddress } = useAccount()

  const toggleView = () => {
    setUsername('')
    setPassword('')
    setIsLogin(!isLogin)
  }

  const handeleSubmit = async () => {
    if (!username || !password) {
      setError('Username and password are required')
      return
    }

    try {
      setIsLoading(true)
      const wallet = await connectToSmartWallet(
        { username, password },
        isLogin,
        (status) => setLoadingStatus(status)
      )

      const address = await wallet.getAddress()
      setWallet(wallet)
      setName(username)
      setAddress(address)
      // setWallet(wallet as any);

      // const balance = await wallet.getBalance();
      // console.log({ balance: });
      // const s = await wallet.getSigner()

      if (isLogin) {
        router.push('/dashboard')
      } else {
        toggleView()
      }
      // setSigner(s)
    } catch (e) {
      setIsLoading(false)
      console.error(e)
      setError((e as any).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex min-h-full w-[400px] flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          className='mx-auto h-10 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt=''
        />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          {isLogin ? 'Login to your account' : 'Become a member'}
        </h2>
      </div>

      {isLoading ? (
        <div className='h-60 space-y-4 flex flex-col items-center justify-center'>
          <Spinner />
          <p className='text-slate-500 text-center'>{loadingStatus}</p>
        </div>
      ) : (
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' action='#' method='POST'>
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Username
              </label>
              <div className='mt-2'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <p className='text-red-500 text-center'>{error}</p>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={handeleSubmit}
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            {isLogin ? 'Not a member?' : 'Already a member?'}
            <span
              className='ml-4 cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
              onClick={toggleView}
            >
              {isLogin ? 'Register now' : 'Login now'}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default LoginRegisterForm
