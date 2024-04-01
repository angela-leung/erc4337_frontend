export default function Custom404() {
  return (
    <div className='h-[500px] text-center'>
      <h1 className='text-slate-300 text-[200px]'>404</h1>
      <p className='text-slate-300 text-[50px] mb-10'>Page Not Found</p>
      <a
        href='/'
        className='px-4 py-2 bg-slate-400 text-white mt-20 hover:bg-slate-500 rounded-full cursor-pointer'
      >
        Back to Home page
      </a>
    </div>
  )
}
