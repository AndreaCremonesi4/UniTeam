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

export function getProfessoreById(supabase, id) {
	if (!supabase || !id) return { error: "Errore nell'inserimento dei parametri" };
	return supabase.from('professori').select('*').eq('id', id).single();
}

export async function getRecensioniProfessore(supabase, id) {
	if (!supabase || !id) return { error: "Errore nell'inserimento dei parametri" };
	return supabase
		.from('recensioni_professori')
		.select(
			`
			id,
			valutazione,
			descrizione,
			data_modifica,
			profiles (
				username
			)
		`
		)
		.eq('id_professore', id);
}

export async function getRecensioneProfessoreUtente(supabase, id_profilo, id_professore) {
	if (!supabase || !id_profilo || !id_professore)
		return { error: "Errore nell'inserimento dei parametri" };
	return supabase
		.from('recensioni_professori')
		.select('*')
		.match({ id_profilo, id_professore })
		.single();
}

export function addRecensioneProfessore(supabase, dataRecensione, id_professore, id_profilo) {
	if (!dataRecensione || !id_professore || !id_profilo)
		return { error: "Errore nell'inserimento dei parametri" };

	return supabase
		.from('recensioni_professori')
		.upsert({ ...dataRecensione, id_professore, id_profilo });
}
