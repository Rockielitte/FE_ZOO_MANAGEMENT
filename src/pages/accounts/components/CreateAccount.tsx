import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { FC } from 'react'
import { Icons } from '@/components/Icon'
interface CreateAccountProps {}
import { AccountForm } from './AccountForm'
const CreateAccount: FC<CreateAccountProps> = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary'>
          <Icons.PlusCircleIcon className='mr-2' />
          Create Account
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[475px]'>
        <DialogHeader>
          <DialogTitle> Create Account</DialogTitle>
          <DialogDescription>Fill out the required fields in the registration form</DialogDescription>
        </DialogHeader>
        <AccountForm />

        {/* <DialogFooter>
          <Button type='submit'>Save</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

export default CreateAccount