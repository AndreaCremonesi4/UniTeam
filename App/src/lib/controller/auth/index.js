import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { goto } from '$app/navigation';

export const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

export const validatePassword = (password, minLength = 6) => {
	if (password.trim().length < minLength)
		return `La password deve contenere almeno ${minLength} caratteri`;
	else if (!password.match(/[a-z]/g))
		return 'La password deve contenere almeno una lettera minuscola';
	else if (!password.match(/[A-Z]/g))
		return 'La password deve contenere almeno una lettera maiuscola';
	else if (!password.match(/[0-9]/g)) return 'La password deve contenere almeno un numero';
	else if (!password.match(/[ -/:-@[-`{-~]/g))
		return 'La password deve contenere almeno un carattere speciale';

	return null;
};

export const generateAvatar = (seed) => {
	const avatar = createAvatar(initials, {
		seed: seed
	});

	return avatar.toDataUriSync();
};

export const logout = async (auth) => {
	auth.signOut();
	await goto('/');
};

export function signInWithEmailAndPassword(supabase, email, password) {
	if (!supabase || !email?.trim() || !password?.trim())
		return { error: new Error('Errore nel passaggio dei parametri') };

	return supabase.auth.signInWithPassword({
		email: email.trim(),
		password: password.trim()
	});
}

export async function signUpWithEmailAndPassword(supabase, email, password, username, redirectTo) {
	if (!supabase || !email?.trim() || !password?.trim() || !username?.trim())
		return { error: new Error('Errore nel passaggio dei parametri') };

	if (await checkIfUsernameExists(supabase, username)) {
		return { error: new Error('Username non disponibile') };
	}

	return supabase.auth.signUp({
		email: email.trim(),
		password: password.trim(),
		options: {
			data: {
				username: username.trim(),
				profile_photo: generateAvatar(username.trim().charAt(0))
			},
			emailRedirectTo: `${location.origin}/auth/callback${
				redirectTo ? `?redirectTo=${redirectTo}` : ''
			}`
		}
	});
}

async function checkIfUsernameExists(supabase, username) {
	const { data, error } = await supabase.rpc('check_username_exists', { p_username: username });

	return error ? true : data;
}
