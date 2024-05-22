import type { Folder } from '@/lib/schemas/folder'

type Props = {
  folder: Folder
}

const Folder = async ({ folder }: Props) => {
  return (
    <>
      <pre>{JSON.stringify(folder, null, 2)}</pre>
    </>
  )
}

export default Folder
