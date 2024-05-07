'use client'

import { useFormState } from 'react-dom'

import { PlusIcon } from '@/lib/icons'

import { createProject } from '../actions'

type Props = {
  children?: React.ReactNode
}

const CreateProjectForm = ({ children }: Props) => {
  const [state, formAction] = useFormState(createProject, {
    errors: {},
  })

  return (
    <form action={formAction} className="ml-auto">
      {children}
      <button className="ml-auto">
        <PlusIcon />
      </button>
    </form>
  )
}

export default CreateProjectForm
