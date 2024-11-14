<!-- A simple reusable user logo -->

<!-- svelte-ignore a11y-invalid-attribute -->
<a href="#">
	<img src="http://unsplash.it/35/35/?gravity=center" alt="Profile" />
</a>

<style>
	a {
		grid-area: user-avatar;
		justify-self: center;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		height: 35px;
		width: 35px;
		padding: 0.2rem;
	}

	a:hover {
		background-color: #e8eaed;
	}

	img {
		border-radius: 50%;
	}
</style>
