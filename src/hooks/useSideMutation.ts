import { useUserStore } from '@/stores'
import { request } from '@/utils/apiCaller'
import axios from 'axios'
import React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
type Props<T> = {
  queryKey: string[]
  query: string
  method?: string
  invalidQuery?: string[]
  returnType: T
}
const useSideMutation = <T>({ query, queryKey, method = 'POST' }: Props<T>) => {
  const token = useUserStore((state) => state.user)?.token
  const formMutation = useMutation({
    mutationKey: queryKey,
    mutationFn: (data: object) => {
      return request<T>(
        query,
        method,
        {
          Authorization: `Bearer ${token} `,
          Headers: { 'Content-Type': 'application/json' }
        },
        {},
        data
      )
    },
    onSuccess: (data) => {
      toast.success('Send sucessfully')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.message)
      }
    }
  })
  return formMutation
}

export default useSideMutation
