<script>
	import '../global.css';
	import Header from '../lib/components/header/Header.svelte';
	import NavMenu from '../lib/components/navMenu/NavMenu.svelte';
	import WriteEmail from '../lib/components/emails/WriteEmail.svelte';
	import { showWriteEmail, draftData } from '$lib/stores/draftWrite.js';

	function openWriteEmail() {
		showWriteEmail.set(true);
	}

	function closeWriteEmail() {
		draftData.set(null);
		showWriteEmail.set(false);
	}
</script>

<div class="main-container">
	<Header />
	<NavMenu on:openForm={openWriteEmail} />
	<slot></slot>
</div>
{#if $showWriteEmail}
	<WriteEmail on:closeForm={closeWriteEmail} />
{/if}

<style>
	.main-container {
		display: grid;
		grid-template-columns: 250px 1fr 50px;
		grid-template-rows: 60px 1fr;
		grid-template-areas:
			'header header header'
			'nav-menu content additional';
		max-height: 100vh;
		position: relative;
		padding-bottom: 20px;
		transform: scale(1);
		transform-origin: top left;
	}

	@media (max-width: 1200px) {
		.main-container {
			transform: scale(0.9);
		}
	}

	@media (max-width: 992px) {
		.main-container {
			transform: scale(0.8);
		}
	}

	@media (max-width: 768px) {
		.main-container {
			transform: scale(0.7);
		}
	}

	@media (max-width: 576px) {
		.main-container {
			transform: scale(0.6);
		}
	}
</style>
