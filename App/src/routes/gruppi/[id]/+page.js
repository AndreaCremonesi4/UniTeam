import { getGruppoById, getIscrittiGruppo } from '../../../lib/controller/gruppi';

export async function load({ params, parent }) {
	const parentData = await parent();

	const { data: gruppo } = await getGruppoById(parentData.supabase, params.id);

	const { data: iscritti } = await getIscrittiGruppo(parentData.supabase, params.id);

	const { data: idIscrizioneUtente } = parentData?.session?.user?.id
		? await parentData.supabase.rpc('is_subscribed', {
				id_gruppo: gruppo.id,
				id_profilo: parentData.session.user.id
		  })
		: { data: undefined };

	return {
		...parentData,
		gruppo,
		iscritti,
		idIscrizioneUtente
	};
}
