<script>
	import { page } from '$app/stores';
	import emailStore from '$lib/stores/emailStore';
	import EmailDetails from '$lib/components/emails/EmailDetails.svelte';

	export let category; // Accepts the category as a prop (e.g., 'inbox', 'sent', 'drafts')

	let emailId;
	$: ({ emailId } = $page.params);

	let email;
	$: if (category && emailId) {
		emailStore.subscribe((store) => {
			email = store[category]?.find((e) => e.id === emailId) || {};
		});
	}
</script>

<EmailDetails {email} />
