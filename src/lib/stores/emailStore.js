import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultEmails = {
	inbox: [],
	drafts: [],
	favourites: []
};

// Check if there's existing data in localStorage
const storedEmails =
	browser && localStorage.getItem('emailData')
		? JSON.parse(localStorage.getItem('emailData'))
		: defaultEmails;

const emailStore = writable(storedEmails);

// Subscribe to the store to save changes to localStorage
emailStore.subscribe((value) => {
	if (browser) {
		localStorage.setItem('emailData', JSON.stringify(value));
	}
});

export default emailStore;
