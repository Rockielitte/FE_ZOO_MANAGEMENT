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
import { useUpdateNewStatus } from '@/hooks/useUpdateStatusNew'

import { NewType } from '@/types'
interface ModalConfirmUpdate {
  showDeleteDialog: boolean
  setShowDeleteDialog: (prevState: boolean) => void
  newUpdate: NewType | string
}

const ModalConfirmUpdate: FC<ModalConfirmUpdate> = ({ showDeleteDialog, setShowDeleteDialog, newUpdate }) => {
  const { updateNew } = useUpdateNewStatus()
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
              updateNew(newUpdate as NewType)
              setShowDeleteDialog(false)
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
