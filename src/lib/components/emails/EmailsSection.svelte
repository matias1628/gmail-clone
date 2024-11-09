<script>
	// Svelte Imports
	import { goto } from '$app/navigation';

	// Component Imports
	import Email from './Email.svelte';
	import SortPopup from './SortPopup.svelte';

	// Store Imports
	import emailStore from '$lib/stores/emailStore.js';
	import { selectedEmails } from '$lib/stores/selectedEmailsStore.js';
	import { searchQuery } from '$lib/stores/searchStore.js';
	import { showWriteEmail, draftData } from '$lib/stores/draftWrite.js';

	// Action Imports
	import { deleteEmail, toggleFavourite, updateEmailStore } from '$lib/stores/emailActions.js';

	// Props
	export let category;

	// Local State
	let emails = [];
	let search;
	let draggedEmail = null;
	let showPopup = false;
	let sortOrder = 'newest';
	let selectAllChecked = false;

	// Reactive Store Subscriptions
	$: {
		// Subscribe to email store updates based on category
		emailStore.subscribe((store) => {
			emails = store[category] || [];
		});

		// Subscribe to search query updates
		searchQuery.subscribe((value) => {
			search = value.toLowerCase();
		});
	}

	// Sort emails based on `sortOrder` - 'newest' or 'oldest'
	$: sortedEmails = [...emails].sort((a, b) => {
		return sortOrder === 'newest'
			? new Date(b.date) - new Date(a.date)
			: new Date(a.date) - new Date(b.date);
	});

	// Filter emails based on search query
	$: filteredEmails = sortedEmails.filter(
		(email) =>
			(email.subject?.toLowerCase() || '').includes(search) ||
			(email.body?.toLowerCase() || '').includes(search) ||
			(email.receiver?.toLowerCase() || '').includes(search) ||
			(email.sender?.toLowerCase() || '').includes(search)
	);

	// Sort Handling
	function handleSort(event) {
		sortOrder = event.detail.order;
		showPopup = false;
	}

	// Favourite Toggle Handling
	function handleFavouriteToggle(event) {
		const emailId = event.detail;
		toggleFavourite(emailId);
	}

	// Delete Email Handling
	function handleDeleteEmail(event) {
		const emailId = event.detail;
		deleteEmail(emailId, category);
		// SE CANCELLO UNA MAIL IN INBOX DEVE SPARIRE ANCHE DAI PREFERITI E VICEVERSA
	}

	// Drag and Drop Handling
	function handleDragStart(email) {
		draggedEmail = email;
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	function handleDrop(targetEmail) {
		if (category === 'favourites' && draggedEmail) {
			const updatedOrder = reorderEmails(emails, draggedEmail, targetEmail);
			updateEmailStore({ favourites: updatedOrder });
		}
		draggedEmail = null;
		console.log('drag drop');
	}

	// Reorder Emails Function for Drag-and-Drop
	function reorderEmails(list, dragged, target) {
		const result = [...list];
		const draggedIndex = result.findIndex((email) => email.id === dragged.id);
		const targetIndex = result.findIndex((email) => email.id === target.id);
		result.splice(draggedIndex, 1);
		result.splice(targetIndex, 0, dragged);
		return result;
	}

	// Handle Email Click - navigate or open draft editor
	function handleEmailClick(email) {
		if (email.draft) {
			console.log('Draft clicked, updating store with draft data:', email);
			draftData.set(email);
			showWriteEmail.set(true);
		} else {
			goto(`/inbox/${email.id}`);
		}
	}

	// Toggle select all emails
	function toggleSelectAll() {
		selectAllChecked = !selectAllChecked;

		if (selectAllChecked) {
			// Add all email IDs to selectedEmails store
			selectedEmails.set(emails.map((email) => email.id));
		} else {
			// Clear selectedEmails store
			selectedEmails.set([]);
		}
	}

	function deleteSelectedEmails() {
		selectedEmails.update((ids) => {
			// Delete each email by id
			ids.forEach((id) => deleteEmail(id, category));
			return [];
		});
	}
</script>

<section>
	<div class="email-section-header">
		<div class="select-all">
			<input
				type="checkbox"
				id="select-all-emails"
				aria-label="Select all emails"
				bind:checked={selectAllChecked}
				on:click={toggleSelectAll}
			/>
			<span>▾</span>
		</div>

		<button aria-label="Refresh emails" class="icon-button">
			<span class="material-symbols-outlined">refresh</span>
		</button>

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

		<button
			class="icon-button"
			on:click={deleteSelectedEmails}
			disabled={$selectedEmails.length === 0}
		>
			<span class="material-symbols-outlined"> delete </span>
		</button>
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
				<p class="no-emails">No emails in your inbox</p>
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
			<p class="no-emails">No emails found matching your search</p>
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
		max-height: 90vh;
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

	.select-all {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: default;
	}

	.select-all input {
		cursor: pointer;
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

	.no-emails {
		display: flex;
		justify-content: center;
	}
</style>
