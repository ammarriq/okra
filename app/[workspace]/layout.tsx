const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-[auto_minmax(0,1fr)] min-h-screen'>
      <aside className='p-2 w-60 bg-background'>
        <button
          className='flex items-center gap-2 p-1
          text-sm rounded-lg border bg-white w-full'
        >
          <div
            className='grid place-items-center size-8
            text-xs text-white rounded bg-primary'
          >
            M
          </div>
          <p className='font-medium'>Ammar&apos;s Workspace</p>

          <div className='grid ml-auto'>
            {/* <i className='size-3 icon-[solar--alt-arrow-down-linear]' /> */}
          </div>
        </button>
      </aside>
      <main>{children}</main>
    </div>
  )
}

export default Layout
