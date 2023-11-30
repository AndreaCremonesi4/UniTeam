import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mockSupabase } from '../../utilities';
import { getIscrizione, getMessaggi, sendMessage } from '../../../../src/lib/controller/gruppi';

describe('Test Recupero Messaggi di un Gruppo tramite ID', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('ID = 5', async () => {
		const id_gruppo = 5;
		const range = { min: 0, max: 5 };

		mockSupabase.eq.mockImplementationOnce(() => {
			return {
				data: mockSupabase.messaggi
					.filter((messaggio) => messaggio.id_gruppo == id_gruppo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getMessaggi(mockSupabase, id_gruppo, range);

		expect(data.length).toBe(5);
	});

	test('ID Gruppo Inesistente', async () => {
		const id_gruppo = -1;
		const range = { min: 0, max: 5 };

		mockSupabase.eq.mockImplementationOnce(() => {
			return {
				data: mockSupabase.messaggi
					.filter((messaggio) => messaggio.id_gruppo == id_gruppo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getMessaggi(mockSupabase, id_gruppo, range);

		expect(data.length).toBe(0);
	});

	test('Range Errato (min: -1, max: 5)', async () => {
		const id_gruppo = 5;
		const range = { min: -1, max: 5 };

		const { error } = await getMessaggi(mockSupabase, id_gruppo, range);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Range Errato (min: 5, max: 2)', async () => {
		const id_gruppo = 5;
		const range = { min: 5, max: 2 };

		const { error } = await getMessaggi(mockSupabase, id_gruppo, range);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Parametri Errati', async () => {
		const { error } = await getMessaggi(undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Funzione RPC "getIscrizione"', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Iscrizione Presente', async () => {
		const id_gruppo = 2;
		const id_profilo = 16;

		mockSupabase.rpc.mockImplementation((function_name, parameters) => {
			return {
				data: mockSupabase.iscrizioni_gruppi
					.filter(
						(iscrizione) =>
							iscrizione.id_gruppo === parameters.id_gruppo &&
							iscrizione.id_profilo === parameters.id_profilo
					)
					.at(0)
			};
		});

		const { data } = await getIscrizione(mockSupabase, id_gruppo, id_profilo);

		expect(data.data_iscrizione).toBe('2023-11-29');
	});

	test('Iscrizione Non Presente', async () => {
		const id_gruppo = 1;
		const id_profilo = 1;

		const { data } = await getIscrizione(mockSupabase, id_gruppo, id_profilo);

		expect(data).toBeUndefined;
	});

	test('Parametri non corretti', async () => {
		const { error } = await getIscrizione(undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Invio di un Messaggio in un Gruppo', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Messaggio Inviato Correttamente', async () => {
		const testo = 'Testo Messaggio Nuovo';
		const gruppo = mockSupabase.gruppi[12];
		const id_profilo = 10;

		const now = new Date().toISOString();
		mockSupabase.insert.mockImplementationOnce((data) => {
			mockSupabase.messaggi.push({
				id: mockSupabase.messaggi.length,
				testo: data.testo,
				media: data.media,
				data: now,
				mittente: id_profilo,
				id_gruppo: data.id_gruppo
			});
		});

		await sendMessage(mockSupabase, testo, undefined, gruppo, id_profilo);

		expect(mockSupabase.messaggi.pop().testo).toBe(testo);
	});

	test('Messaggio Inviato da un Utente Non Iscritto al Gruppo', async () => {
		const testo = 'Testo Messaggio Nuovo';
		const gruppo = mockSupabase.gruppi[12];
		const id_profilo = 4;

		const { error } = await sendMessage(mockSupabase, testo, undefined, gruppo, id_profilo);

		expect(error.message).toBe('Non puoi inviare messaggi perchè non sei iscritto al gruppo');
	});

	test("Errore durante la Verifica dell'Iscrizione dell'Utente", async () => {
		const testo = 'Testo Messaggio Nuovo';
		const gruppo = mockSupabase.gruppi[12];
		const id_profilo = 10;

		mockSupabase.rpc.mockImplementationOnce(() => {
			return {
				error: new Error('Errore durante la verifica')
			};
		});

		const { error } = await sendMessage(mockSupabase, testo, undefined, gruppo, id_profilo);

		expect(error.message).toBe('Non puoi inviare messaggi perchè non sei iscritto al gruppo');
	});

	test("Errore durante l'Invio di un Messaggio", async () => {
		const testo = 'Testo Messaggio Nuovo';
		const gruppo = mockSupabase.gruppi[12];
		const id_profilo = 10;

		mockSupabase.insert.mockImplementationOnce(() => {
			return {
				error: new Error("Errore durante l'invio del messaggio")
			};
		});

		const { error } = await sendMessage(mockSupabase, testo, undefined, gruppo, id_profilo);

		expect(error.message).toBe("Errore durante l'invio del messaggio");
	});

	test('Messaggio con Allegato Inviato Correttamente', async () => {
		const testo = 'Testo Messaggio Nuovo';
		const gruppo = mockSupabase.gruppi[12];
		const id_profilo = 10;
		const file = { name: 'Nome_File' };

		mockSupabase.storage.getPublicUrl.mockImplementationOnce(() => {
			return { data: { publicUrl: 'url-pubblico' } };
		});

		const now = new Date().toISOString();
		mockSupabase.insert.mockImplementationOnce((data) => {
			mockSupabase.messaggi.push({
				id: mockSupabase.messaggi.length,
				testo: data.testo,
				media: data.media,
				data: now,
				mittente: id_profilo,
				id_gruppo: data.id_gruppo
			});
		});

		await sendMessage(mockSupabase, testo, file, gruppo, id_profilo);

		expect(mockSupabase.messaggi.pop().testo).toBe(testo);
	});

	test('Errore durante il caricamento del file', async () => {
		const testo = 'Testo Messaggio Nuovo';
		const gruppo = mockSupabase.gruppi[12];
		const id_profilo = 10;
		const file = { name: 'Nome_File' };

		mockSupabase.storage.upload.mockImplementationOnce(() => {
			return { error: new Error('Errore durante il caricamento del File') };
		});

		const { error } = await sendMessage(mockSupabase, testo, file, gruppo, id_profilo);

		expect(error.message).toBe('Errore durante il caricamento del File');
	});

	test("Errore durante il recupero dell'Url Pubblico del File", async () => {
		const testo = 'Testo Messaggio Nuovo';
		const gruppo = mockSupabase.gruppi[12];
		const id_profilo = 10;
		const file = { name: 'Nome_File' };

		mockSupabase.storage.getPublicUrl.mockImplementationOnce(() => {
			return { error: new Error("Errore durante il recupero dell'Url Pubblico") };
		});

		const { error } = await sendMessage(mockSupabase, testo, file, gruppo, id_profilo);

		expect(error.message).toBe("Errore durante il recupero dell'Url Pubblico");
	});

	test('Parametri Errati', async () => {
		const { error } = await sendMessage(mockSupabase, '      ', undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});
