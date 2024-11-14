<!-- This component represents a single link in the navigation menu 
     Exports:
	 - icon: the name of the displayed icon
	 - title: the name of the link itself
	 - category: the email category the link leads to
	 - count: the number of items in the specific category -->

<script>
	export let icon;
	export let title;
	export let category;
	export let count = 0;
</script>

<a href={`/${category}`} class="nav-link-container">
	<span class="material-symbols-outlined link-icon">{icon}</span>
	<span class="link-title">{title}</span>
	{#if count > 0}
		<span class="link-count">{count}</span>
	{/if}
</a>

<style>
	.nav-link-container {
		display: flex;
		align-items: center;
		padding: 0.4rem 0;
		border-top-right-radius: 40px;
		border-bottom-right-radius: 40px;
		cursor: pointer;
		text-decoration: none;
	}

	.nav-link-container:hover {
		background-color: #eaebef;
	}

	.link-icon {
		font-size: 1.3rem;
		color: rgb(32, 33, 36);
		margin-left: 30px;
		margin-right: 15px;
	}

	.link-title {
		font-size: 0.875rem;
		color: rgb(32, 33, 36);
	}

	.link-count {
		font-size: 0.75rem;
		color: rgb(95, 99, 104);
		margin-left: auto;
		margin-right: 10px;
	}
</style>
