import { getAnni, getFacolta } from '$lib/controller/corsi';

export async function load({ parent }) {
	const parentData = await parent();
	const { supabase } = parentData;

	const anni = await getAnni(supabase);
	const facolta = await getFacolta(supabase);

	return {
		...parentData,
		anni,
		facolta
	};
}
