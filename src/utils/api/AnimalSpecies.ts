import { get, post, put } from '../apiCaller'
import { dataSpecies } from '@/types'

const AnimalSpecies = {
  createSpecies: async (data: dataSpecies) => {
    console.log(data)
    const endpoint = `/animal-species/`

    try {
      const response = await post(endpoint, data, {}, {Authorization: ' Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RBRkYiLCJzdWIiOiIwM2xpbmhuZ3V5ZW5AZ21haWwuY29tIiwiaWF0IjoxNjk3NTYwMzY3LCJleHAiOjE2OTc1NzgzNjd9.tqjoa51pXDcP00BxAsm-yalrRHc7p_M-HB4EQ_Q3W0U'})
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return error.response
    }
  },

  getAllSpecies: async () => {
    const endpoint = `/animal-species/`

    try {
      const response = await get(endpoint, {}, {Authorization: ' Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RBRkYiLCJzdWIiOiIwM2xpbmhuZ3V5ZW5AZ21haWwuY29tIiwiaWF0IjoxNjk3NTYwMzY3LCJleHAiOjE2OTc1NzgzNjd9.tqjoa51pXDcP00BxAsm-yalrRHc7p_M-HB4EQ_Q3W0U'})
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return error.response
    }
  },
  
  getById: async (id: string) => {
    const endpoint = `/animal-species/${id}`

    try {
      const response = await get(endpoint, {}, {Authorization: ' Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RBRkYiLCJzdWIiOiIwM2xpbmhuZ3V5ZW5AZ21haWwuY29tIiwiaWF0IjoxNjk3NTYwMzY3LCJleHAiOjE2OTc1NzgzNjd9.tqjoa51pXDcP00BxAsm-yalrRHc7p_M-HB4EQ_Q3W0U'})
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      return error.response
    }
  },

  updateSpecies: async (data: dataSpecies, id: number) => {
    console.log(data)
    const endpoint = `/animal-species/${id}`

    try {
      const response = await put(endpoint, data, {}, {Authorization: ' Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiU1RBRkYiLCJzdWIiOiIwM2xpbmhuZ3V5ZW5AZ21haWwuY29tIiwiaWF0IjoxNjk3NTYwMzY3LCJleHAiOjE2OTc1NzgzNjd9.tqjoa51pXDcP00BxAsm-yalrRHc7p_M-HB4EQ_Q3W0U'})
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return error.response
    }
  },
}
export default AnimalSpecies
