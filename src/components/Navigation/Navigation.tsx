import type { FormEvent } from '../../lib'

import { Link, useNavigate } from '@solidjs/router'
import { signOut } from 'firebase/auth'
import { Show } from 'solid-js'
import toast from 'solid-toast'

import defaultAvatar from '../../assets/default-avatar.webp'
import { Login } from '../../icons/Login'
import { Logo } from '../../icons/Logo'
import { Logout } from '../../icons/Logout'
import { Search } from '../../icons/Search'
import { getFirebase, store } from '../../lib'
import './Navigation.css'

type FormElements = HTMLFormControlsCollection & {
  search: HTMLInputElement
}

export function Navigation() {
  const { auth } = getFirebase()
  const navigate = useNavigate()

  async function onLogout() {
    await signOut(auth)
    toast.success('Successfully logged out.')
    navigate('/')
  }

  function onSearchSubmit(event: FormEvent<FormElements>) {
    event.preventDefault()

    const search = event.currentTarget.elements.search.value
    navigate(`/results?query=${search}`)
  }

  return (
    <nav class="navigation">
      <Link href="/" aria-label="Tube" class="navigation__logo-link">
        <Logo />
        Tube
      </Link>

      <form class="navigation__form" onSubmit={onSearchSubmit}>
        <label for="search" class="sr-only">
          Search videos
        </label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          required
          class="navigation__form-input"
        />
        <button
          type="submit"
          aria-label="Search"
          class="navigation__form-button"
        >
          <Search />
        </button>
      </form>

      <Show
        when={store.user}
        fallback={
          <Link href="/login" aria-label="Login" class="navigation__login-link">
            <Login />
          </Link>
        }
      >
        <div class="navigation__actions">
          <Link href="/videos/new" class="navigation__actions-upload">
            Upload
          </Link>

          <Link href={`/profiles/${store.user.id}`}>
            <img
              alt="Profile"
              class="navigation__actions-avatar"
              src={
                store.user.imageUrl === '' ? defaultAvatar : store.user.imageUrl
              }
            />
          </Link>

          <button
            class="navigation__actions-logout"
            aria-label="Logout"
            onClick={onLogout}
          >
            <Logout />
          </button>
        </div>
      </Show>
    </nav>
  )
}
