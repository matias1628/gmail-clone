import { writable } from 'svelte/store';

// flag that controls the visibility of the write email form
export const showWriteEmail = writable(false);

// when user opens a draft email the email's data is saved here to make it
// accessible across the application
export const draftData = writable(null);
