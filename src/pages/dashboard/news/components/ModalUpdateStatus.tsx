import { Button } from '@/components/ui/button'

import { FC } from 'react'
// import { Icons } from '@/components/Icon'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { toast } from '@/components/ui/use-toast'
interface ModalConfirmUpdate {
  showDeleteDialog: boolean
  setShowDeleteDialog: (prevState: boolean) => void
}

const ModalConfirmUpdate: FC<ModalConfirmUpdate> = ({ showDeleteDialog, setShowDeleteDialog }) => {
  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This preset will no longer be accessible by you or others you&apos;ve shared
            it with.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant='default'
            onClick={() => {
              setShowDeleteDialog(false)
              toast({
                variant: 'success',
                title: 'success'
              })
            }}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalConfirmUpdate
