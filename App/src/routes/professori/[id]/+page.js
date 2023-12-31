import {
	getProfessoreById,
	getRecensioneProfessoreUtente,
	getRecensioniProfessore
} from '../../../lib/controller/professori/index.js';

export async function load({ params, parent }) {
	const parentData = await parent();

	const { data: professore } = await getProfessoreById(parentData.supabase, params.id);

	// ottiene la recensione dell'utente collegato
	const { data: recensioneUtente } = await getRecensioneProfessoreUtente(
		parentData.supabase,
		parentData.profile?.id,
		params.id
	);

	const pageSize = 10;

	// ottiene le recensioni del corso
	const { data: recensioni } = await getRecensioniProfessore(parentData.supabase, params.id, {
		min: 0,
		max: pageSize
	});

	return {
		...parentData,
		professore,
		recensioneUtente,
		recensioni,
		pageSize
	};
}
