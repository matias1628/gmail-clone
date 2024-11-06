import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultEmails = {
	inbox: [],
	sent: [],
	drafts: [],
	archived: [],
	favourites: [],
	postponed: []
};

const storedEmails =
	browser && localStorage.getItem('emailData')
		? JSON.parse(localStorage.getItem('emailData'))
		: defaultEmails;

const emailStore = writable(storedEmails);

emailStore.subscribe((value) => {
	if (browser) {
		// Check if inbox is empty before updating localStorage
		if (!localStorage.getItem('emailData') || value.inbox.length === 0) {
			localStorage.setItem('emailData', JSON.stringify(defaultEmails));
		} else {
			localStorage.setItem('emailData', JSON.stringify(value));
		}
	}
});

export default emailStore;
