<script>
    export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

    console.log(data.session.user);
</script>