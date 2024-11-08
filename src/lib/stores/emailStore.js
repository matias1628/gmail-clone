// src/lib/stores/emailStore.js
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

// Check if there's existing data in localStorage
const storedEmails =
	browser && localStorage.getItem('emailData')
		? JSON.parse(localStorage.getItem('emailData'))
		: defaultEmails;

console.log('Initializing emailStore with data:', storedEmails);

const emailStore = writable(storedEmails);

// Subscribe to the store to save changes to localStorage
emailStore.subscribe((value) => {
	if (browser) {
		console.log('Updating localStorage with:', value);
		localStorage.setItem('emailData', JSON.stringify(value));
	}
});

export default emailStore;
