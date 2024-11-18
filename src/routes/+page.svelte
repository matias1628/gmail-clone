<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import emailStore from '$lib/stores/emailStore.js';
	import emailUsers from '$lib/stores/usersStore.js';
	import EmailsSection from '../lib/components/emails/EmailsSection.svelte';

	const dispatch = createEventDispatcher();

	let users = [];

	// adds some default emails to the page only if no pre-existing email data is found in the local storage
	// email senders are fetched using an api
	onMount(async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/users');
		users = response.ok ? await response.json() : [];
		emailUsers.set(users);

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
							body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
							date: new Date().toISOString()
						};
					}),
					sent: [],
					drafts: [],
					archived: [],
					favourites: []
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
