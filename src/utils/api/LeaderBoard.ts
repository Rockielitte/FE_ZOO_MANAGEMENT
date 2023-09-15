import { get } from '../apiCaller'

const LeaderBoard = {
  getLeaderBoard: async () => {
    const endpoint = `/users`

    try {
      const response = await get(endpoint, {})

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
export default LeaderBoard
