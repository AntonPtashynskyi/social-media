import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Sidenav = () => {
    const session = useSession();
    const user = session.data?.user
  return (
    <nav className='sticky top-0 px-2 py-4'>
        <ul className='flex flex-col items-start gap-2 whitespace-nowrap'>
            <li><Link href="/">home</Link></li>
            {user && <li><Link href={`/profile/${user?.id}`}>Profile</Link></li>}
            {!user ?  <li><button onClick={() => void signIn()}>Sign-in</button></li> : <li><button onClick={() => void signOut()}>Log-out</button></li>}
        </ul>
    </nav>
  )
}

export default Sidenav