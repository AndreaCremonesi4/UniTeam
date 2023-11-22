export function getGruppoById(supabase, id) {
	if (!supabase || !id?.trim()) return { error: "Errore nell'inserimento dei parametri" };

	id = id.trim();

	return supabase.from('gruppi').select('*, profiles(*)').eq('id', id).single();
}

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
	if (!supabase || !nome?.trim() || !descrizione?.trim())
		return { error: "Errore nell'inserimento dei parametri" };

	nome = nome.trim();
	descrizione = descrizione.trim();

	return supabase.from('gruppi').insert({ nome, descrizione, privato }).select().single();
}

export function getIscrittiGruppo(supabase, id_gruppo) {
	if (!supabase || !id_gruppo?.trim()) return { error: "Errore nell'inserimento dei parametri" };

	id_gruppo = id_gruppo.trim();

	return supabase
		.from('iscrizioni_gruppi')
		.select('*, profiles(*)')
		.eq('id_gruppo', id_gruppo)
		.order('profiles(username)', { ascending: true });
}

export function joinGruppo(supabase, id_gruppo) {
	if (!supabase || !id_gruppo?.trim()) return { error: "Errore nell'inserimento dei parametri" };

	id_gruppo = id_gruppo.trim();

	return supabase.from('iscrizioni_gruppi').insert({ id_gruppo });
}

export async function joinGruppoWithCode(supabase, id_gruppo, codice_ingresso) {
	if (!supabase || !id_gruppo?.trim() || !codice_ingresso?.trim())
		return { error: "Errore nell'inserimento dei parametri" };

	id_gruppo = id_gruppo.trim();
	codice_ingresso = codice_ingresso.trim();

	// verifica se il codice di ingresso è corretto
	const { data: codeMatch, error } = await supabase.rpc('check_codice_ingresso', {
		codice: codice_ingresso,
		id_gruppo
	});

	console.log(codeMatch);

	if (!codeMatch) return { error: 'Il codice di ingresso è errato' };
	else if (error) return { error };

	return supabase.from('iscrizioni_gruppi').insert({ id_gruppo });
}

export function leaveGruppo(supabase, id_iscrizione) {
	if (!supabase || !id_iscrizione?.trim())
		return { error: "Errore nell'inserimento dei parametri" };

	id_iscrizione = id_iscrizione.trim();

	return supabase.from('iscrizioni_gruppi').delete().eq('id', id_iscrizione);
}
