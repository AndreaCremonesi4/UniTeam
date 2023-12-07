import {
	getGruppiWithCount,
	getGruppoById,
	getIscrittiGruppo,
	getIscrizione,
	getIscrizioneUtente,
	joinGruppo,
	joinGruppoWithCode,
	leaveGruppo,
	upsertGruppo
} from '../../../../src/lib/controller/gruppi';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mockSupabase } from '../../utilities';

describe('Test Recupero dati Gruppo tramite ID', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('ID = 7', async () => {
		const id_gruppo = 7;

		mockSupabase.single.mockImplementationOnce(() => {
			return {
				data: mockSupabase.gruppi.filter((gruppo) => gruppo.id == id_gruppo).at(0)
			};
		});

		const { data } = await getGruppoById(mockSupabase, id_gruppo);

		expect(data.nome).toBe('Gruppo7');
	});

	test('ID nullo', async () => {
		const id_gruppo = undefined;
		const { error } = await getGruppoById(mockSupabase, id_gruppo);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('ID inesistente', async () => {
		const id_gruppo = -1;

		mockSupabase.single.mockImplementationOnce(() => {
			if (!mockSupabase.professori.map((gruppo) => gruppo.id).includes(id_gruppo))
				return { error: new Error('Gruppo inesistente!') };
			return {
				data: mockSupabase.professori.filter((gruppo) => gruppo.id == id_gruppo).at(0)
			};
		});

		const { error } = await getGruppoById(mockSupabase, id_gruppo);

		expect(error.message).toBe('Gruppo inesistente!');
	});
});

describe('Test Ricerca dei Gruppi', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Ricerca senza filtri', async () => {
		const filtroNome = '';
		const filtroVisibilita = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.eq.mockImplementationOnce(() => {
			return { data: mockSupabase.gruppi.slice(page * pageSize, pageSize + page * pageSize) };
		});

		const { data } = await getGruppiWithCount(
			mockSupabase,
			filtroNome,
			filtroVisibilita,
			page,
			pageSize
		);

		expect(data.length).toBe(10);
	});

	test('Ricerca tramite Nome', async () => {
		const filtroNome = 'Gruppo17';
		const filtroVisibilita = undefined;
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.gruppi
					.filter((gruppo) => gruppo.nome === filtroNome)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getGruppiWithCount(
			mockSupabase,
			filtroNome,
			filtroVisibilita,
			page,
			pageSize
		);

		expect(data[0].nome).toBe(filtroNome);
	});

	test('Ricerca tramite Visibilità', async () => {
		const filtroNome = '';
		const filtroVisibilita = true;
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockReturnValue(mockSupabase);
		mockSupabase.eq.mockImplementationOnce(() => {
			return {
				data: mockSupabase.gruppi
					.filter((gruppo) => gruppo.privato === filtroVisibilita)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getGruppiWithCount(
			mockSupabase,
			filtroNome,
			filtroVisibilita,
			page,
			pageSize
		);

		data.forEach((element) => {
			expect(element.privato).toBe(filtroVisibilita);
		});
	});

	test('Ricerca Gruppo tramite Nome e Visibilità', async () => {
		const filtroNome = 'Gruppo8';
		const filtroVisibilita = false;
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockReturnValue(mockSupabase);
		mockSupabase.eq.mockImplementationOnce(() => {
			return {
				data: mockSupabase.gruppi
					.filter((gruppo) => gruppo.nome === filtroNome && gruppo.privato === filtroVisibilita)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getGruppiWithCount(
			mockSupabase,
			filtroNome,
			filtroVisibilita,
			page,
			pageSize
		);

		expect(data.length).toBe(1);
	});

	test('Ricerca di un Nome Inesistente', async () => {
		const filtroNome = 'Nome Inesistente';
		const filtroVisibilita = undefined;
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.gruppi
					.filter((gruppo) => gruppo.nome === filtroNome)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getGruppiWithCount(
			mockSupabase,
			filtroNome,
			filtroVisibilita,
			page,
			pageSize
		);

		expect(data.length).toBe(0);
	});

	test('Ricerca con Paginazione di 5', async () => {
		const filtroNome = '';
		const filtroVisibilita = '';
		const page = 0;
		const pageSize = 5;

		mockSupabase.order.mockReturnValue(mockSupabase);
		mockSupabase.eq.mockImplementationOnce(() => {
			return { data: mockSupabase.gruppi.slice(page * pageSize, pageSize + page * pageSize) };
		});

		const { data } = await getGruppiWithCount(
			mockSupabase,
			filtroNome,
			filtroVisibilita,
			page,
			pageSize
		);

		expect(data.length).toBe(5);
	});

	test('Ricerca con Paginazione di 0', async () => {
		const filtroNome = '';
		const filtroVisibilita = '';
		const page = 0;
		const pageSize = 0;

		const { error } = await getGruppiWithCount(
			mockSupabase,
			filtroNome,
			filtroVisibilita,
			page,
			pageSize
		);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Ricerca con Paginazione negativa', async () => {
		const filtroNome = '';
		const filtroVisibilita = '';
		const page = 0;
		const pageSize = -1;

		const { error } = await getGruppiWithCount(
			mockSupabase,
			filtroNome,
			filtroVisibilita,
			page,
			pageSize
		);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Ricerca con Parametri nulli', async () => {
		const filtroNome = undefined;
		const filtroVisibilita = undefined;
		const page = undefined;
		const pageSize = undefined;

		const { error } = await getGruppiWithCount(
			mockSupabase,
			filtroNome,
			filtroVisibilita,
			page,
			pageSize
		);

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
			return mockSupabase.iscrizioni_gruppi.filter(
				(iscrizione) =>
					iscrizione.id_gruppo === parameters.id_gruppo &&
					iscrizione.id_profilo === parameters.id_profilo
			);
		});

		const result = await getIscrizione(mockSupabase, id_gruppo, id_profilo);

		expect(result.length).toBeGreaterThan(0);
	});

	test('Iscrizione Non Presente', async () => {
		const id_gruppo = 1;
		const id_profilo = 1;

		const result = await getIscrizione(mockSupabase, id_gruppo, id_profilo);

		expect(result.length).toBe(0);
	});

	test('Parametri non corretti', async () => {
		const { error } = await getIscrizione(undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Creazione Gruppo', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Creazione Gruppo Riuscita', async () => {
		const nome = 'Gruppo2';
		const descrizione = 'Descrizione Gruppo 2';
		const privato = true;

		mockSupabase.single.mockImplementationOnce(() => {
			const id = mockSupabase.gruppi.length;

			mockSupabase.gruppi.push({
				id,
				nome,
				descrizione,
				privato,
				proprietario: 1,
				codice_ingresso: `codice-ingresso-${id}`
			});

			return { data: mockSupabase.gruppi.at(id) };
		});

		const { data } = await upsertGruppo(mockSupabase, undefined, nome, descrizione, privato);

		expect(data.nome).toBe(nome);
	});

	test('Errore durante la Creazione del Gruppo', async () => {
		const nome = 'Gruppo2';
		const descrizione = 'Descrizione Gruppo 2';
		const privato = true;

		mockSupabase.single.mockImplementationOnce(() => {
			return { error: new Error("Errore durante l'inserimento") };
		});

		const { error } = await upsertGruppo(mockSupabase, undefined, nome, descrizione, privato);

		expect(error.message).toBe("Errore durante l'inserimento");
	});

	test('Parametri non corretti', async () => {
		const { error } = await upsertGruppo(undefined, undefined, '   ', undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Aggiornamento Gruppo', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Aggiornamento Gruppo Riuscito', async () => {
		const id_gruppo = 2;
		const nome = 'Gruppo2 Modificato';
		const descrizione = 'Descrizione Gruppo 2 Modificato';
		const privato = true;

		mockSupabase.single.mockImplementationOnce(() => {
			mockSupabase.gruppi[id_gruppo] = {
				...mockSupabase.gruppi[id_gruppo],
				nome,
				descrizione,
				privato
			};

			return { data: mockSupabase.gruppi.at(id_gruppo) };
		});

		const { data } = await upsertGruppo(mockSupabase, id_gruppo, nome, descrizione, privato);

		expect(data.nome).toBe(nome);
	});

	test("Errore durante l'Aggiornamento del Gruppo", async () => {
		const nome = 'Gruppo2';
		const descrizione = 'Descrizione Gruppo 2';
		const privato = true;

		mockSupabase.single.mockImplementationOnce(() => {
			return { error: new Error("Errore durante l'aggiornamento") };
		});

		const { error } = await upsertGruppo(mockSupabase, undefined, nome, descrizione, privato);

		expect(error.message).toBe("Errore durante l'aggiornamento");
	});

	test('Parametri non corretti', async () => {
		const { error } = await upsertGruppo(undefined, undefined, '   ', undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Recupero Iscritti di un Gruppo', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Recupero Riuscito', async () => {
		const id_gruppo = 1;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.iscrizioni_gruppi.filter(
					(iscrizione) => iscrizione.id_gruppo === id_gruppo
				)
			};
		});

		const { data } = await getIscrittiGruppo(mockSupabase, id_gruppo);

		expect(data.length).toBe(2);
	});

	test('Gruppo Senza Iscritti', async () => {
		const id_gruppo = 16;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.iscrizioni_gruppi.filter(
					(iscrizione) => iscrizione.id_gruppo === id_gruppo
				)
			};
		});

		const { data } = await getIscrittiGruppo(mockSupabase, id_gruppo);

		expect(data.length).toBe(0);
	});

	test('Errore durante il Recupero degli Iscritti', async () => {
		const id_gruppo = 1;

		mockSupabase.order.mockImplementationOnce(() => {
			return { error: new Error('Errore durante il recupero dei dati!') };
		});

		const { error } = await getIscrittiGruppo(mockSupabase, id_gruppo);

		expect(error.message).toBe('Errore durante il recupero dei dati!');
	});

	test('Parametri Errati', async () => {
		const { error } = await getIscrittiGruppo(undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Recupero Iscrizione di un Utente ad un Gruppo', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Recupero Riuscito', async () => {
		const id_gruppo = 13;
		const id_profilo = 14;

		mockSupabase.single.mockImplementationOnce(() => {
			return {
				data: mockSupabase.iscrizioni_gruppi.filter(
					(iscrizione) => iscrizione.id_gruppo === id_gruppo && iscrizione.id_profilo === id_profilo
				)
			};
		});

		const { data } = await getIscrizioneUtente(mockSupabase, id_gruppo, id_profilo);

		expect(data.length).toBe(2);
	});

	test('Recupero Iscrizione Inesistente', async () => {
		const id_gruppo = 1;
		const id_profilo = 14;

		mockSupabase.single.mockImplementationOnce(() => {
			return {
				data: mockSupabase.iscrizioni_gruppi.filter(
					(iscrizione) => iscrizione.id_gruppo === id_gruppo && iscrizione.id_profilo === id_profilo
				)
			};
		});

		const { data } = await getIscrizioneUtente(mockSupabase, id_gruppo, id_profilo);

		expect(data.length).toBe(0);
	});

	test("Errore durante il Recupero dell'Iscrizione", async () => {
		const id_gruppo = 13;
		const id_profilo = 14;

		mockSupabase.single.mockImplementationOnce(() => {
			return { error: new Error('Errore durante il recupero dei dati!') };
		});

		const { error } = await getIscrizioneUtente(mockSupabase, id_gruppo, id_profilo);

		expect(error.message).toBe('Errore durante il recupero dei dati!');
	});

	test('Parametri Errati', async () => {
		const { error } = await getIscrizioneUtente(undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Unione ad un Gruppo', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Unione Riuscita', async () => {
		const id_gruppo = 13;

		const now = new Date().toISOString();
		mockSupabase.insert.mockImplementationOnce(() => {
			mockSupabase.iscrizioni_gruppi.push({
				id: mockSupabase.iscrizioni_gruppi.length,
				id_gruppo,
				id_profilo: 1,
				data_iscrizione: now
			});
		});

		await joinGruppo(mockSupabase, id_gruppo);

		expect(mockSupabase.iscrizioni_gruppi.at(20).data_iscrizione).toBe(now);
	});

	test("Errore durante l'Unione", async () => {
		const id_gruppo = 13;

		mockSupabase.insert.mockImplementationOnce(() => {
			return { error: new Error("Errore durante l'unione al gruppo") };
		});

		const { error } = await joinGruppo(mockSupabase, id_gruppo);

		expect(error.message).toBe("Errore durante l'unione al gruppo");
	});

	test('Parametri Errati', async () => {
		const { error } = await joinGruppo(undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Unione ad un Gruppo Privato', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Unione Riuscita', async () => {
		const id_gruppo = 17;
		const codice_ingresso = 'codice-gruppo-17';

		mockSupabase.rpc.mockImplementationOnce((nome_funzione, data) => {
			return {
				data: mockSupabase.gruppi[data.id_gruppo].codice_ingresso === data.codice
			};
		});

		const now = new Date().toISOString();
		mockSupabase.insert.mockImplementationOnce(() => {
			mockSupabase.iscrizioni_gruppi.push({
				id: mockSupabase.iscrizioni_gruppi.length,
				id_gruppo,
				id_profilo: 1,
				data_iscrizione: now
			});
		});

		await joinGruppoWithCode(mockSupabase, id_gruppo, codice_ingresso);

		expect(mockSupabase.iscrizioni_gruppi.at(21).data_iscrizione).toBe(now);
	});

	test('Codice Ingresso Errato', async () => {
		const id_gruppo = 7;
		const codice_ingresso = 'codice-gruppo-10';

		mockSupabase.rpc.mockImplementationOnce((nome_funzione, data) => {
			return {
				data: mockSupabase.gruppi[data.id_gruppo].codice_ingresso === data.codice
			};
		});

		const { error } = await joinGruppoWithCode(mockSupabase, id_gruppo, codice_ingresso);

		expect(error.message).toBe('Il codice di ingresso è errato');
	});

	test('Errore durante il controllo del codice', async () => {
		const id_gruppo = 17;
		const codice_ingresso = 'codice-gruppo-17';

		mockSupabase.rpc.mockImplementationOnce(() => {
			return { data: true, error: new Error('Errore durante il controllo del codice') };
		});

		const { error } = await joinGruppoWithCode(mockSupabase, id_gruppo, codice_ingresso);

		expect(error.message).toBe('Errore durante il controllo del codice');
	});

	test("Errore durante l'Unione", async () => {
		const id_gruppo = 17;
		const codice_ingresso = 'codice-gruppo-17';

		mockSupabase.rpc.mockImplementationOnce((nome_funzione, data) => {
			return {
				data: mockSupabase.gruppi[data.id_gruppo].codice_ingresso === data.codice
			};
		});

		mockSupabase.insert.mockImplementationOnce(() => {
			return { error: new Error("Errore durante l'unione al gruppo") };
		});

		const { error } = await joinGruppoWithCode(mockSupabase, id_gruppo, codice_ingresso);

		expect(error.message).toBe("Errore durante l'unione al gruppo");
	});

	test('Parametri Errati', async () => {
		const { error } = await joinGruppoWithCode(undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Abbandono di un Gruppo', () => {
	var mockIscrizioniGruppi;
	beforeEach(() => {
		// resetta le iscrizioni
		mockIscrizioniGruppi = mockSupabase.iscrizioni_gruppi;

		vi.clearAllMocks();
	});

	test('Abbandono Riuscito', async () => {
		const id_iscrizione = 5;

		mockSupabase.eq.mockImplementationOnce(() => {
			mockIscrizioniGruppi.splice(id_iscrizione, 1);
		});

		await leaveGruppo(mockSupabase, id_iscrizione);

		expect(mockIscrizioniGruppi.at(id_iscrizione).id).toBe(id_iscrizione + 1);
	});

	test("Errore durante l'Abbandono", async () => {
		const id_iscrizione = 8;

		mockSupabase.eq.mockImplementationOnce(() => {
			return { error: new Error("Errore durante l'abbandono del gruppo") };
		});

		const { error } = await leaveGruppo(mockSupabase, id_iscrizione);

		expect(error.message).toBe("Errore durante l'abbandono del gruppo");
	});

	test('Parametri Errati', async () => {
		const { error } = await leaveGruppo(undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});
