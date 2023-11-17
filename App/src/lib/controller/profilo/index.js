import { generateAvatar } from '$lib/controller/auth';

export async function updateProfileUsername(supabase, id, username) {
	const avatar = generateAvatar(username.trim().charAt(0));

	const newProfile = {
		id: id,
		username: username,
		profile_photo: avatar
	};

	return supabase.from('profiles').upsert(newProfile);
}
