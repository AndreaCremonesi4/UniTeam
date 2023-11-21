export async function getGruppiWithCount(supabase, filtroNome, filtroVisibilita, page, pageSize) {
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

	let query = supabase
		.from('gruppi')
		.select('*', { count: 'exact' })
		.ilike('nome', filtroNome ? `%${filtroNome}%` : '%*%')
		.range(page * pageSize, page * pageSize + pageSize - 1)
		.order('nome', { ascending: true });

	if (filtroVisibilita !== undefined) query = query.eq('privato', filtroVisibilita);

	return query;
}

export function addGruppo(supabase, nome, descrizione, privato) {
	if (!supabase || !nome || !descrizione) return { error: "Errore nell'inserimento dei parametri" };

	return supabase.from('gruppi').insert({ nome, descrizione, privato }).select().single();
}
