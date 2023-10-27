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
}
export function SelectSearch<T extends FieldValues>({ query, item, form }: SelectMap<T>) {
  const [search, setSearch] = React.useState('')
  const token = useUserStore((state) => state.user)
  const select_data = useQuery<
    AxiosResponse<{ id: string; name: string; code: string; animalSpecies?: Species }[]>,
    unknown,
    { id: string; name: string; code: string; animalSpecies?: Species }[]
  >({
    staleTime: 5000,
    queryKey: ['select', query],
    queryFn: () => {
      return request<{ id: string; name: string; code: string; animalSpecies?: Species }[]>(`/${query}/`, 'GET', {
        Authorization: `Bearer ${token} `
      })
    },
    onSuccess: (data) => {
      console.log(data)
    },
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
    const result: { value: string; label: string; speciesId?: string }[] = []
    return !select_data.data
      ? []
      : select_data.data.reduce((prev, curr) => {
          const bool = (curr.code + curr.name + curr.id).includes(search)
          return !bool
            ? prev
            : [
                ...prev,
                {
                  value: `${String(curr.id)}`,
                  label: `${curr.name || curr.code} `,
                  speciesId: `${curr.animalSpecies?.id}`
                }
              ]
        }, result)
  })
  React.useEffect(() => {
    const result: { value: string; label: string; speciesId?: string }[] = []
    const data = select_data.data
      ? select_data.data.reduce((prev, curr) => {
          const bool = (curr.code + curr.name + curr.id).includes(search)
          return !bool
            ? prev
            : [
                ...prev,
                {
                  value: `${String(curr.id)}`,
                  label: `${curr.name || curr.code} `,
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
          defaultValue={String(form.watch(item))}
          value={String(form.watch(item))}
          onValueChange={(value) => {
            if (String(item) == 'cageId') {
              const map = _.find(selectMap, { value: String(value) })
              if (map) {
                form.setValue('speciesId' as Path<T>, map.speciesId as PathValue<T, Path<T>>)
              }
            }
            // if (String(item) == 'speciesId') {
            //   const map = _.find(selectMap, { value: String(value) })
            //   if (map) {
            //     form.setValue('speciesId' as Path<T>, map.speciesId as PathValue<T, Path<T>>)
            //   }
            // }
            form.setValue(item, value as PathValue<T, Path<T>>)
          }}
        >
          <SelectTrigger className='w-full' id={item}>
            <SelectValue placeholder={`Select ${query} . . .`} />
          </SelectTrigger>
          <SelectContent className='h-[210px] w-full  font-normal '>
            <div className='w-full h-full flex  flex-col overflow-auto gap-2 shadow-xl'>
              <div className='shadow-lg w-full flex gap-2 items-center p-2 border rounded-lg sticky top-0 bg-primary z-30 '>
                <SearchIcon className='text-white' />
                <DebouncedInput
                  value={search}
                  onChange={(value) => setSearch(String(value))}
                  className='flex-1 '
                  placeholder={`Search ${query} . . .`}
                />
              </div>
              <div className='flex-1 flex flex-col w-full overflow-auto h-full pt-2 border shadow-2xl rounded-md p-2'>
                {selectMap.length ? (
                  <>
                    {selectMap.map((item) => (
                      <SelectItem key={item.value} value={item.value} className='capitalize'>
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
          onValueChange={(value) => {
            if (String(item) == 'cageId') {
              const map = _.find(selectMap, { value: String(value) })
              if (map) {
                form.setValue('speciesId' as Path<T>, map.speciesId as PathValue<T, Path<T>>)
              }
            }
            form.setValue(item, value as PathValue<T, Path<T>>)
          }}
        >
          <SelectTrigger className='w-full h-full' id={item}>
            <SelectValue placeholder={`Select ${query} . . .`} />
          </SelectTrigger>
          <SelectContent className='h-[210px] w-full  font-normal '>
            <div className='w-full h-full flex  flex-col overflow-auto gap-2 shadow-xl'>
              <div className='shadow-lg w-full flex gap-2 items-center p-2 border rounded-lg sticky top-0 bg-primary z-30 '>
                <SearchIcon className='text-white' />
                <DebouncedInput
                  value={search}
                  onChange={(value) => setSearch(String(value))}
                  className='flex-1 '
                  placeholder={`Search ${query} . . .`}
                />
              </div>
              <div className='flex-1 flex flex-col w-full overflow-auto h-full pt-2 border shadow-2xl rounded-md p-2'>
                {selectMap.length ? (
                  <>
                    {selectMap.map((item) => (
                      <SelectItem key={item.value} value={item.value} className='capitalize'>
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
