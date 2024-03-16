'use client'
import { cn } from '@/lib/utils'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  LayoutDocumentData,
  SettingsDocumentData,
} from '../../../../prismicio-types'
import Section from '../Section'
import CallNow from './CallNow'
import PhoneTitle from './PhoneTitle'
import Menu from './Menu'
import MobileMenu from './MobileMenu'

type NavbarProps = {
  data: LayoutDocumentData
  settings: SettingsDocumentData
}

const Navbar = ({ data, settings }: NavbarProps): JSX.Element => {
  const container = useRef(null)
  const [hidden, setHidden] = useState(false)
  const [transparent, setTransparent] = useState(true)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', latest => {
    const previous: number = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else if (latest === 0) {
      setHidden(false)
      setTransparent(true)
    } else {
      setHidden(false)
      setTransparent(false)
    }
  })
  return (
    <motion.header
      ref={container}
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={cn(
        'fixed top-0 w-full bg-primary transition duration-300 ease-in-out',
        {
          'bg-transparent': transparent,
        },
      )}
    >
      <Section width="xl">
        <div className="flex justify-between">
          <PhoneTitle
            phone={settings.phone}
            call_link={data.call_link}
            site_title={settings.site_title}
          />
          {data.slices.length > 0 && (
            <>
              <Menu data={data} className="hidden lg:block" />
              <MobileMenu
                data={data}
                className="lg:hidden"
                site_title={settings.site_title}
                phone={settings.phone}
              />
            </>
          )}
          <CallNow
            label={data.call_label}
            link={data.call_link}
            className="hidden lg:flex"
          />
        </div>
      </Section>
    </motion.header>
  )
}

export default Navbar