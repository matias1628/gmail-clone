<script>
	// This component represents the header on top of all pages

	import LogoSection from './LogoSection.svelte';
	import SearchBar from './SearchBar.svelte';
	import QuickActions from './QuickActions.svelte';
	import UserAvatar from '../reusable/UserAvatar.svelte';
</script>

<header>
	<LogoSection />
	<SearchBar />
	<QuickActions />
	<UserAvatar />
</header>

<style>
	header {
		display: grid;
		grid-template-columns: 250px 1fr 150px 50px;
		grid-template-areas: 'logo-section searchbar quick-actions user-avatar';
		align-items: center;
		grid-area: header;
	}
</style>
