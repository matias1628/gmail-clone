import { writable } from 'svelte/store';

// holds the value of the search query used to look for text in the emails
export const searchQuery = writable('');
