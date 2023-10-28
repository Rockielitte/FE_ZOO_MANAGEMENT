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
    console.log('user: ' + user.token)

    // Return an object with the Authorization header
    return {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzRiMzNiNy04OWFiLTRlZmItYWQxNC1iYTNlZDkwMGM0MmMiLCJpYXQiOjE2OTg0NTA4MjUsImV4cCI6MTY5ODUzNzIyNX0.kzL2k02mJkt658J7lM7Qiq-klHF6zCJg-vR7xzaR4kM`
      }
    }
  } else {
    // Return an empty object if token is empty
    return {}
  }
}
