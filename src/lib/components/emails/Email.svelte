<script>
	import { createEventDispatcher } from 'svelte';

	export let email;
	export let isDraggable = false;

	let isHovered = false;
	let seen = false;
	let checkboxIsHovered = false;
	let date;

	function formatDate(date) {
		if (!(date instanceof Date)) {
			date = new Date(date); // Ensure it's a Date object
		}

		const monthNames = [
			'jan',
			'feb',
			'mar',
			'apr',
			'may',
			'jun',
			'jul',
			'aug',
			'sep',
			'oct',
			'nov',
			'dec'
		];
		const day = date.getDate();
		const month = monthNames[date.getMonth()];

		return `${day} ${month}`;
	}

	$: date = formatDate(email.date);

	const dispatch = createEventDispatcher();

	function handleFavouriteToggle() {
		dispatch('toggleFavourite', email.id);
	}

	function handleDeleteEmail() {
		dispatch('deleteEmail', email.id);
	}
</script>

<div
	class="email-container"
	class:seen
	role="presentation"
	draggable={isDraggable}
	on:dragstart={(e) => {
		dispatch('dragstart', email);
	}}
	on:dragover={(e) => {
		e.preventDefault();
		dispatch('dragover', email);
	}}
	on:drop={(e) => {
		e.preventDefault();
		dispatch('drop', email);
	}}
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
>
	<div class="email-left-section">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="checkbox-container"
			class:checkbox-hovered={checkboxIsHovered}
			on:mouseleave={() => (checkboxIsHovered = false)}
		>
			<input
				type="checkbox"
				name=""
				id=""
				class="select-email-checkbox"
				on:mouseenter={() => (checkboxIsHovered = true)}
				on:click|stopPropagation
			/>
		</div>
		<!-- metti in un div -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span
			class="material-symbols-outlined favourite-icon"
			class:fill-icon={email.favourite}
			on:click|stopPropagation={handleFavouriteToggle}
		>
			star
		</span>
		<p class="sender">{email.sender}</p>
	</div>
	<div class="email-mid-section">
		<span class="subject">{email.subject}</span> -
		<span class="body">{email.body}</span>
	</div>
	<div class="email-right-section">
		{#if isHovered}
			<div class="email-actions-container">
				<button class="email-action-button" aria-label="Archive email">
					<span class="material-symbols-outlined"> archive </span>
				</button>
				<button class="email-action-button" aria-label="Delete email" on:click={handleDeleteEmail}>
					<span class="material-symbols-outlined"> delete </span>
				</button>
				<button class="email-action-button" aria-label="Mark email as unread">
					<span class="material-symbols-outlined"> mark_email_unread </span>
				</button>
				<button class="email-action-button" aria-label="Schedule email">
					<span class="material-symbols-outlined"> schedule </span>
				</button>
			</div>
		{:else}
			<p class="date">{date}</p>
		{/if}
	</div>
</div>

<style>
	.email-container {
		display: grid;
		grid-template-columns: 200px 1fr auto;
		grid-template-areas: 'left mid right';
		align-items: center;
		column-gap: 20px;
		cursor: pointer;
		border-bottom: 2px solid var(--page-bgcolor);
		background-color: white;
		padding: 0 10px;
	}

	.email-container:hover {
		box-shadow:
			inset 1px 0 0 #dadce0,
			inset -1px 0 0 #dadce0,
			0 1px 2px 0 rgba(60, 64, 67, 0.3),
			0 1px 3px 1px rgba(60, 64, 67, 0.15);
		z-index: 2;
		position: relative;
	}

	.email-left-section {
		grid-area: left;
		display: flex;
		align-items: center;
	}

	.checkbox-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 40px;
		border-radius: 50%;
	}

	.checkbox-hovered {
		background-color: #e8eaed;
	}

	.select-email-checkbox {
		cursor: pointer;
	}

	.favourite-icon {
		color: #c4c5c4;
		margin: 0 10px;
		cursor: pointer;
		font-weight: 300;
		font-size: 1.5rem;
	}

	.favourite-icon:hover {
		font-variation-settings: 'FILL' 1;
		color: rgb(235, 193, 8);
	}

	.fill-icon {
		font-variation-settings: 'FILL' 1;
		color: rgb(235, 193, 8);
	}

	.email-mid-section {
		grid-area: mid;
		display: flex;
		align-items: center;
		gap: 5px;
		white-space: nowrap;
		overflow: hidden;
		width: calc(100%);
		max-width: 100%;
	}

	.email-right-section {
		grid-area: right;
		justify-self: end;
		width: 100%;
	}

	.email-actions-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.email-action-button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		height: 40px;
		width: 40px;
	}

	.email-action-button:hover {
		background-color: #e8eaed;
	}

	.email-action-button .material-symbols-outlined {
		font-size: 1.3rem;
		color: #444746;
	}

	.sender,
	.subject,
	.body {
		font-size: 0.875rem;
	}

	.body {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex-grow: 1;
		min-width: 0;
	}

	.sender,
	.subject {
		font-weight: 700;
	}

	.body {
		color: #5f6368;
	}

	.date {
		font-size: 0.75rem;
		font-weight: 700;
	}
</style>
