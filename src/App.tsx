import type { User } from './lib'
import type { DocumentReference } from 'firebase/firestore'

import { Route, Routes } from '@solidjs/router'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { onMount } from 'solid-js'
import { Toaster } from 'solid-toast'

import { Navigation } from './components'
import { getFirebase, setStore, UserSchema } from './lib'
import { Home, Login, Register } from './pages'

export function App() {
  const { auth, firestore } = getFirebase()

  onMount(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDoc = doc(
          firestore,
          `/users/${authUser.uid}`
        ) as DocumentReference<User>
        const userSnapshot = await getDoc(userDoc)
        const user = UserSchema.parse(userSnapshot.data())

        setStore({ user })
      } else {
        setStore({ user: null })
      }
    })
  })

  return (
    <>
      <Navigation />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Routes>
    </>
  )
}
