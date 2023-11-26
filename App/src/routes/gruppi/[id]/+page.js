import {
	getGruppoById,
	getIscrittiGruppo,
	getMessaggi,
	getIscrizione
} from '../../../lib/controller/gruppi';

export async function load({ params, parent }) {
	const parentData = await parent();

	const { supabase, session } = parentData;

	const { data: gruppo } = await getGruppoById(supabase, params.id);

	const { data: iscritti } = await getIscrittiGruppo(supabase, params.id);

	const { data: idIscrizioneUtente } = session?.user?.id
		? await getIscrizione(supabase, gruppo.id, session?.user?.id)
		: { data: undefined };

	const pageSize = 10;

	const { data: messaggi } = await getMessaggi(supabase, params.id, { min: 0, max: pageSize });

	return {
		...parentData,
		gruppo,
		iscritti,
		idIscrizioneUtente,
		messaggi,
		pageSize
	};
}
