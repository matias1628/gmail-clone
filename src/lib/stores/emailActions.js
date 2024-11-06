import { read } from '$app/server';
import emailStore from './emailStore';
import { get } from 'svelte/store';

export function updateEmailStore(updatedEmails) {
	emailStore.update((emails) => ({ ...emails, ...updatedEmails }));
}

export function createEmail(receiver, subject = 'No Subject', body = '') {
	const currentDate = new Date().toISOString();
	return {
		id: crypto.randomUUID(), // Generate unique ID for the email
		sender: 'default Sender',
		receiver,
		subject,
		body,
		favourite: false, // Not a favorite by default
		archived: false, // Not archived by default
		draft: false, // Not a draft (unless explicitly set)
		sent: false, // Not sent yet (used for drafts)
		date: currentDate
	};
}

export function addEmail(email) {
	const emails = get(emailStore);

	// Add the email object directly to the inbox
	emails.inbox.push(email);

	updateEmailStore({ inbox: emails.inbox });
}

export function deleteEmail(emailId, category) {
	const emails = get(emailStore);
	const updatedCategory = emails[category].filter((email) => email.id != emailId);
	updateEmailStore({ [category]: updatedCategory });
}

export function toggleReadStatus(emailId) {
	const emails = get(emailStore);
	const updatedInbox = emails.inbox.map((email) =>
		email.id === emailId ? { ...email, read: !email.read } : email
	);
	updateEmailStore({ inbox: updatedInbox });
}

export function toggleFavourite(emailId) {
	const emails = get(emailStore);
	const email = emails.inbox.find((email) => email.id === emailId);
	if (email) {
		email.favourite = !email.favourite;
		const updatedFavourites = email.favourite
			? [...emails.favourites, email]
			: emails.favourites.filter((fav) => fav.id !== emailId);
		updateEmailStore({
			favourites: updatedFavourites,
			inbox: emails.inbox
		});
	}
}

export function saveDraft(receiver, subject, body) {
	const emails = get(emailStore);

	// Use createEmail and mark as draft
	const draftEmail = createEmail(receiver, subject, body);
	draftEmail.draft = true; // Mark as a draft email

	// Add to drafts
	emails.drafts.push(draftEmail);

	updateEmailStore({ drafts: emails.drafts });
}

export function archiveEmail(emailId) {
	const emails = get(emailStore);
	const email = emails.inbox.find((email) => email.id === emailId);
	if (email) {
		email.archived = true;
		emails.archived.push(email);
		const updatedInbox = emails.inbox.filter((e) => e.id !== emailId);
		updateEmailStore({ archived: emails.archived, inbox: updatedInbox });
	}
}
