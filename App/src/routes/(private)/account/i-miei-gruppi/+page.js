import {
	getGruppiUtenteIscritto,
	getGruppiUtenteProprietario
} from '../../../../lib/controller/profilo';

export async function load({ parent }) {
	const parentData = await parent();
	const { supabase, session } = parentData;

	const pageSize = 10;

	const { data: gruppiProprietario } = await getGruppiUtenteProprietario(
		supabase,
		session?.user?.id,
		{ min: 0, max: pageSize }
	);
	const { data: gruppiIscritto } = await getGruppiUtenteIscritto(supabase, session?.user?.id, {
		min: 0,
		max: pageSize
	});

	return {
		...parentData,
		pageSize,
		gruppiProprietario,
		gruppiIscritto
	};
}
