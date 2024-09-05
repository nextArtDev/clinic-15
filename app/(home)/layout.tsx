import Navbar from '@/components/home/nav/Navbar'
import { currentUser } from '@/lib/auth'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  return (
    <div className="min-h-screen">
      <Navbar user={user} />

      {children}
    </div>
  )
}
