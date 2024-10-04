<script>
	import Email from './Email.svelte';

	let emails = [
		{
			sender: 'John Doe',
			subject: 'Project Update',
			date: new Date('2024-09-28'),
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			sender: 'Jane Smith',
			subject: 'Meeting Reminder',
			date: new Date('2024-09-29'),
			body: 'Don’t forget about our meeting tomorrow at 10 AM. Please review the agenda beforehand.'
		},
		{
			sender: 'Marketing Team',
			subject: 'Upcoming Webinar',
			date: new Date('2024-09-30'),
			body: 'Join us for a webinar on best practices in customer engagement. Register now!'
		},
		{
			sender: 'HR Department',
			subject: 'Annual Leave Policy Update',
			date: new Date('2024-09-26'),
			body: 'Please review the updated annual leave policy effective from next month.'
		},
		{
			sender: 'Tech Support',
			subject: 'System Downtime',
			date: new Date('2024-09-27'),
			body: 'We will have scheduled system downtime on Friday from 2 AM to 6 AM. Please save your work in advance.'
		},
		{
			sender: 'John Doe',
			subject: 'Project Update',
			date: new Date('2024-09-28'),
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			sender: 'Jane Smith',
			subject: 'Meeting Reminder',
			date: new Date('2024-09-29'),
			body: 'Don’t forget about our meeting tomorrow at 10 AM. Please review the agenda beforehand.'
		},
		{
			sender: 'Marketing Team',
			subject: 'Upcoming Webinar',
			date: new Date('2024-09-30'),
			body: 'Join us for a webinar on best practices in customer engagement. Register now!'
		},
		{
			sender: 'HR Department',
			subject: 'Annual Leave Policy Update',
			date: new Date('2024-09-26'),
			body: 'Please review the updated annual leave policy effective from next month.'
		},
		{
			sender: 'Tech Support',
			subject: 'System Downtime',
			date: new Date('2024-09-27'),
			body: 'We will have scheduled system downtime on Friday from 2 AM to 6 AM. Please save your work in advance.'
		},
		{
			sender: 'John Doe',
			subject: 'Project Update',
			date: new Date('2024-09-28'),
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			sender: 'Jane Smith',
			subject: 'Meeting Reminder',
			date: new Date('2024-09-29'),
			body: 'Don’t forget about our meeting tomorrow at 10 AM. Please review the agenda beforehand.'
		},
		{
			sender: 'John Doe',
			subject: 'Project Update',
			date: new Date('2024-09-28'),
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			sender: 'Jane Smith',
			subject: 'Meeting Reminder',
			date: new Date('2024-09-29'),
			body: 'Don’t forget about our meeting tomorrow at 10 AM. Please review the agenda beforehand.'
		},
		{
			sender: 'Marketing Team',
			subject: 'Upcoming Webinar',
			date: new Date('2024-09-30'),
			body: 'Join us for a webinar on best practices in customer engagement. Register now!'
		},
		{
			sender: 'HR Department',
			subject: 'Annual Leave Policy Update',
			date: new Date('2024-09-26'),
			body: 'Please review the updated annual leave policy effective from next month.'
		},
		{
			sender: 'Tech Support',
			subject: 'System Downtime',
			date: new Date('2024-09-27'),
			body: 'We will have scheduled system downtime on Friday from 2 AM to 6 AM. Please save your work in advance.'
		},
		{
			sender: 'John Doe',
			subject: 'Project Update',
			date: new Date('2024-09-28'),
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			sender: 'Jane Smith',
			subject: 'Meeting Reminder',
			date: new Date('2024-09-29'),
			body: 'Don’t forget about our meeting tomorrow at 10 AM. Please review the agenda beforehand.'
		}
	];
</script>

<section>
	<div class="email-section-header">
		<!-- Checkbox for selecting emails -->
		<input type="checkbox" id="select-all-emails" aria-label="Select all emails" />

		<!-- Dropdown button -->
		<button aria-label="Open dropdown" class="icon-button">
			<span class="material-symbols-outlined">arrow_drop_down</span>
		</button>

		<!-- Refresh button -->
		<button aria-label="Refresh emails" class="icon-button">
			<span class="material-symbols-outlined">refresh</span>
		</button>

		<!-- More options button -->
		<button aria-label="More options" class="icon-button">
			<span class="material-symbols-outlined">more_vert</span>
		</button>
	</div>
	<div class="email-section-body">
		{#each emails as email}
			<Email {email} />
		{/each}
	</div>
	<div class="email-section-footer">
		<span>Termini · Privacy · Norme del programma</span>
	</div>
</section>

<style>
	section {
		border-radius: 20px;
		overflow: hidden;
		grid-area: content;
		display: flex;
		flex-direction: column;
	}

	.email-section-header {
		display: flex;
		background-color: white;
		padding: 15px 20px;
	}

	.icon-button {
		border: none;
		background-color: transparent;
		cursor: pointer;
		height: 40px;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.icon-button:hover {
		background-color: #eaebef;
	}

	.icon-button .material-symbols-outlined {
		font-size: 1.25rem;
	}

	.email-section-body {
		max-height: 800px;
		overflow-y: scroll;
		flex-grow: 1;
	}

	.email-section-body:last-child {
		border-bottom: none;
	}

	.email-section-footer {
		background-color: white;
		padding: 25px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.email-section-footer span {
		color: #666666;
		font-size: 12px;
	}

	/* scrollbar stuff */
	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-button {
		width: 0;
		height: 0;
		display: none;
	}

	::-webkit-scrollbar-corner {
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		-webkit-box-shadow:
			inset 1px 1px 0px rgba(0, 0, 0, 0.1),
			inset 0px -1px 0px rgba(0, 0, 0, 0.07);
	}
</style>
