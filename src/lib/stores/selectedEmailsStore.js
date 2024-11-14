import { writable } from 'svelte/store';

// holds the IDs of the emails selected by the user using the checkboxes
export const selectedEmails = writable([]);
