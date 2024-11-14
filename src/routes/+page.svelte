<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import emailStore from '$lib/stores/emailStore';
	import EmailsSection from '../lib/components/emails/EmailsSection.svelte';

	const dispatch = createEventDispatcher();

	let users = [];

	// adds some default emails to the page only if no pre-existing email data is found in the local storage
	// email senders are fetched using an api
	onMount(async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/users');
		users = response.ok ? await response.json() : [];

		if (users.length > 0) {
			const existingData = localStorage.getItem('emailData');
			const parsedData = existingData ? JSON.parse(existingData) : null;

			if (!parsedData || parsedData.inbox.length === 0) {
				const getRandomUser = () => users[Math.floor(Math.random() * users.length)];

				const defaultEmails = {
					inbox: Array.from({ length: 16 }, () => {
						const user = getRandomUser();
						return {
							id: crypto.randomUUID(),
							sender: user.name,
							subject: 'Welcome!',
							body: 'This is a sample email in your inbox.',
							date: new Date().toISOString()
						};
					}),
					sent: [],
					drafts: [],
					archived: [],
					favourites: [],
					postponed: []
				};

				localStorage.setItem('emailData', JSON.stringify(defaultEmails));
				emailStore.set(defaultEmails);
			} else {
				emailStore.set(parsedData);
			}
		}
	});

	function handleOpenWriteEmail(event) {
		dispatch('openWriteEmail', event.detail);
	}
</script>

<EmailsSection category="inbox" on:openWriteEmail={handleOpenWriteEmail} />
