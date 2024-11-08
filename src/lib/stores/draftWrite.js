import { writable } from 'svelte/store';

export const showWriteEmail = writable(false);
export const draftData = writable(null);
