import emailStore from './emailStore';
import emailUsers from './usersStore';
import { get } from 'svelte/store';

// Helper function to read a file as base64 encoded data
async function readFileAsBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve({ name: file.name, type: file.type, content: reader.result });
		reader.onerror = (error) => reject(error);
		reader.readAsDataURL(file);
	});
}

// Updates the email store with the provided changes
export function updateEmailStore(updatedEmails) {
	emailStore.update((emails) => ({ ...emails, ...updatedEmails }));
}

// Creates a new email object with default properties
export async function createEmail(receiver, subject = 'No Subject', body = '', attachments = []) {
	const currentDate = new Date().toISOString();

	const users = get(emailUsers);
	const getRandomUser = () => users[Math.floor(Math.random() * users.length)];
	const randomSender = users.length > 0 ? getRandomUser().name : 'Default Sender';

	// Ensure attachments are base64 encoded if they aren't already
	const base64Attachments = await Promise.all(
		attachments.map(async (file) => {
			// Skip the conversion if the file already has base64 content
			if (file.content && file.name && file.type) {
				return file; // Already base64-encoded
			} else {
				return await readFileAsBase64(file); // Convert to base64
			}
		})
	);

	return {
		id: crypto.randomUUID(),
		sender: randomSender,
		receiver,
		subject,
		body,
		attachments: base64Attachments,
		favourite: false,
		draft: false,
		date: currentDate
	};
}

// Adds an email object to the inbox category in the email store
export function addEmail(email) {
	const emails = get(emailStore);

	emails.inbox.push(email);

	updateEmailStore({ inbox: emails.inbox });
}

// Deletes an email from a specific category based on its ID
export function deleteEmail(emailId, category) {
	const emails = get(emailStore);
	const updatedCategory = emails[category].filter((email) => email.id != emailId);
	updateEmailStore({ [category]: updatedCategory });
}

// Toggles the read status of an email identified by its ID
export function toggleReadStatus(emailId) {
	const emails = get(emailStore);
	const updatedInbox = emails.inbox.map((email) =>
		email.id === emailId ? { ...email, read: !email.read } : email
	);
	updateEmailStore({ inbox: updatedInbox });
}

// Toggles the favourite status of an email and updates favourites list
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

// Saves a draft email, handling existing drafts and new ones
export async function saveDraft(receiver, subject, body, attachments, existingDraftId = null) {
	const emails = get(emailStore);

	// Convert attachments to Base64 if they are new files
	const base64Attachments = await Promise.all(
		attachments.map(async (file) => {
			if (file.content && file.name && file.type) {
				// Already base64-encoded, so return as is
				return file;
			} else {
				// New file: convert to Base64
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

// Marks an email as "seen" based on its ID
export function markEmailAsSeen(emailId) {
	const emails = get(emailStore);

	const emailIndex = emails.inbox.findIndex((email) => email.id === emailId);
	if (emailIndex !== -1) {
		emails.inbox[emailIndex] = {
			...emails.inbox[emailIndex],
			seen: true
		};

		updateEmailStore({ inbox: emails.inbox });
	}
}
