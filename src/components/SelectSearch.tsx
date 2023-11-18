'use client'

import * as React from 'react'
import { SearchIcon } from 'lucide-react'
import { useUserStore } from '@/stores'
import { useQuery } from 'react-query'
import axios, { AxiosResponse } from 'axios'
import { request } from '@/utils/apiCaller'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DebouncedInput } from './GridShow'
import { Skeleton } from './ui/skeleton'
import _ from 'lodash'
import { Species } from '@/types'
type SelectMap<T extends FieldValues> = {
  query: string
  item: Path<T>
  form: UseFormReturn<T>
  disabled?: boolean
  value?: string
  indexKey?: number
  itemObject?: {
    id: number
    amount: number
    foodId: number
  }
}
export function SelectSearch<T extends FieldValues>({
  query,
  item,
  form,
  disabled = false,
  value,
  itemObject
}: SelectMap<T>) {
  const [search, setSearch] = React.useState('')
  const token = useUserStore((state) => state.user)?.token
  const select_data = useQuery<
    AxiosResponse<{ id: string; name: string; code: string; animalSpecies?: Species; email?: string; unit?: string }[]>,
    unknown,
    { id: string; name: string; code: string; animalSpecies?: Species; email?: string; unit?: string }[]
  >({
    staleTime: 5000,
    queryKey: ['select', query],
    queryFn: () => {
      return request<
        { id: string; name: string; code: string; animalSpecies?: Species; email?: string; unit?: string }[]
      >(`/${query}${query.indexOf('?') >= 0 ? '' : '/'}`, 'GET', {
        Authorization: `Bearer ${token} `
      })
    },
    onSuccess: () => {},
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message)
      }
    },
    select: (data) => {
      return data.data
    }
  })
  const [selectMap, setSelectMap] = React.useState(() => {
    const result: { value: string; label: string; speciesId?: string; unit?: string }[] = []
    return !select_data.data
      ? []
      : select_data.data.reduce((prev, curr) => {
          const bool = (curr.code + curr.name + curr.id).toLowerCase().includes(search.toLowerCase())
          return !bool
            ? prev
            : [
                ...prev,
                {
                  value: `${String(curr.id)}`,
                  label: `${curr.name || curr.code || curr.email} ${curr.unit || ''}`,
                  speciesId: `${curr.animalSpecies?.id}`
                }
              ]
        }, result)
  })
  React.useEffect(() => {
    const result: { value: string; label: string; speciesId?: string }[] = []
    const data = select_data.data
      ? select_data.data.reduce((prev, curr) => {
          const bool = (curr.code + curr.name + curr.id).toLowerCase().includes(search.toLowerCase())
          return !bool
            ? prev
            : [
                ...prev,
                {
                  value: `${String(curr.id)}`,
                  label: `${curr.name || curr.code || curr.email} ${curr.unit ? `(${curr.unit})` : ''} `,
                  speciesId: `${curr.animalSpecies?.id}`
                }
              ]
        }, result)
      : []
    setSelectMap(data)
  }, [select_data.data, search])
  return (
    <div className='w-full overflow-auto h-full '>
      {select_data.isLoading ? (
        <Skeleton className='w-full h-full' />
      ) : form.watch(item) ? (
        <Select
          disabled={disabled}
          defaultValue={value || String(form.watch(item))}
          value={value || String(form.watch(item))}
          onValueChange={(value) => {
            switch (item) {
              case 'details': {
                const newDetails = form.getValues(item)
                const index = _.findIndex(newDetails, { id: itemObject?.id })
                if (index >= 0) {
                  newDetails[index] = { ...itemObject, foodId: Number(value) }
                  form.setValue(item, newDetails, {
                    shouldDirty: true,
                    shouldValidate: true
                  })
                }
                break
              }
              default:
                form.setValue(item, value as PathValue<T, Path<T>>, { shouldValidate: true, shouldDirty: true })
            }
          }}
        >
          <SelectTrigger className='w-full' id={String(item)}>
            <SelectValue placeholder={`Select ${query.split('/?')[0]} . . .`} />
          </SelectTrigger>
          <SelectContent className='max-h-[210px] w-full  font-normal  overflow-auto'>
            <div className='w-full h-full flex  flex-col overflow-auto gap-2 shadow-xl relative'>
              <div className='shadow-lg w-full flex gap-2 items-center p-2 border rounded-lg sticky top-0 bg-primary z-30 '>
                <SearchIcon className='text-white' />
                <DebouncedInput
                  value={search}
                  onChange={(value) => setSearch(String(value))}
                  className='flex-1 '
                  placeholder={`Search ${query.split('/?')[0]} . . .`}
                />
              </div>
              <div className='flex-1 flex flex-col w-full overflow-auto h-full pt-2 border shadow-2xl rounded-md p-2'>
                {/* {item == 'managedById' && _.findIndex(selectMap, { value: form.getValues(item) }) < 0 && (
                  <SelectItem key={form.getValues(item)} value={form.getValues(item) as string} className=''>
                    {form.getValues('managerName' as Path<T>)}
                  </SelectItem>
                )} */}
                {selectMap.length ? (
                  <>
                    {selectMap.map((item) => (
                      <SelectItem key={item.value} value={item.value} className=''>
                        {item.label}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>No {query} found</div>
                )}
              </div>
            </div>
          </SelectContent>
        </Select>
      ) : (
        <Select
          disabled={disabled}
          onValueChange={(value) => {
            switch (item) {
              case 'details': {
                const newDetails = form.getValues(item)
                const index = _.findIndex(newDetails, { id: itemObject?.id })
                if (index >= 0) {
                  newDetails[index] = { ...itemObject, foodId: Number(value) }
                  form.setValue(item, newDetails, {
                    shouldDirty: true,
                    shouldValidate: true
                  })
                }
                break
              }
              default:
                form.setValue(item, value as PathValue<T, Path<T>>, { shouldValidate: true, shouldDirty: true })
            }
          }}
        >
          <SelectTrigger className='w-full h-full' id={item}>
            <SelectValue placeholder={`Select ${query.split('/?')[0]} . . .`} />
          </SelectTrigger>
          <SelectContent className='max-h-[210px] w-full  font-normal overflow-auto '>
            <div className='w-full h-full flex  flex-col overflow-auto gap-2 shadow-xl relative'>
              <div className='shadow-lg w-full flex gap-2 items-center p-2 border rounded-lg sticky top-0 bg-primary z-30 '>
                <SearchIcon className='text-white' />
                <DebouncedInput
                  value={search}
                  onChange={(value) => setSearch(String(value))}
                  className='flex-1 '
                  placeholder={`Search  ${query.split('/?')[0]} . . .`}
                />
              </div>
              <div className='flex-1 flex flex-col w-full overflow-auto h-full pt-2 border shadow-2xl rounded-md p-2'>
                {/* {item == 'managedById' && _.findIndex(selectMap, { value: form.getValues(item) }) < 0 && (
                  <SelectItem key={form.getValues(item)} value={form.getValues(item) as string} className=''>
                    {item == 'managedById' ? form.getValues('managerName' as Path<T>) : 'Assigned'}
                  </SelectItem>
                )} */}
                {selectMap.length ? (
                  <>
                    {selectMap.map((item) => (
                      <SelectItem key={item.value} value={item.value} className=''>
                        {item.label}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>No {query} found</div>
                )}
              </div>
            </div>
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
