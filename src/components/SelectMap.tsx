'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useUserStore } from '@/stores'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios, { AxiosResponse } from 'axios'
import { request } from '@/utils/apiCaller'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { ScrollArea } from './ui/scroll-area'

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js'
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
]
type SelectMap<T extends FieldValues> = {
  query: string
  value: PathValue<T, Path<T>>
  setValue: UseFormSetValue<T>
  item: Path<T>
}
export function SelectMap<T extends FieldValues>({ query, value, setValue, item }: SelectMap<T>) {
  const [open, setOpen] = React.useState(false)
  const token = useUserStore((state) => state.user)
  const select_data = useQuery<
    AxiosResponse<{ id: string; name: string; code: string }[]>,
    unknown,
    { id: string; name: string; code: string }[]
  >({
    queryKey: ['select', query],
    queryFn: () => {
      return request<{ id: string; name: string; code: string }[]>(`/${query}/`, 'GET', {
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
  const frameworks: { value: string; label: string }[] = React.useMemo<{ value: string; label: string }[]>(() => {
    return select_data.data
      ? select_data.data.map((item) => ({
          value: `${String(item.id)}|${item.name || item.code} `,
          label: `${item.name || item.code} `
        }))
      : []
  }, [select_data.data])
  return (
    <div className='w-full relative overflow-auto'>
      <Popover open={open} onOpenChange={setOpen}>
        <div className='w-full relative flex flex-col'>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-full justify-between font-normal'
            >
              {value
                ? frameworks.find((framework) => framework?.value.split('|')[0] === String(value))?.label
                : `Select ${query.substring(0, query.length)} . . .`}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <div className='w-full relative'>
            <PopoverContent className='w-[328px] p-0 z-[999]  overflow-auto  h-[150px]  '>
              <Command className='w-full h-full overflow-auto flex flex-col'>
                <CommandInput placeholder={`Search ${query.substring(0, query.length)} . . .`} />
                <CommandEmpty>No {item} found.</CommandEmpty>
                <CommandGroup className='flex flex-col flex-1 overflow-auto'>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={String(framework.value)}
                      onSelect={(currentValue) => {
                        const realValue = currentValue.split('|')[0]
                        setValue(
                          item,
                          realValue === value ? ('' as PathValue<T, Path<T>>) : (realValue as PathValue<T, Path<T>>)
                        )
                        setOpen(false)
                      }}
                      className='w-full'
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === framework.value.split('|')[0] ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </div>
        </div>
      </Popover>
    </div>
  )
}
