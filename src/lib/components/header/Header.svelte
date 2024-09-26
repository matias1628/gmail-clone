<script>
	import LogoSection from './LogoSection.svelte';
	import SearchBar from './SearchBar.svelte';
	import QuickActions from './QuickActions.svelte';
	import UserAvatar from './UserAvatar.svelte';
</script>

<header>
	<LogoSection />
	<SearchBar />
	<QuickActions />
	<UserAvatar />
</header>

<style>
	header {
		display: flex;
		gap: 100px;
		align-items: center;
	}
</style>
