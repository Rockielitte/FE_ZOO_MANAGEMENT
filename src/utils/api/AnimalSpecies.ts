import axios from 'axios'
import { get, post, put } from '../apiCaller'
import { dataSpecies } from '@/types'

const AnimalSpecies = {
  createSpecies: async (data: dataSpecies) => {
    console.log(data)
    const endpoint = `/animal-species/`

    try {
      const response = await post(
        endpoint,
        data,
        {},
        {
          Authorization:
            ' Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWY2ZjBkYi0wMDQ1LTRiZTYtYjFjMS0xZTVhZWVkYTYxNDUiLCJpYXQiOjE2OTgwNzgxMTUsImV4cCI6MTY5ODE2NDUxNX0.Ne4lvewUHJYhm0_0Btr06oeCjyp4LDlojHduf2fO_tk'
        }
      )
      console.log(response)
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

    try {
      const response = await get(
        endpoint,
        {},
        {
          'Content-Type': 'application/json',
          Authorization:
            ' Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWY2ZjBkYi0wMDQ1LTRiZTYtYjFjMS0xZTVhZWVkYTYxNDUiLCJpYXQiOjE2OTgwNzgxMTUsImV4cCI6MTY5ODE2NDUxNX0.Ne4lvewUHJYhm0_0Btr06oeCjyp4LDlojHduf2fO_tk'
        }
      )
      console.log(response)
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

    try {
      const response = await get(
        endpoint,
        {},
        {
          Authorization:
            ' Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWY2ZjBkYi0wMDQ1LTRiZTYtYjFjMS0xZTVhZWVkYTYxNDUiLCJpYXQiOjE2OTgwNzgxMTUsImV4cCI6MTY5ODE2NDUxNX0.Ne4lvewUHJYhm0_0Btr06oeCjyp4LDlojHduf2fO_tk'
        }
      )
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        return error.response
      }
    }
  },

  getCageBySpeciesId: async (id?: string | undefined) => {
    const endpoint = `/cages/`

    const response = await get(
      endpoint,
      { speciesId: id },
      {
        Authorization:
          ' Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWY2ZjBkYi0wMDQ1LTRiZTYtYjFjMS0xZTVhZWVkYTYxNDUiLCJpYXQiOjE2OTgwNzgxMTUsImV4cCI6MTY5ODE2NDUxNX0.Ne4lvewUHJYhm0_0Btr06oeCjyp4LDlojHduf2fO_tk'
      }
    )
    console.log(response)
    return response.data
  },

  updateSpecies: async (data: dataSpecies, id: number) => {
    console.log(data)
    const endpoint = `/animal-species/${id}`

    try {
      const response = await put(
        endpoint,
        data,
        {},
        {
          Authorization:
            ' Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWY2ZjBkYi0wMDQ1LTRiZTYtYjFjMS0xZTVhZWVkYTYxNDUiLCJpYXQiOjE2OTgwNzE5NDgsImV4cCI6MTY5ODE1ODM0OH0.P0-68ATlPDrWOc0AJpLUFKdGsudIfsl6BIWFII02ibc'
        }
      )
      console.log(response)
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
