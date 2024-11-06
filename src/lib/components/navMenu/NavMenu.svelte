<script>
	import NavLink from './NavLink.svelte';
	import { createEventDispatcher } from 'svelte';
	import emailStore from '$lib/stores/emailStore.js';

	const links = [
		{ id: 1, icon: 'inbox', title: 'Posta in arrivo', category: 'inbox' },
		{ id: 2, icon: 'star', title: 'Speciali', category: 'favourites' },
		{ id: 3, icon: 'schedule', title: 'Posticipati', category: 'postponed' },
		{ id: 4, icon: 'send', title: 'Inviati', category: 'sent' },
		{ id: 5, icon: 'draft', title: 'Bozze', category: 'drafts' }
		// { id: 6, icon: 'keyboard_arrow_down', title: 'Altro' }
	];

	let emailData;

	emailStore.subscribe((value) => {
		emailData = value;
	});

	// handle write email button click
	const dispatch = createEventDispatcher();

	function handleWriteEmailClick() {
		dispatch('openForm');
	}
</script>

<div class="nav-container">
	<button class="write-email-btn" on:click={handleWriteEmailClick}>
		<span class="material-symbols-outlined"> edit </span>
		<p>Scrivi</p>
	</button>
	<nav>
		<ul>
			{#each links as link (link.id)}
				<NavLink
					icon={link.icon}
					title={link.title}
					category={link.category}
					count={emailData[link.category] ? emailData[link.category].length : 0}
				/>
			{/each}
		</ul>
	</nav>
</div>

<style>
	:root {
		--write-email-btn-bgcolor: #c2e7ff;
	}

	nav {
		display: flex;
		flex-direction: column;
		grid-area: nav-menu;
		width: 93%;
		margin-top: 20px;
	}

	nav ul {
		margin: 0;
		padding: 0;
	}

	.write-email-btn {
		width: 120px;
		height: 56px;
		border-radius: 16px;
		border: none;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		background-color: var(--write-email-btn-bgcolor);
		margin-left: 10px;
		cursor: pointer;
	}

	.write-email-btn:hover {
		box-shadow:
			0 1px 3px 0 rgba(60, 64, 67, 0.3),
			0 4px 8px 3px rgba(60, 64, 67, 0.15);
	}
</style>
