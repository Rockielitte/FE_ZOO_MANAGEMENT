import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function BreadcrumbDemo() {
  const location = useLocation()
  const pathname = location.pathname
  const segments = useMemo(() => {
    return pathname.split('/').filter((segment) => segment !== '')
  }, [pathname])
  let accumlative = ''

  return (
    <Breadcrumb>
      {segments.map((item, index) => {
        accumlative = accumlative + `/${item}`
        return index != segments.length - 1 ? (
          <BreadcrumbItem className='capitalize' key={index}>
            <BreadcrumbLink href={accumlative}>{item}</BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem isCurrentPage className='capitalize' key={index}>
            <BreadcrumbLink href={accumlative}>{item}</BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
