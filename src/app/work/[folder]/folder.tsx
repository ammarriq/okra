import type { Folder } from '@/lib/schemas/folder'

type Props = {
  folder: Folder
}

const Folder = async ({ folder }: Props) => {
  return (
    <section className="grid h-full grid-rows-[auto_minmax(0,1fr)]">
      <header className="flex items-center pb-4 pt-3 text-foreground/80">
        <input
          className="text-xl font-bold placeholder:text-foreground/20 focus:outline-none"
          placeholder="Untitled"
          // value={data.project.name}
          // oninput={(e) => {
          // 	const index = projects.value.findIndex((o) => o.id === data.project.id)
          // 	projects.value[index].name = e.currentTarget.value

          // 	const project = projects.value[index]
          // 	debouncedUpdate({
          // 		id: project.id,
          // 		name: project.name ?? ''
          // 	})
          // }}
        />

        <button
          type="button"
          className="ml-auto flex items-center justify-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-white"
          // onclick={() => (sectionForm = true)}
        >
          <i className="icon-[ph--plus-bold] size-3"></i>
          <span className="text-xs">New</span>
        </button>

        <button
          type="button"
          className="ml-2 grid place-items-center self-stretch rounded-md border px-1.5 hover:bg-background"
        >
          <i className="icon-[ph--dots-three-vertical-bold] size-4 text-foreground/40"></i>
        </button>
      </header>

      <div
        className="scrollbar-thin flex h-full items-start gap-3 overflow-x-auto overflow-y-hidden pb-2"
        // bind:this={draggableEl}
      >
        {/* {#if sectionForm}
			{@const rank = new Lexorank().insert('', sections[0]?.data.rank ?? '')[0]}

			<SectionForm
				{rank}
				onblur={() => (sectionForm = false)}
				onadd={(section) => {
					sectionForm = false

					sections.unshift({
						data: section,
						tasks: Promise.resolve([])
					})
				}}
			/>
		{/if}

		{#each sections as section (section.data.id)}
			<Section
				section={section.data}
				taskPromise={section.tasks}
				ondelete={(id) => {
					sections = sections.filter((o) => o.data.id !== id)
				}}
			/>
		{/each} */}
      </div>
    </section>
  )
}

export default Folder
