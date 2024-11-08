import emailStore from './emailStore';
import { get } from 'svelte/store';

async function readFileAsBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve({ name: file.name, type: file.type, content: reader.result });
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
}

export function updateEmailStore(updatedEmails) {
	emailStore.update((emails) => ({ ...emails, ...updatedEmails }));
}

export async function createEmail(receiver, subject = 'No Subject', body = '', attachments = []) {
	const currentDate = new Date().toISOString();
	const base64Attachments = await Promise.all(attachments.map((file) => readFileAsBase64(file)));

	return {
		id: crypto.randomUUID(),
		sender: 'default Sender',
		receiver,
		subject,
		body,
		attachments: base64Attachments,
		favourite: false,
		archived: false,
		draft: false,
		sent: false,
		date: currentDate
	};
}

export function addEmail(email) {
	const emails = get(emailStore);

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

export async function saveDraft(receiver, subject, body, attachments, existingDraftId = null) {
	const emails = get(emailStore);

	// Convert attachments to Base64 if they are new files
	const base64Attachments = await Promise.all(
		attachments.map(async (file) => {
			// If it's already in base64, keep it as is; otherwise, convert it
			if (file.content && file.name && file.type) {
				return file;
			} else {
				return await readFileAsBase64(file);
			}
		})
	);

	// If an existing draft ID is provided, update that draft
	if (existingDraftId) {
		const draftIndex = emails.drafts.findIndex((draft) => draft.id === existingDraftId);
		if (draftIndex !== -1) {
			// Update the draft in place
			emails.drafts[draftIndex] = {
				...emails.drafts[draftIndex],
				receiver,
				subject,
				body,
				attachments: base64Attachments,
				date: new Date().toISOString() // update date to reflect last edit time
			};
			updateEmailStore({ drafts: emails.drafts });
			return;
		}
	}

	// If no existing draft, create a new one
	const draftEmail = await createEmail(receiver, subject, body, attachments);
	draftEmail.draft = true;
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
