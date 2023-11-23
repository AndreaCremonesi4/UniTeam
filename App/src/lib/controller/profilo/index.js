import { generateAvatar } from '$lib/controller/auth';

export function getInfoProfilo(supabase, id) {
	if (!supabase || !id) return { error: "Errore nell'inserimento dei parametri" };

	return supabase.from('profiles').select('*').eq('id', id).single();
}

export async function updateProfileUsername(supabase, id, username) {
	if (!supabase || !id || !username.trim())
		return { error: "Errore nell'inserimento dei parametri" };

	username = username.trim();

	const avatar = generateAvatar(username.trim().charAt(0));

	const newProfile = {
		id: id,
		username: username,
		profile_photo: avatar
	};

	return supabase.from('profiles').upsert(newProfile);
}

export async function getRecensioniCorsi(supabase, id_profilo, range) {
	if (!supabase || !id_profilo || !range) return { error: "Errore nell'inserimento dei parametri" };

	return supabase
		.from('recensioni_corsi')
		.select('*, corsi (*)')
		.eq('id_profilo', id_profilo)
		.range(range.min, range.max);
}

export async function getRecensioniProfessori(supabase, id_profilo, range) {
	if (!supabase || !id_profilo || !range) return { error: "Errore nell'inserimento dei parametri" };

	return supabase
		.from('recensioni_professori')
		.select('*, professori(*)')
		.eq('id_profilo', id_profilo)
		.range(range.min, range.max);
}
