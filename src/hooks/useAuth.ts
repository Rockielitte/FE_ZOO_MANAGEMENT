// import useAuthStore from '@/stores/authStore'
// import { User } from '@/types'
// // import { useQuery } from 'react-query'
// import { useUserStore } from '@/stores'
// import { get } from '@/utils/apiCaller'
// import axios from 'axios'
// import { useEffect } from 'react'
// type AuthHook = {
//   getUser: () => User | null
//   isAdmin: () => boolean
//   isStaff: () => boolean
//   isTrainer: () => boolean
// }

// const useAuth = ({ data }: User): AuthHook => {
//   const { user, setUser } = useAuthStore()

//   // console.log('check ' + user)
//   useEffect(() => {
//     const fetchUser = () => {
//       // Set the user in the auth store
//       setUser(data)

//       // if (userData) {
//       //   console.log('check run: ' + userData)
//       //   setUser(userData)
//       // }
//     }
//     fetchUser()
//   }, [])
//   // const getUser = (): User | null => {
//   //   return user
//   // }
//   // const isAdmin = (): boolean => {
//   //   return user?.role.toString() === 'ADMIN'
//   // }
//   // const isStaff = (): boolean => {
//   //   return user?.role.toString() === 'STAFF'
//   // }
//   // const isTrainer = (): boolean => {
//   //   return user?.role.toString() === 'TRAINER'
//   // }
//   // return { getUser, isAdmin, isStaff, isTrainer }
// }

// export default useAuth
