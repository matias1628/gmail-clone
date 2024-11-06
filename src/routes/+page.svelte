<script>
	import { createEventDispatcher } from 'svelte';
	import EmailsSection from '../lib/components/emails/EmailsSection.svelte';

	const dispatch = createEventDispatcher();

	// Forward the openWriteEmail event to layout
	function handleOpenWriteEmail(event) {
		dispatch('openWriteEmail', event.detail);
	}
</script>

<!-- Listen for the custom event and re-dispatch it -->
<EmailsSection category="inbox" on:openWriteEmail={handleOpenWriteEmail} />
