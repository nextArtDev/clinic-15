'use server'

import { signOut } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const logout = async () => {
  // some server stuff
  try {
    await signOut()
    revalidatePath('/')
    redirect('/')
  } catch (error) {
    console.log(error)
  }
}
