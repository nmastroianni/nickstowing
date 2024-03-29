import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { cn } from '@/lib/utils'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import { Suspense } from 'react'

/**
 * Props for `ImageWithText`.
 */
export type ImageWithTextProps = SliceComponentProps<Content.ImageWithTextSlice>

/**
 * Component for "ImageWithText" Slices.
 */
const ImageWithText = ({ slice }: ImageWithTextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-screen-xl py-6 lg:pb-24 lg:pt-12"
    >
      <div className={cn('grid p-4 lg:grid-cols-5 lg:p-8')}>
        <div
          className={cn(
            'rounded-lg bg-primary-foreground/80 p-4 shadow-md backdrop-blur  lg:p-8',
            {
              'order-1 -mb-4 lg:col-span-2 lg:-mr-4':
                slice.variation === 'default',
              'order-1 -mb-4 lg:col-span-3 lg:-mr-4':
                slice.variation === 'squareImage',
              'order-2 -mt-4 lg:col-span-2 lg:-ml-4':
                slice.variation === 'leftImage',
            },
          )}
        >
          <PrismicRichText field={slice.primary.text} />
        </div>
        <div
          className={cn('flex items-center lg:col-span-3', {
            'order-1 lg:col-span-3 lg:-mr-8': slice.variation === 'leftImage',
            'order-2 lg:col-span-3 lg:-ml-4': slice.variation === 'default',
            'order-1 lg:col-span-2 lg:-mr-8': slice.variation === 'squareImage',
          })}
        >
          <PrismicNextImage
            field={slice.primary.image}
            className="rounded-md shadow"
            imgixParams={{
              ar: slice.variation === 'squareImage' ? '1:1' : '16:9',
              fit: 'crop',
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default ImageWithText
