<script>
	import '../global.css';
	import Header from '../lib/components/header/Header.svelte';
	import NavMenu from '../lib/components/navMenu/NavMenu.svelte';
</script>

<div class="main-container">
	<Header />
	<NavMenu />
	<slot></slot>
</div>

<style>
	.main-container {
		display: grid;
		grid-template-columns: 250px 1fr 50px;
		grid-template-rows: 60px 1fr;
		grid-template-areas:
			'header header header'
			'nav-menu content additional';
		max-height: 100vh;
	}
</style>
