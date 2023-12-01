import { checkTextValidity } from '../utilities';

export async function getRuoli(supabase) {
	if (!supabase) return { error: new Error("Errore nell'inserimento dei parametri") };
	const { data } = await supabase.rpc('get_distinct_values', {
		column_name: 'ruolo',
		table_name: 'professori'
	});

	return data.map((el) => {
		return { value: el, label: el };
	});
}

export async function getStrutture(supabase) {
	if (!supabase) return { error: new Error("Errore nell'inserimento dei parametri") };

	const { data } = await supabase.rpc('get_distinct_values', {
		column_name: 'struttura',
		table_name: 'professori'
	});

	return data.map((el) => {
		return { value: el, label: el };
	});
}

export function getProfessoriWithCount(
	supabase,
	filtroNome,
	filtroRuolo,
	filtroStruttura,
	page,
	pageSize
) {
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
		.from('professori')
		.select('*', { count: 'exact' })
		.ilike('nome', filtroNome ? `%${filtroNome}%` : '%*%')
		.ilike('ruolo', filtroRuolo ? `%${filtroRuolo}%` : '%*%')
		.ilike('struttura', filtroStruttura ? `%${filtroStruttura}%` : '%*%')
		.range(page * pageSize, page * pageSize + pageSize - 1)
		.order('nome', { ascending: true });
}

export function getProfessoreById(supabase, id) {
	if (!supabase || !id) return { error: new Error("Errore nell'inserimento dei parametri") };
	return supabase.from('professori').select('*').eq('id', id).single();
}

export function getRecensioniProfessore(supabase, id, range) {
	if (!supabase || !id || !range)
		return { error: new Error("Errore nell'inserimento dei parametri") };
	return supabase
		.from('recensioni_professori')
		.select('*, profiles (username)')
		.eq('id_professore', id)
		.range(range.min, range.max);
}

export function getRecensioneProfessoreUtente(supabase, id_profilo, id_professore) {
	if (!supabase || !id_profilo || !id_professore)
		return { error: new Error("Errore nell'inserimento dei parametri") };
	return supabase
		.from('recensioni_professori')
		.select('*')
		.match({ id_profilo, id_professore })
		.single();
}

export function addRecensioneProfessore(supabase, dataRecensione, id_professore, id_profilo) {
	if (!dataRecensione || !id_professore || !id_profilo)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	if (!checkTextValidity(dataRecensione.descrizione))
		return { error: new Error('La recensione contiene parole volgari') };

	return supabase
		.from('recensioni_professori')
		.upsert({ ...dataRecensione, id_professore, id_profilo });
}
