import Navbar from '@/components/dashboard/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-background  min-h-screen">
      <Navbar />

      {children}
    </section>
  )
}
