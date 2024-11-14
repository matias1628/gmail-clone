<script>
	// This component is responsable of getting the email data from the store and
	// passing it down to the EmailDetails component
	// Exports:
	// - category: the category in which the user is currently navigating

	import { page } from '$app/stores';
	import emailStore from '$lib/stores/emailStore';
	import EmailDetails from '$lib/components/emails/EmailDetails.svelte';

	export let category;

	let emailId;
	let email;

	// Reactive statement that updates the `emailId` whenever the page parameters change
	// `$page.params` contains the current URL parameters
	// when an email's detail page is opened the URL will contain the email's id.
	$: ({ emailId } = $page.params);

	// This block is supposed to run whenever emailId changes, it subscribes to the store and
	// gets the data of the new email
	$: if (category && emailId) {
		emailStore.subscribe((store) => {
			email = store[category]?.find((e) => e.id === emailId) || {};
		});
	}
</script>

<EmailDetails {email} />
