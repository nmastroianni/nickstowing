import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `FooterList`.
 */
export type FooterListProps = SliceComponentProps<Content.FooterListSlice>

/**
 * Component for "FooterList" Slices.
 */
const FooterList = ({ slice }: FooterListProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.items.length > 0 && (
        <ul className="flex flex-col items-center gap-y-3">
          {slice.items.map((item, index) => {
            return (
              <li key={slice.id + `-${index}`}>
                {isFilled.link(item.link) ? (
                  <PrismicNextLink
                    field={item.link}
                    className={cn(
                      buttonVariants({ variant: 'link' }),
                      'text-primary-foreground',
                    )}
                  >
                    {item.label || 'Missing Label Field'}
                  </PrismicNextLink>
                ) : (
                  <span
                    className={cn(
                      buttonVariants({ variant: 'link' }),
                      'text-primary-foreground hover:no-underline',
                    )}
                  >
                    {item.label || 'Missing Label Field'}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default FooterList
