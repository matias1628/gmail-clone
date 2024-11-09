<script>
	import { onMount } from 'svelte';
	import emailStore from '$lib/stores/emailStore';
	import EmailsSection from '../lib/components/emails/EmailsSection.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let users = []; // Initialize users array

	// Fetch users only on the client side using onMount
	onMount(async () => {
		console.log('Fetching users on client side...');
		const response = await fetch('https://jsonplaceholder.typicode.com/users');
		users = (await response.ok) ? await response.json() : [];
		console.log('Fetched users:', users); // Check if users were fetched successfully

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

				console.log('Storing default emails in localStorage:', defaultEmails); // Debugging line
				localStorage.setItem('emailData', JSON.stringify(defaultEmails));
				emailStore.set(defaultEmails);
			} else {
				console.log('Using existing emails from localStorage:', parsedData); // Debugging line
				emailStore.set(parsedData);
			}
		}
	});

	function handleOpenWriteEmail(event) {
		dispatch('openWriteEmail', event.detail);
	}
</script>

<EmailsSection category="inbox" on:openWriteEmail={handleOpenWriteEmail} />
