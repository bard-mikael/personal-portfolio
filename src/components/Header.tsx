import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { CloseIcon, MenuIcon } from './Icons'
import { SocialLinks } from './SocialLinks'

const menuId = 'site-menu'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <a
          href="/"
          className="font-display text-xl tracking-tight text-ink no-underline transition-colors hover:text-accent"
        >
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[13px] tracking-[0.12em]">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-ink no-underline transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className="hidden items-center justify-self-end gap-4 lg:flex" />

        <button
          type="button"
          className="inline-flex bg-transparent p-1 text-ink transition-colors hover:text-accent lg:hidden"
          aria-controls={menuId}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <CloseIcon className="size-6" />
          ) : (
            <MenuIcon className="size-6" />
          )}
        </button>
      </div>

      <div
        id={menuId}
        hidden={!menuOpen}
        className="border-t border-line px-5 py-5 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-4 text-base">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-ink no-underline transition-colors hover:text-accent"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks
          className="mt-6 flex items-center gap-5 border-t border-line pt-5"
          onNavigate={closeMenu}
        />
      </div>
    </header>
  )
}
