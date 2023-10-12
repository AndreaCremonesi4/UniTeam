<script>
	await supabase.auth.resetPasswordForEmail('hello@example.com', {
		redirectTo: 'http://example.com/account/update-password'
	});

	await supabase.auth.updateUser({ password: new_password });
</script>
