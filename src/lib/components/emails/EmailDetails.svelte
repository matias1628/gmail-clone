<script>
	import UserAvatar from '../header/UserAvatar.svelte';

	export let email;

	function formatDate(isoString) {
		const date = new Date(isoString); // Parse the ISO string into a Date object

		const daysOfWeek = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
		const monthsOfYear = [
			'gen',
			'feb',
			'mar',
			'apr',
			'mag',
			'giu',
			'lug',
			'ago',
			'set',
			'ott',
			'nov',
			'dic'
		];

		const dayOfWeek = daysOfWeek[date.getDay()];
		const dayOfMonth = date.getDate();
		const month = monthsOfYear[date.getMonth()];
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${dayOfWeek} ${dayOfMonth} ${month}, ${hours}:${minutes}`;
	}
</script>

<div class="email-details-container">
	<div class="details-header">
		<button
			class="go-back-button"
			on:click={() => {
				history.back();
			}}
		>
			<span class="material-symbols-outlined"> arrow_back </span>
		</button>
	</div>
	<div class="details-body">
		<div class="email-subject-container">
			<h2 class="email-subject">{email.subject}</h2>
		</div>
		<div class="avatar-wrapper">
			<UserAvatar />
		</div>
		<div class="email-info-container">
			<div class="top-info">
				<span class="email-sender">{email.sender}</span>
				<span class="email-date">{formatDate(email.date)}</span>
			</div>
			<div class="email-receiver">a me ▾</div>
		</div>
		<div class="email-body-container">
			<p class="email-body">{email.body}</p>
		</div>
		<div class="email-attachments-container">
			{#if email.attachments && email.attachments.length > 0}
				<p>Attachments:</p>
				<ul>
					{#each email.attachments as attachment}
						<li>
							<a href={attachment.content} download={attachment.name} type={attachment.type}
								>{attachment.name}</a
							>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>

<style>
	.email-details-container {
		border-radius: 20px;
		overflow: hidden;
		padding: 10px;
		background-color: white;
		display: flex;
		flex-direction: column;
		min-height: 80vh;
	}

	.details-header {
		display: flex;
		align-items: center;
	}

	.go-back-button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		height: 40px;
		width: 40px;
	}

	.go-back-button:hover {
		background-color: #e8eaed;
	}

	.go-back-button .material-symbols-outlined {
		font-size: 1.3rem;
		color: #444746;
	}

	.details-body {
		display: grid;
		grid-template-columns: 80px 1fr;
		grid-template-rows: auto auto 1fr auto;
	}

	.email-subject-container {
		grid-row: 1;
		grid-column: 2;
	}

	.email-subject {
		font-size: 1.375rem;
		color: #1f1f1f;
		font-weight: 400;
	}

	.avatar-wrapper {
		grid-row: 2;
		grid-column: 1 / 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.email-info-container {
		grid-row: 2;
		grid-column: 2 / 3;
		display: flex;
		flex-direction: column;
	}

	.top-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.email-sender {
		color: #1f1f1f;
		font-weight: bold;
		font-size: 0.9rem;
	}

	.email-date,
	.email-receiver {
		font-size: 0.8rem;
		color: #5e5e5e;
	}

	.email-date {
		margin-right: 30px;
	}

	.email-body-container {
		grid-row: 3;
		grid-column: 2;
		padding-top: 30px;
	}

	.email-body {
		max-width: 1000px;
		color: #222;
		direction: ltr;
		font-size: 1rem;
		/* font-weight: 300;
		font-family: Arial, Helvetica, sans-serif; */
		font:
			small / 1.5 Arial,
			Helvetica,
			sans-serif;
		line-height: 1.38;
		font-size: 11pt;
	}

	.email-attachments-container {
		grid-row: 4;
		grid-column: 2;
	}
</style>
