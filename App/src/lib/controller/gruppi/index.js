export function getGruppoById(supabase, id) {
	if (!supabase || !id) return { error: new Error("Errore nell'inserimento dei parametri") };

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

export function upsertGruppo(supabase, id, nome, descrizione, privato) {
	if (!supabase || !nome?.trim() || !descrizione?.trim())
		return { error: new Error("Errore nell'inserimento dei parametri") };

	nome = nome.trim();
	descrizione = descrizione.trim();

	return supabase.from('gruppi').upsert({ id, nome, descrizione, privato }).select().single();
}

export function getIscrittiGruppo(supabase, id_gruppo) {
	if (!supabase || !id_gruppo) return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase
		.from('iscrizioni_gruppi')
		.select('*, profiles(*)')
		.eq('id_gruppo', id_gruppo)
		.order('profiles(username)', { ascending: true });
}

export function getIscrizione(supabase, id_gruppo, id_profilo) {
	if (!supabase || !id_gruppo || !id_profilo)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase.rpc('is_subscribed', {
		id_gruppo,
		id_profilo
	});
}

export function getIscrizioneUtente(supabase, id_gruppo, id_profilo) {
	if (!supabase || !id_gruppo || !id_profilo)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase
		.from('iscrizioni_gruppi')
		.select('*, profiles(*)')
		.match({ id_gruppo, id_profilo })
		.single();
}

export async function isIscritto(supabase, id_gruppo, id_profilo) {
	if (!supabase || !id_gruppo || !id_profilo)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	const { error, data } = await getIscrizione(supabase, id_gruppo, id_profilo);

	return !error && data;
}

export function joinGruppo(supabase, id_gruppo) {
	if (!supabase || !id_gruppo) return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase.from('iscrizioni_gruppi').insert({ id_gruppo });
}

export async function joinGruppoWithCode(supabase, id_gruppo, codice_ingresso) {
	if (!supabase || !id_gruppo || !codice_ingresso?.trim())
		return { error: new Error("Errore nell'inserimento dei parametri") };

	codice_ingresso = codice_ingresso.trim();

	// verifica se il codice di ingresso è corretto
	const { data: codeMatch, error } = await supabase.rpc('check_codice_ingresso', {
		codice: codice_ingresso,
		id_gruppo
	});

	if (!codeMatch) return { error: new Error('Il codice di ingresso è errato') };
	if (error) return { error };

	return supabase.from('iscrizioni_gruppi').insert({ id_gruppo });
}

export function leaveGruppo(supabase, id_iscrizione) {
	if (!supabase || !id_iscrizione)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase.from('iscrizioni_gruppi').delete().eq('id', id_iscrizione);
}

export function getMessaggi(supabase, id_gruppo, range = { min: 0, max: 10 }) {
	if (!supabase || !id_gruppo || !range || range?.min < 0 || range?.max < range.min)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase
		.from('messaggi')
		.select('*, profiles(*)')
		.order('data', { ascending: false })
		.range(range.min, range.max)
		.eq('id_gruppo', id_gruppo);
}

export async function sendMessage(supabase, testo, file, gruppo, id_profilo) {
	if (
		!supabase ||
		!gruppo ||
		!gruppo.id ||
		!gruppo.proprietario ||
		!id_profilo ||
		(!testo.trim() && !file)
	)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	if (gruppo.proprietario !== id_profilo && !(await isIscritto(supabase, gruppo.id, id_profilo)))
		return { error: new Error('Non puoi inviare messaggi perchè non sei iscritto al gruppo') };

	if (testo) testo = testo.trim();

	var media;

	if (file) {
		let filename = `${crypto?.randomUUID()}.${file.name.split('.').pop()}`;

		const { error: uploadError } = await supabase.storage
			.from('Uploads')
			.upload(`public/${filename}`, file);

		if (uploadError) return { error: uploadError };

		const { data, error } = await supabase.storage
			.from('Uploads')
			.getPublicUrl(`public/${filename}`);

		if (error) return { error: error };

		media = {
			filename: file.name,
			publicUrl: data.publicUrl
		};

		media = JSON.stringify(media);
	}

	return supabase.from('messaggi').insert({ testo, media, id_gruppo: gruppo.id });
}

export function listenChannelMessaggi(supabase, id_gruppo, handleNewMessage) {
	if (!supabase || !id_gruppo || !handleNewMessage) return undefined;

	return supabase
		.channel('messaggi')
		.on(
			'postgres_changes',
			{
				event: 'INSERT',
				schema: 'public',
				table: 'messaggi',
				filter: `id_gruppo=eq.${id_gruppo}`
			},
			handleNewMessage
		)
		.subscribe();
}

export function listenChannelIscrizioni(
	supabase,
	id_gruppo,
	handleInsertIscrizione,
	handleDeleteIscrizione
) {
	if (!supabase || !id_gruppo || !handleDeleteIscrizione || !handleInsertIscrizione)
		return undefined;

	return supabase
		.channel('iscrizioni_gruppi')
		.on(
			'postgres_changes',
			{
				event: 'INSERT',
				schema: 'public',
				table: 'iscrizioni_gruppi',
				filter: `id_gruppo=eq.${id_gruppo}`
			},
			handleInsertIscrizione
		)
		.on(
			'postgres_changes',
			{
				event: 'DELETE',
				schema: 'public',
				table: 'iscrizioni_gruppi'
			},
			handleDeleteIscrizione
		)
		.subscribe();
}
