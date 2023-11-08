export async function getRuoli(supabase) {
	const { data } = await supabase.rpc('get_distinct_values', {
		column_name: 'ruolo',
		table_name: 'professori'
	});

	return data.map((el) => {
		return { value: el, label: el };
	});
}

export async function getStrutture(supabase) {
	const { data } = await supabase.rpc('get_distinct_values', {
		column_name: 'struttura',
		table_name: 'professori'
	});

	return data.map((el) => {
		return { value: el, label: el };
	});
}

export async function getProfessoriWithCount(
	supabase,
	filtroNome,
	filtroRuolo,
	filtroStruttura,
	page,
	pageSize
) {
	const { data, count } = await supabase
		.from('professori')
		.select('*', { count: 'exact' })
		.ilike('nome', filtroNome ? `%${filtroNome}%` : '%*%')
		.ilike('ruolo', filtroRuolo ? `%${filtroRuolo}%` : '%*%')
		.ilike('struttura', filtroStruttura ? `%${filtroStruttura}%` : '%*%')
		.range(page * pageSize, page * pageSize + pageSize - 1)
		.order('nome', { ascending: true });

	return { data, count };
}
