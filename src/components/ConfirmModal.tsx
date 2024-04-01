import React from 'react'

type Props = {
  toggleConfirmModal: () => void
  onPay: () => void
}

const ConfirmModal: React.FC<Props> = ({ toggleConfirmModal, onPay }) => {
  return (
    <div className='absolute bottom-0 top-0 left-0 right-0 flex justify-center items-center'>
      <div className='absolute h-full w-full bg-slate-800 backdrop-blur-sm opacity-60'></div>
      {/* <div
            id='popup-modal'
            // tabindex='-1'
            className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
          > */}
      <div className='relative p-4 w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <button
            type='button'
            onClick={toggleConfirmModal}
            className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
            data-modal-hide='popup-modal'
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-4 md:p-5 text-center'>
            <svg
              className='mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Subscribe to our Free NFT Mint Service for just 0.01 MATIC for the
              first month. The same amount will be automatically charged monthly
              until you cancel the subscription.
            </h3>
            <div className='flex gap-2 justify-center'>
              <button
                data-modal-hide='popup-modal'
                type='button'
                className='w-full py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-slate-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                onClick={toggleConfirmModal}
              >
                Cancel
              </button>
              <button
                data-modal-hide='popup-modal'
                type='button'
                // className='w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
                className='w-full py-2.5 px-5 ms-3 text-sm font-medium  focus:outline-none bg-blue-500 hover:bg-blue-700 text-white rounded-lg border border-blue-200 transition-all'
                onClick={onPay}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default ConfirmModal