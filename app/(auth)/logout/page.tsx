import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

type Props = {}

async function page({}: Props) {
  const session = await auth()
  return (
    <section className="flex justify-center items-center w-full h-full">
      <article className="flex flex-col text-primary-foreground font-semibold bg-white/30 gap-4 justify-center items-center w-60 h-auto py-8 border custom-box-shadow rounded-md text-center shadow-2xl p-2">
        <span>{session?.user.name}</span>
        <h1>می‌خواهید از حساب کاربری خود خارج شوید؟</h1>
        <form
          action={async () => {
            'use server'
            await signOut()
            redirect('/')
          }}
        >
          <Button type="submit">تایید</Button>
        </form>
      </article>
    </section>
  )
}

export default page
