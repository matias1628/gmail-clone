<script>
	import Email from './Email.svelte';
	import emailStore from '$lib/stores/emailStore.js';
	import SortPopup from './SortPopup.svelte';
	import { deleteEmail, toggleFavourite, updateEmailStore } from '$lib/stores/emailActions.js';
	import { searchQuery } from '$lib/stores/searchStore.js';
	import { showWriteEmail, draftData } from '$lib/stores/draftWrite.js';
	import { goto } from '$app/navigation';

	export let category;

	let emails = [];
	let search;
	let draggedEmail = null;
	let showPopup = false;
	let sortOrder = 'newest';

	$: {
		// This ensures you dynamically update `emails` when `category` changes
		emailStore.subscribe((store) => {
			emails = store[category] || [];
		});

		searchQuery.subscribe((value) => {
			search = value.toLowerCase();
		});
	}

	$: sortedEmails = [...emails].sort((a, b) => {
		return sortOrder === 'newest'
			? new Date(b.date) - new Date(a.date)
			: new Date(a.date) - new Date(b.date);
	});

	$: filteredEmails = sortedEmails.filter(
		(email) =>
			(email.subject?.toLowerCase() || '').includes(search) ||
			(email.body?.toLowerCase() || '').includes(search) ||
			(email.receiver?.toLowerCase() || '').includes(search) ||
			(email.sender?.toLowerCase() || '').includes(search)
	);

	function handleSort(event) {
		sortOrder = event.detail.order;
		showPopup = false;
	}

	function handleFavouriteToggle(event) {
		const emailId = event.detail;
		toggleFavourite(emailId);
	}

	function handleDeleteEmail(event) {
		const emailId = event.detail;
		deleteEmail(emailId, category);
	}

	// Drag-and-drop handlers
	function handleDragStart(email) {
		console.log('drag start');
		draggedEmail = email; // set the dragged email
	}

	function handleDragOver(event) {
		// Prevent default to allow drop
		event.preventDefault();
		console.log('drag over');
	}

	function handleDrop(targetEmail) {
		// Ensure only dragging in favourites category
		if (category === 'favourites' && draggedEmail) {
			const updatedOrder = reorderEmails(emails, draggedEmail, targetEmail);
			updateEmailStore({ favourites: updatedOrder });
		}
		draggedEmail = null; // Reset dragged email
		console.log('drag drop');
	}

	// Reorder helper function
	function reorderEmails(list, dragged, target) {
		const result = [...list];
		const draggedIndex = result.findIndex((email) => email.id === dragged.id);
		const targetIndex = result.findIndex((email) => email.id === target.id);

		// Remove dragged item from current position
		result.splice(draggedIndex, 1);
		// Insert dragged item at new position
		result.splice(targetIndex, 0, dragged);
		return result;
	}

	function handleEmailClick(email) {
		if (email.draft) {
			console.log('Draft clicked, updating store with draft data:', email);
			draftData.set(email); // Set the draft data
			showWriteEmail.set(true); // Show the WriteEmail component
		} else {
			goto(`/inbox/${email.id}`);
		}
	}
</script>

<section>
	<div class="email-section-header">
		<!-- Checkbox for selecting emails -->
		<input type="checkbox" id="select-all-emails" aria-label="Select all emails" />

		<!-- Dropdown button -->
		<button aria-label="Open dropdown" class="icon-button">
			<span class="material-symbols-outlined">arrow_drop_down</span>
		</button>

		<!-- Refresh button -->
		<button aria-label="Refresh emails" class="icon-button">
			<span class="material-symbols-outlined">refresh</span>
		</button>

		<!-- More options button -->
		<div class="button-wrap">
			<button
				aria-label="More options"
				class="icon-button"
				on:click={() => (showPopup = !showPopup)}
			>
				<span class="material-symbols-outlined">more_vert</span>
			</button>
			{#if showPopup}
				<SortPopup on:sort={handleSort} />
			{/if}
		</div>
	</div>
	<div class="email-section-body">
		{#if search.length == 0}
			{#if sortedEmails.length > 0}
				{#each sortedEmails as email}
					<a
						href="#"
						on:click|preventDefault={() => handleEmailClick(email)}
						class="email-external-container"
					>
						<Email
							{email}
							isDraggable={category == 'favourites'}
							on:dragstart={() => handleDragStart(email)}
							on:dragover={handleDragOver}
							on:drop={() => handleDrop(email)}
							on:deleteEmail={handleDeleteEmail}
							on:toggleFavourite={handleFavouriteToggle}
						/>
					</a>
				{/each}
			{:else}
				<p>No emails in your inbox</p>
			{/if}
		{:else if filteredEmails.length > 0}
			{#each filteredEmails as email}
				<a
					href="#"
					on:click|preventDefault={() => handleEmailClick(email)}
					class="email-external-container"
				>
					<Email
						{email}
						isDraggable={false}
						on:deleteEmail={handleDeleteEmail}
						on:toggleFavourite={handleFavouriteToggle}
					/>
				</a>
			{/each}
		{:else}
			<p>No emails found matching your search</p>
		{/if}
		<div class="email-section-footer">
			<span>Termini · Privacy · Norme del programma</span>
		</div>
	</div>
</section>

<style>
	section {
		border-radius: 20px;
		overflow: hidden;
		grid-area: content;
		display: flex;
		flex-direction: column;
	}

	.email-external-container {
		text-decoration: none;
		color: inherit;
	}

	.email-section-header {
		display: flex;
		background-color: white;
		padding: 15px 20px;
	}

	.button-wrap {
		position: relative;
		display: inline-block;
	}

	.icon-button {
		border: none;
		background-color: transparent;
		cursor: pointer;
		height: 40px;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		z-index: 1;
	}

	.icon-button:hover {
		background-color: #eaebef;
	}

	.icon-button .material-symbols-outlined {
		font-size: 1.25rem;
	}

	.email-section-body {
		max-height: 800px;
		overflow-y: scroll;
		flex-grow: 1;
	}

	.email-section-body:last-child {
		border-bottom: none;
	}

	.email-section-footer {
		background-color: white;
		padding: 20px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.email-section-footer span {
		color: #666666;
		font-size: 12px;
	}

	/* scrollbar stuff */
	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-button {
		width: 0;
		height: 0;
		display: none;
	}

	::-webkit-scrollbar-corner {
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		-webkit-box-shadow:
			inset 1px 1px 0px rgba(0, 0, 0, 0.1),
			inset 0px -1px 0px rgba(0, 0, 0, 0.07);
	}
</style>
