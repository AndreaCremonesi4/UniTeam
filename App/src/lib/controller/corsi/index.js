export async function getAnni(supabase) {
	const { data } = await supabase.rpc('get_distinct_values', {
		column_name: 'anno_full',
		table_name: 'corsi'
	});

	return data.map((el) => {
		return { value: el, label: el };
	});
}

export async function getFacolta(supabase) {
	const { data } = await supabase.rpc('get_distinct_values', {
		column_name: 'facolta',
		table_name: 'corsi'
	});

	return data.map((el) => {
		return { value: el, label: el };
	});
}

export async function getCorsiWithCount(
	supabase,
	inputNome,
	inputAnno,
	inputFacolta,
	page,
	pageSize
) {
	const { data, count } = await supabase
		.from('corsi')
		.select('*', { count: 'exact' })
		.or(
			`nome.ilike.${inputNome ? `%${inputNome}%` : '%*%'},codice.ilike.${
				inputNome ? `%${inputNome}%` : '%*%'
			}`
		)
		.ilike('anno_full', inputAnno ? `%${inputAnno}%` : '%*%')
		.ilike('facolta', inputFacolta ? `%${inputFacolta}%` : '%*%')
		.range(page * pageSize, page * pageSize + pageSize - 1)
		.order('nome', { ascending: true });

	return { data, count };
}
