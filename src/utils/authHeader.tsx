import { useUserStore } from '@/stores'

// export default function GetAuthHeader() {
//   const { user } = useUserStore()
//   console.log('user.getAuthHeader' + user.token)
//   if (user) {
//     return { Authorization: 'Bearer ' + user.token }
//   } else {
//     return {}
//   }
// }

// Function to update the Authorization header
export const useAuthorizationHeader = () => {
  const { user } = useUserStore.getState()

  if (user) {
    // Return an object with the Authorization header
    return {
      Authorization: `Bearer ${user}`
    }
  } else {
    // Return an empty object if token is empty
    return {}
  }
}
