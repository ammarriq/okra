<script lang="ts">
	import type { Workspace } from '$lib/schemas/workspace'

	import { page } from '$app/stores'

	// import { getInitials } from '$lib/utils/random'
	import { Dropdown } from '$builders/dropdown'
	// import Avatar from '$components/avatar.svelte'

	interface Props {
		workspaces: Workspace[]
	}

	let { workspaces }: Props = $props()

	const dropdown = new Dropdown({
		position: { offset: 5, sameWidth: true }
	})

	const workspaceId = $derived($page.params.workspaceId)
	const workspace = $derived(workspaces.find((o) => o.id === workspaceId))
</script>

<button
	{...dropdown.trigger()}
	class="border-border flex items-center gap-2 rounded-xl border bg-white p-1.5"
>
	<div class="grid size-9 shrink-0 place-items-center rounded-lg bg-orange-500 text-white">
		{workspace?.name.slice(0, 1)}
	</div>
	<!-- <Avatar
		class="size-9 shrink-0 rounded-lg"
		src="/api/images/{workspace?.icon}"
		fallback={getInitials(workspace?.name || '')}
	/> -->

	<p class="grid overflow-hidden text-left">
		<span class="text-xs font-medium text-foreground/40"> Workspace </span>
		<span class="truncate text-sm font-medium"> {workspace?.name} </span>
	</p>

	<i class="icon-[ph--caret-up-down] ml-auto mr-0.5 size-4 shrink-0"></i>
</button>

{#if dropdown.open}
	<div
		{...dropdown.content()}
		class="border-border z-20 space-y-0.5 rounded-lg border bg-white p-0.5"
	>
		{#each workspaces as { id, name } (id)}
			{@const isCurrent = workspaceId === id}

			<a
				{...dropdown.item()}
				href={isCurrent ? undefined : `/app/${id}/home`}
				class="flex w-full cursor-pointer items-center rounded-md p-1 hover:bg-background"
			>
				<!-- <img class="size-6 rounded" src="/api/images/{icon}" alt="notion" /> -->
				<div
					class="grid size-6 shrink-0 place-items-center rounded bg-orange-500 text-xs text-white"
				>
					{workspace?.name.slice(0, 1)}
				</div>

				<p class="ml-2 truncate whitespace-nowrap text-sm font-medium">
					{name}
				</p>

				<label class="group ml-auto flex rounded-full bg-white">
					<input type="radio" class="peer" hidden checked={isCurrent} />
					<div
						class="icon-[ph--circle] !size-[1.1rem] shrink-0 text-gray-300
						peer-checked:icon-[ph--check-circle-fill] peer-checked:text-green-500"
					></div>
				</label>
			</a>
		{/each}

		<hr class="-mx-0.5" />

		<a
			href="/app/workspace"
			class="flex w-full items-center gap-2 whitespace-nowrap px-2 py-1.5"
			{...dropdown.item()}
		>
			<i class="icon-[ph--plus] size-3"></i>
			<span class="text-xs font-medium">New Workspace</span>
		</a>
	</div>
{/if}
