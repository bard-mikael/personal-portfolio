import {
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from './Icons'
import { site } from '../data/site'

const socialIcons = {
  GitHub: GitHubIcon,
  Facebook: FacebookIcon,
  LinkedIn: LinkedInIcon,
  WhatsApp: WhatsAppIcon,
} as const

type SocialLinksProps = {
  className?: string
  onNavigate?: () => void
}

export function SocialLinks({ className, onNavigate }: SocialLinksProps) {
  return (
    <ul className={className}>
      {site.social.map((item) => {
        const Icon = socialIcons[item.label]

        return (
          <li key={item.label}>
            <a
              href={item.href}
              className="inline-flex text-ink no-underline transition-colors hover:text-accent"
              aria-label={item.label}
              aria-disabled="true"
              onClick={(event) => {
                event.preventDefault()
                onNavigate?.()
              }}
            >
              <Icon className="size-5" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
