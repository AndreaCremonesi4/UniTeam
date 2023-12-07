import { checkTextValidity } from '../utilities';

export async function getAnni(supabase) {
	if (!supabase) return { error: new Error("Errore nell'inserimento dei parametri") };

	const { data } = await supabase.rpc('get_distinct_values', {
		column_name: 'anno_full',
		table_name: 'corsi'
	});

	return data.map((el) => {
		return { value: el, label: el };
	});
}

export async function getFacolta(supabase) {
	if (!supabase) return { error: new Error("Errore nell'inserimento dei parametri") };

	const { data } = await supabase.rpc('get_distinct_values', {
		column_name: 'facolta',
		table_name: 'corsi'
	});

	return data.map((el) => {
		return { value: el, label: el };
	});
}

export function getCorsiWithCount(supabase, filtroNome, filtroAnno, filtroFacolta, page, pageSize) {
	if (
		!supabase ||
		page < 0 ||
		page === null ||
		page === undefined ||
		pageSize < 1 ||
		pageSize === null ||
		pageSize === undefined
	)
		return { data: undefined, error: new Error("Errore nell'inserimento dei parametri") };

	return supabase
		.from('corsi')
		.select('*', { count: 'exact' })
		.or(
			`nome.ilike.${filtroNome ? `%${filtroNome}%` : '%*%'},codice.ilike.${
				filtroNome ? `%${filtroNome}%` : '%*%'
			}`
		)
		.ilike('anno_full', filtroAnno ? `%${filtroAnno}%` : '%*%')
		.ilike('facolta', filtroFacolta ? `%${filtroFacolta}%` : '%*%')
		.range(page * pageSize, page * pageSize + pageSize - 1)
		.order('nome', { ascending: true });
}

export function getCorsoById(supabase, id) {
	if (!supabase || !id) return { error: new Error("Errore nell'inserimento dei parametri") };
	return supabase.from('corsi').select('*').eq('id', id).single();
}

export function getRecensioniCorso(supabase, id, range) {
	if (!supabase || !id || !range || range.min < 0 || range.max < range.min)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase
		.from('recensioni_corsi')
		.select('*,profiles (username)')
		.eq('id_corso', id)
		.range(range.min, range.max);
}

export function getRecensioneCorsoUtente(supabase, id_profilo, id_corso) {
	if (!supabase || !id_profilo || !id_corso)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase.from('recensioni_corsi').select('*').match({ id_profilo, id_corso }).single();
}

export function addRecensioneCorso(supabase, dataRecensione, id_corso, id_profilo) {
	if (!dataRecensione || !id_corso || !id_profilo)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	if (!checkTextValidity(dataRecensione.descrizione))
		return { error: new Error('La recensione contiene parole volgari') };

	return supabase.from('recensioni_corsi').upsert({ ...dataRecensione, id_corso, id_profilo });
}
