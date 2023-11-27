import { getRuoli, getStrutture } from '$lib/controller/professori';

export async function load({ parent }) {
	const parentData = await parent();
	const { supabase } = parentData;

	const ruoli = await getRuoli(supabase);
	const strutture = await getStrutture(supabase);

	return {
		...parentData,
		ruoli,
		strutture
	};
}
