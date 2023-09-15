import { FC } from 'react'
import { queryClient } from '../../routes'
const Register: FC = () => {
  const data = queryClient.getQueryData('repoData')
  console.log(data)

  return <div>Register</div>
}

export default Register
