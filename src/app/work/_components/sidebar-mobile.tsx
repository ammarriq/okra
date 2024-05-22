'use client'

import { Button, Dialog, DialogTrigger, Modal } from 'react-aria-components'

import { SquareHalfIcon, XIcon } from '@/lib/icons'

type Props = {
  children: React.ReactNode
}

const SidebarMobile = ({ children }: Props) => {
  return (
    <DialogTrigger>
      <Button className="mr-4 flex items-center rounded-md bg-background p-1 lg:hidden">
        <SquareHalfIcon className="size-6" />
      </Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <>
              <button
                type="button"
                className="fixed right-4 top-3.5 z-50 flex"
                onClick={close}
              >
                <XIcon />
              </button>

              {children}
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  )
}

export default SidebarMobile
