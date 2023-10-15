import { useUserStore } from '@/stores'

export default function GetAuthHeader() {
  const { user } = useUserStore()
  console.log('user.getAuthHeader' + user.token)
  if (user) {
    return { Authorization: 'Bearer ' + user.token }
  } else {
    return {}
  }
}
