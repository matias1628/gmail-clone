<script>
	import UserAvatar from '../header/UserAvatar.svelte';

	export let email;
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
		<div class="email-info-container">
			<UserAvatar />
			<span>{email.sender}</span>
			<span>{email.date}</span>
		</div>
		<div class="email-body-container">
			<p>{email.body}</p>
		</div>
		<div class="email-attachments-container">
			<!-- {#each email.attachments as attachment}
					<div class="attachment-container"></div>
				{/each} -->
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
		grid-template-columns: 60px 1fr;
		grid-template-rows: 70px 40px 1fr auto;
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

	.email-info-container {
		grid-row: 2;
		grid-column: 1 / 3;
		display: flex;
		align-items: center;
	}

	.email-body-container {
		grid-row: 3;
		grid-column: 2;
	}

	.email-attachments-container {
		grid-row: 4;
		grid-column: 2;
	}
</style>
