'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'

import { createWorkspace } from './actions'

type Props = {
  username: string
}

const Form = ({ username }: Props) => {
  const [name, setName] = useState(`${username}'s Workspace`)
  const [state, formAction] = useFormState(createWorkspace, {
    errors: {},
  })

  return (
    <form
      className="w-full max-w-sm rounded-xl border border-border bg-white px-6 py-4"
      action={formAction}
    >
      <h2 className="text-center text-lg font-semibold text-black">
        New Workspace
      </h2>

      <div className="relative mx-auto my-4 max-w-max">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-orange-500 p-0.5 text-3xl font-medium text-white">
          {name.slice(0, 1)}
        </div>
      </div>

      <label className="block w-full space-y-1.5">
        <p className="text-sm font-medium">Name</p>
        <input
          name="name"
          type="text"
          className="w-full rounded-lg border px-3 py-1.5 text-sm"
          placeholder="e.g. My workspace"
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
        />
      </label>

      <button className="mb-2 mt-4 w-full rounded-lg bg-primary py-1.5 text-sm font-medium text-white">
        Create
      </button>
    </form>
  )
}

export default Form
