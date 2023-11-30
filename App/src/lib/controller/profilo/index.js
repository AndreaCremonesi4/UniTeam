import { generateAvatar } from '$lib/controller/auth';

export function getInfoProfilo(supabase, id) {
	if (!supabase || !id) return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase.from('profiles').select('*').eq('id', id).single();
}

export function updateProfileUsername(supabase, id, username) {
	if (!supabase || !id || !username.trim())
		return { error: new Error("Errore nell'inserimento dei parametri") };

	username = username.trim();

	const avatar = generateAvatar(username.trim().charAt(0));

	const newProfile = {
		id: id,
		username: username,
		profile_photo: avatar
	};

	return supabase.from('profiles').upsert(newProfile);
}

export function getRecensioniCorsi(supabase, id_profilo, range) {
	if (!supabase || !id_profilo || !range || range?.min < 0 || range?.max < range?.min)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase
		.from('recensioni_corsi')
		.select('*, corsi (*)')
		.eq('id_profilo', id_profilo)
		.range(range.min, range.max);
}

export function getRecensioniProfessori(supabase, id_profilo, range) {
	if (!supabase || !id_profilo || !range || range?.min < 0 || range?.max < range?.min)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase
		.from('recensioni_professori')
		.select('*, professori(*)')
		.eq('id_profilo', id_profilo)
		.range(range.min, range.max);
}

export function getGruppiUtenteProprietario(supabase, id_profilo, range) {
	if (!supabase || !id_profilo || !range || range?.min < 0 || range?.max < range?.min)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase
		.from('gruppi')
		.select('*')
		.eq('proprietario', id_profilo)
		.range(range.min, range.max);
}

export function getGruppiUtenteIscritto(supabase, id_profilo, range) {
	if (!supabase || !id_profilo || !range || range?.min < 0 || range?.max < range?.min)
		return { error: new Error("Errore nell'inserimento dei parametri") };

	return supabase
		.from('iscrizioni_gruppi')
		.select('gruppi(*)')
		.eq('id_profilo', id_profilo)
		.range(range.min, range.max);
}
