import Header from './header'
import Sidebar from './sidebar'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto grid h-full grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)]">
      <Sidebar />
      <Header />

      <div className="h-full overflow-y-auto px-4 pb-3">{children}</div>
    </main>
  )
}

export default Layout
