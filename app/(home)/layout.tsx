import Navbar from '@/components/home/nav/Navbar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Navbar />

      {children}
    </div>
  )
}
