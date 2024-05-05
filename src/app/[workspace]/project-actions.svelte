<script lang="ts">
	import { page } from '$app/stores'

	import { cn } from '$lib/utils/cn'
	import { Dropdown } from '$builders/dropdown'

	const dropdown = new Dropdown()
</script>

<button
	{...dropdown.trigger()}
	class={cn(
		'hidden rounded-md px-1 py-0.5 hover:bg-foreground/5 group-hover:flex',
		dropdown.open ? 'flex' : ''
	)}
>
	<i class="icon-[solar--menu-dots-bold] size-4 text-foreground/40"></i>
</button>

{#if dropdown.open}
	<div
		{...dropdown.content()}
		class="border-border z-50 w-44 rounded-md border bg-white p-1 shadow"
	>
		<a
			{...dropdown.item()}
			href={$page.url.pathname}
			target="_blank"
			class="flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm text-foreground/80 hover:bg-background"
		>
			<i class="icon-[solar--square-share-line-outline] mr-2 size-4"></i>
			Open in a new tab
		</a>
		<button
			{...dropdown.item()}
			type="button"
			class="flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm text-foreground/80 hover:bg-background"
		>
			<i class="icon-[solar--link-outline] mr-2 size-4"></i>
			Copy link
		</button>
		<button
			{...dropdown.item()}
			type="button"
			class="flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm text-danger hover:bg-background"
		>
			<i class="icon-[solar--trash-bin-minimalistic-outline] mr-2 size-4"></i>
			Delete
		</button>
	</div>
{/if}

<style lang="postcss">
	.inactive {
		@apply border border-transparent text-foreground/50;
	}

	.active {
		@apply border-border border bg-white text-foreground;
	}

	.anchor:hover {
		@apply border-border border bg-white text-foreground;
	}
</style>
