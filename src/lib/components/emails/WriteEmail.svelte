<script>
	import { createEventDispatcher } from 'svelte';
	import { createEmail, addEmail, saveDraft } from '$lib/stores/emailActions.js';
	import { draftData } from '$lib/stores/draftWrite.js';
	import { onMount } from 'svelte';

	let receiver = '';
	let subject = '';
	let body = '';
	let sent = false;
	let attachedFiles = []; // Array to store attached files
	let draftId = null;

	onMount(() => {
		if ($draftData?.id) {
			draftId = $draftData.id;
			receiver = $draftData.receiver;
			subject = $draftData.subject;
			body = $draftData.body;
			attachedFiles = $draftData.attachments || [];
		}
	});

	let fileInput;

	const dispatch = createEventDispatcher();

	function resetForm() {
		receiver = '';
		subject = '';
		body = '';
		sent = false;
		attachedFiles = [];
	}

	async function handleCloseForm(event) {
		event.preventDefault();
		if (!sent && (receiver || subject || body || attachedFiles.length > 0)) {
			await saveDraft(receiver, subject, body, attachedFiles, draftId);
		}

		resetForm();
		dispatch('closeForm');
	}

	async function handleSubmit(event) {
		event.preventDefault();

		const newEmail = await createEmail(receiver, subject, body, attachedFiles);
		addEmail(newEmail);

		sent = true;
		handleCloseForm();
	}

	// Handle file selection via input
	function handleFileChange(event) {
		attachedFiles = [...attachedFiles, ...event.target.files];
	}

	// Handle drag-and-drop file upload
	function handleDrop(event) {
		event.preventDefault();
		const files = event.dataTransfer.files;
		attachedFiles = [...attachedFiles, ...files];
	}

	// Prevent default behavior for dragover
	function handleDragOver(event) {
		event.preventDefault();
	}

	// Function to remove a file from the attachment list
	function removeFile(fileName) {
		attachedFiles = attachedFiles.filter((file) => file.name !== fileName);
	}
</script>

<form on:submit={handleSubmit} on:drop={handleDrop} on:dragover={handleDragOver}>
	<div class="form-header">
		<span class="form-header-title">Nuovo messaggio</span>
		<div class="form-window-actions">
			<button class="window-action-button">
				<span class="material-symbols-outlined"> remove </span>
			</button>
			<button class="window-action-button">
				<span class="material-symbols-outlined"> open_in_full </span>
			</button>
			<button class="window-action-button" type="button" on:click={handleCloseForm}>
				<span class="material-symbols-outlined"> close </span>
			</button>
		</div>
	</div>
	<div class="form-body">
		<input type="text" class="receiver-input" placeholder="Destinatario" bind:value={receiver} />
		<input type="text" class="subject-input" placeholder="Oggetto" bind:value={subject} />
		<textarea class="body-textarea" bind:value={body}></textarea>

		<!-- File attachment preview -->
		<div class="file-preview">
			{#if attachedFiles.length > 0}
				<p>Files attached:</p>
				<ul>
					{#each attachedFiles as file (file.name)}
						<li>
							{file.name}
							<button
								type="button"
								on:click={() => removeFile(file.name)}
								class="remove-file-button"
							>
								<span class="material-symbols-outlined close-attachment-icon">close</span>
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="form-footer">
			<button class="send-button" type="submit">Invia</button>
			<div class="email-actions">
				<div class="action-container">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<span class="material-symbols-outlined action-icon" on:click={() => fileInput.click()}
						>attach_file</span
					>
				</div>
				<input
					type="file"
					multiple
					bind:this={fileInput}
					style="display: none;"
					on:change={handleFileChange}
				/>
			</div>
		</div>
	</div>
</form>

<style>
	/* Existing styles */

	form {
		position: absolute;
		bottom: 0;
		right: 120px;
		width: 500px;
		height: 550px;
		background-color: white;
		display: flex;
		flex-direction: column;
		z-index: 100;
		overflow: hidden;
		border-radius: 8px 8px 0 0;
		box-shadow:
			0 8px 10px 1px rgba(0, 0, 0, 0.14),
			0 3px 14px 2px rgba(0, 0, 0, 0.12),
			0 5px 5px -3px rgba(0, 0, 0, 0.2);
	}

	.form-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 16px;
		background-color: #f2f6fc;
	}

	.form-header-title {
		font-size: 0.875rem;
		font-weight: 500;
	}

	.form-window-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 50px;
	}

	.window-action-button {
		padding: 0;
		background-color: transparent;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px;
	}

	.window-action-button:hover {
		background-color: var(--icons-hover-bgcolor);
	}

	.window-action-button span {
		font-variation-settings:
			'FILL' 0,
			'wght' 600,
			'GRAD' 0,
			'opsz' 24;

		font-size: 0.875rem;
		color: rgb(32, 33, 36);
	}

	.form-body {
		display: flex;
		flex-direction: column;
		padding: 0 16px;
		flex-grow: 1;
	}

	.receiver-input,
	.subject-input,
	.body-textarea {
		border: none;
		outline: none;
	}

	.receiver-input,
	.subject-input {
		box-shadow: inset 0 -1px 0 0 rgba(100, 121, 143, 0.12);
		padding: 10px 0;
	}

	.body-textarea {
		flex-grow: 1;
		resize: none;
		padding: 10px 0;
	}

	.form-footer {
		display: flex;
		align-items: center;
		padding: 12px 0 16px;
	}

	.send-button {
		background-color: #0b57d0;
		color: white;
		border: none;
		background-color: #0b57d0;
		cursor: pointer;
		border-radius: 18px;
		padding: 10px 25px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.email-actions {
		margin-left: 15px;
	}

	.action-container {
		height: 25px;
		width: 25px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action-container:hover {
		background-color: var(--icons-hover-bgcolor);
	}

	.action-icon {
		color: #444;
		font-weight: 500;
		font-size: 20px;
	}

	/* Add file preview styles */
	.file-preview {
		margin-top: 10px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #333;
	}

	.file-preview ul {
		list-style: none;
		padding-left: 0;
	}

	.file-preview li {
		margin: 5px 0;
		display: flex;
		align-items: center;
	}

	.remove-file-button {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: #d32f2f;
		margin-left: 10px;
	}

	.remove-file-button:hover {
		color: #b71c1c;
	}

	.close-attachment-icon {
		font-size: 1.3rem;
		display: flex;
	}
</style>
