import { cn } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { ImageField, SelectField, asText, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PortfolioDocument, ServiceDocument } from '../../prismicio-types'
import Pagination from './Pagination'
import { PrismicRichText } from './typography/PrismicRichText'
import { badgeVariants } from './ui/badge'
import { buttonVariants } from './ui/button'
type ContentListProps = {
  contentType: SelectField
  page: number | undefined
  display: number | undefined
  ctaText?: string
  fallbackItemImage: ImageField
}

const ContentList = async ({
  contentType,
  ctaText = 'Read More',
  display = 5,
  fallbackItemImage,
  page = 1,
}: ContentListProps): Promise<JSX.Element> => {
  const client = createClient()
  let prismicData
  if (contentType === 'service') {
    prismicData = await client.getByType('service', {
      orderings: {
        field: 'my.service.title',
        direction: 'asc',
      },
      page: page,
      pageSize: display,
    })
  } else {
    prismicData = await client.getByType('portfolio', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      page: page,
      pageSize: display,
    })
  }
  const { results } = prismicData

  return (
    <>
      <ul>
        {results.length > 0 &&
          results.map(item => {
            return (
              <li key={item.id}>
                <Link
                  href={item.url || '#'}
                  className="flex flex-col justify-between border-t border-t-secondary py-10 md:items-start"
                  aria-label={asText(item.data.title) || 'View the content'}
                >
                  <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
                    <div className="flex flex-col gap-y-3">
                      <PrismicRichText field={item.data.title} />
                      <div className="flex gap-3">
                        {item.tags.length > 0 &&
                          item.tags.map(tag => (
                            <span
                              key={item.id + tag}
                              className={cn(
                                'block',
                                badgeVariants({ variant: 'secondary' }),
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'my-6 md:my-0',
                        buttonVariants({ variant: 'outline' }),
                      )}
                    >
                      {ctaText}{' '}
                      <span className="sr-only">
                        : Read {asText(item.data.title)}
                      </span>
                      <ArrowRight />
                    </span>
                  </div>
                  <div className="flex w-full flex-col items-center justify-between lg:flex-row">
                    {isFilled.richText(item.data.excerpt) ? (
                      <div className="prose my-4 shrink-0 lg:prose-lg">
                        <PrismicRichText field={item.data.excerpt} />
                      </div>
                    ) : null}
                    <PrismicNextImage
                      field={
                        item.data.featured_image.url
                          ? item.data.featured_image
                          : fallbackItemImage
                      }
                      imgixParams={{ ar: '1:1', fit: 'crop' }}
                      quality={75}
                      width={300}
                      className="hidden rounded-lg shadow lg:inline"
                    />
                  </div>
                </Link>
              </li>
            )
          })}
      </ul>
      {prismicData.total_pages > 1 && (
        <Pagination
          hasNextPage={prismicData?.next_page !== null}
          hasPrevPage={prismicData?.prev_page !== null}
          totalPages={prismicData?.total_pages}
        />
      )}
    </>
  )
}

export default ContentList
