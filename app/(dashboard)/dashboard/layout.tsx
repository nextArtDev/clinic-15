import Navbar from '@/components/dashboard/Navbar'
import { currentUser } from '@/lib/auth'
import { notFound } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user || user.role !== 'ADMIN') return notFound()
  return (
    <section className="bg-background  min-h-screen">
      <Navbar />

      {children}
    </section>
  )
}
