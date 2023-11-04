import { useUserStore } from '@/stores'

// Function to update the Authorization header
export const useAuthorizationHeader = () => {
  const { user } = useUserStore.getState()

  if (user) {
    console.log('user: ' + user.token)

    // Return an object with the Authorization header
    return {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  } else {
    // Return an empty object if token is empty
    return {}
  }
}
