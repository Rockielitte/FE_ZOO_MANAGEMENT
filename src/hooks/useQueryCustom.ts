import { useUserStore } from '@/stores'
import { request } from '@/utils/apiCaller'
import axios, { AxiosResponse } from 'axios'
import React from 'react'
import { useQuery, useQueryClient } from 'react-query'

type Props<T, X> = {
  queryKey: string[]
  query: string
  data: T
  dataRes?: X
}
const useQueryCustom = <T, X>({ query, queryKey }: Props<T, X>) => {
  const token = useUserStore((state) => state.user)?.token
  const queryClient = useQueryClient()
  const data = useQuery<AxiosResponse<T[] | X>, unknown, T[] | X>({
    queryKey: queryKey,
    queryFn: () => {
      return request<T[] | X>(query, 'GET', {
        Authorization: `Bearer ${token} `
      })
    },
    onSuccess: (data) => {
      console.log(data, queryKey)
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.message)
      }
    },
    select: (data) => {
      return data.data as T[] | X
    }
  })
  return data
}

export default useQueryCustom
