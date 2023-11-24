import {
	getCorsoById,
	getRecensioniCorso,
	getRecensioneCorsoUtente
} from '../../../lib/controller/corsi/index.js';

export async function load({ params, parent }) {
	const parentData = await parent();

	// ottiene i dati del corso
	const { data: corso } = await getCorsoById(parentData.supabase, params.id);

	// ottiene la recensione dell'utente collegato
	const { data: recensioneUtente } = await getRecensioneCorsoUtente(
		parentData.supabase,
		parentData.profile?.id,
		params.id
	);

	const pageSize = 10;

	// ottiene le recensioni del corso
	const { data: recensioni } = await getRecensioniCorso(parentData.supabase, params.id, {
		min: 0,
		max: pageSize
	});

	return {
		...parentData,
		corso,
		recensioneUtente,
		recensioni,
		pageSize
	};
}
