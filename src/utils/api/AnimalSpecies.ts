/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import { get, post, put } from '../apiCaller'
import { dataSpecies } from '@/types'
import { useAuthorizationHeader } from '../authHeader'

const AnimalSpecies = {
  createSpecies: async (data: dataSpecies) => {
    const endpoint = `/animal-species/`
    const test = useAuthorizationHeader()
    try {
      const response = await post(endpoint, data, {}, test.headers)

      return response
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        return error.response
      }
    }
  },

  getAllSpecies: async () => {
    const endpoint = `/animal-species/`
    const test = useAuthorizationHeader()
    try {
      const response = await get(endpoint, {}, test.headers)

      return response
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        return error.response
      }
    }
  },

  getById: async (id?: string) => {
    const endpoint = `/animal-species/${id}`
    const test = useAuthorizationHeader()
    try {
      const response = await get(endpoint, {}, test.headers)

      return response.data
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        return error.response
      }
    }
  },

  getCageBySpeciesId: async (id?: string | undefined) => {
    const endpoint = `/cages/?speciesId=${id}`
    const test = useAuthorizationHeader()
    try {
      const response = await get(endpoint, {}, test.headers)

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  },

  updateSpecies: async (data: dataSpecies, id: number) => {
    const endpoint = `/animal-species/${id}`
    const test = useAuthorizationHeader()
    try {
      const response = await put(endpoint, data, {}, test.headers)

      return response
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        return error.response
      }
    }
  }
}
export default AnimalSpecies
