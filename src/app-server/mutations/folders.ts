import { hc } from '../hono'

export const addFolder = async (id: string) => {
  const res = await hc.folders.$post({ json: { id } })
  const result = await res.json()

  if (!result.success) {
    const { error } = result
    throw Error(error.message, { cause: error.code })
  }

  return result.data
}

export const deleteFolder = async (id: string) => {
  const res = await hc.folders[':id'].$delete({ param: { id } })
  const result = await res.json()

  if (!result.success) {
    const { error } = result
    throw Error(error.message, { cause: error.code })
  }

  return result.data
}
