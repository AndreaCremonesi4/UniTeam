import { getRecensioniCorsi, getRecensioniProfessori } from '../../../../lib/controller/profilo';

export async function load({ parent }) {
	const parentData = await parent();

	const pageSize = 10;

	// ottiene le recensioni dei corsi dell'utente collegato
	const { data: recensioniCorsi } = await getRecensioniCorsi(
		parentData.supabase,
		parentData.profile?.id,
		{ min: 0, max: pageSize - 1 }
	);

	// ottiene le recensioni dei professori dell'utente collegato
	const { data: recensioniProfessori } = await getRecensioniProfessori(
		parentData.supabase,
		parentData.profile?.id,
		{ min: 0, max: pageSize - 1 }
	);

	return {
		...parentData,
		pageSize,
		recensioniCorsi,
		recensioniProfessori
	};
}
