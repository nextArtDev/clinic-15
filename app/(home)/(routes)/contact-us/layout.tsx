import Navbar from '@/components/home/nav/Navbar'

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="grainy min-h-screen">{children}</div>
}
