import {
	addRecensioneProfessore,
	getProfessoreById,
	getProfessoriWithCount,
	getRecensioneProfessoreUtente,
	getRecensioniProfessore,
	getRuoli,
	getStrutture
} from '../../../../src/lib/controller/professori';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mockSupabase } from '../../utilities';

describe('Test Recupero dati Professore tramite ID', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('ID = 3', async () => {
		const id_professore = 3;

		mockSupabase.single.mockImplementationOnce(() => {
			return {
				data: mockSupabase.professori.filter((professore) => professore.id == id_professore).at(0)
			};
		});

		const { data } = await getProfessoreById(mockSupabase, id_professore);

		expect(data.nome).toBe('Nicola Morato');
	});

	test('ID nullo', async () => {
		const id_professore = undefined;
		const { error } = await getProfessoreById(mockSupabase, id_professore);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('ID inesistente', async () => {
		const id_professore = -1;

		mockSupabase.single.mockImplementationOnce(() => {
			if (!mockSupabase.professori.map((professore) => professore.id).includes(id_professore))
				return { error: new Error('Professore inesistente!') };
		});

		const { error } = await getProfessoreById(mockSupabase, id_professore);

		expect(error.message).toBe('Professore inesistente!');
	});
});

describe('Test Ricerca dei Professori', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Ricerca senza filtri', async () => {
		const filtroNome = '';
		const filtroRuolo = '';
		const filtroStruttura = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return { data: mockSupabase.professori.slice(page * pageSize, pageSize + page * pageSize) };
		});

		const { data } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		expect(data.length).toBe(10);
	});

	test('Ricerca tramite Nome', async () => {
		const filtroNome = 'Milena Plebani';
		const filtroRuolo = '';
		const filtroStruttura = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.professori
					.filter((professore) => professore.nome === filtroNome)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		expect(data[0].nome).toBe(filtroNome);
	});

	test('Ricerca tramite Ruolo', async () => {
		const filtroNome = '';
		const filtroRuolo = 'Professore Ordinario';
		const filtroStruttura = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.professori
					.filter((professore) => professore.ruolo === filtroRuolo)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		data.forEach((element) => {
			expect(element.ruolo).toBe(filtroRuolo);
		});
	});

	test('Ricerca tramite Struttura', async () => {
		const filtroNome = '';
		const filtroRuolo = '';
		const filtroStruttura = 'Personale tecnico amministrativo';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.professori
					.filter((professore) => professore.struttura === filtroStruttura)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		data.forEach((element) => {
			expect(element.struttura).toBe(filtroStruttura);
		});
	});

	test('Ricerca Professore tramite Nome, Ruolo e Struttura', async () => {
		const filtroNome = 'Cristina Bettinelli';
		const filtroRuolo = 'Professore Ordinario';
		const filtroStruttura = 'Dipartimento di Scienze Aziendali';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.professori
					.filter(
						(professore) =>
							professore.nome === filtroNome &&
							professore.ruolo === filtroRuolo &&
							professore.struttura === filtroStruttura
					)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		expect(data.length).toBe(1);
	});

	test('Ricerca di un Nome Inesistente', async () => {
		const filtroNome = 'Nome Inesistente';
		const filtroRuolo = '';
		const filtroStruttura = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.professori
					.filter((professore) => professore.nome === filtroNome)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		expect(data.length).toBe(0);
	});

	test('Ricerca di un Ruolo Inesistente', async () => {
		const filtroNome = '';
		const filtroRuolo = 'Ruolo Inesistente';
		const filtroStruttura = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.professori
					.filter((professore) => professore.ruolo === filtroRuolo)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		expect(data.length).toBe(0);
	});

	test('Ricerca di una Struttura Inesistente', async () => {
		const filtroNome = '';
		const filtroRuolo = '';
		const filtroStruttura = 'Struttura Inesistente';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.professori
					.filter((professore) => professore.struttura === filtroStruttura)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		expect(data.length).toBe(0);
	});

	test('Ricerca con Paginazione di 5', async () => {
		const filtroNome = '';
		const filtroRuolo = '';
		const filtroStruttura = '';
		const page = 0;
		const pageSize = 5;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.professori.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		expect(data.length).toBe(5);
	});

	test('Ricerca con Paginazione di 0', async () => {
		const filtroNome = '';
		const filtroRuolo = '';
		const filtroStruttura = '';
		const page = 0;
		const pageSize = 0;

		const { error } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		expect(error).toBeDefined;
	});

	test('Ricerca con Paginazione negativa', async () => {
		const filtroNome = '';
		const filtroRuolo = '';
		const filtroStruttura = '';
		const page = 0;
		const pageSize = 0;

		const { error } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		expect(error).toBeDefined;
	});

	test('Ricerca con Parametri nulli', async () => {
		const filtroNome = undefined;
		const filtroRuolo = undefined;
		const filtroStruttura = undefined;
		const page = undefined;
		const pageSize = undefined;

		const { error } = await getProfessoriWithCount(
			mockSupabase,
			filtroNome,
			filtroRuolo,
			filtroStruttura,
			page,
			pageSize
		);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Funzione RPC "getRuoli"', () => {
	test('Parametri corretti', async () => {
		mockSupabase.rpc.mockImplementationOnce(() => {
			const ruoli = mockSupabase.professori.map((professore) => professore.ruolo);
			return {
				data: ruoli.filter((val, index) => ruoli.indexOf(val) === index)
			};
		});

		const result = await getRuoli(mockSupabase);

		expect(result.length).toBeGreaterThan(0);
	});

	test('Parametri non corretti', async () => {
		const { error } = await getRuoli(undefined);

		expect(error).toBeUndefined;
	});
});

describe('Test Funzione RPC "getStrutture"', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Parametri corretti', async () => {
		mockSupabase.rpc.mockImplementationOnce(() => {
			const anni = mockSupabase.professori.map((professore) => professore.struttura);
			return {
				data: anni.filter((val, index) => anni.indexOf(val) === index)
			};
		});

		const result = await getStrutture(mockSupabase);

		expect(result.length).toBeGreaterThan(0);
	});

	test('Parametri non corretti', async () => {
		const { error } = await getStrutture(undefined);

		expect(error).toBeUndefined;
	});
});

describe('Test Recupero Recensioni di un Professore', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Ultime 10 recensioni del Professore con ID = 2', async () => {
		const id_professore = 2;
		const range = { min: 0, max: 10 };

		mockSupabase.range.mockResolvedValueOnce({
			data: mockSupabase.recensioniProfessori
				.filter((el) => el.id_professore === id_professore)
				.splice(range.min, range.max)
		});

		const { data: recensioni } = await getRecensioniProfessore(mockSupabase, id_professore, range);

		expect(recensioni.length).toBe(3);
	});

	test('Ultime 10 recensioni del Professore con ID = 1 (Inesistenti)', async () => {
		const id_professore = 1;
		const range = { min: 0, max: 10 };

		// Simula il comportamento della funzione
		mockSupabase.range.mockResolvedValueOnce({
			data: mockSupabase.recensioniProfessori
				.filter((el) => el.id_professore === id_professore)
				.splice(range.min, range.max)
		});

		const { data: recensioni } = await getRecensioniProfessore(mockSupabase, id_professore, range);

		expect(recensioni.length).toBe(0);
	});

	test('ID Professore inesistente', async () => {
		const id_professore = -1;
		const range = { min: 0, max: 10 };

		mockSupabase.range.mockImplementationOnce(() => {
			if (
				!mockSupabase.recensioniProfessori
					.map((el) => {
						return el.id_professore;
					})
					.includes(id_professore)
			)
				return { error: new Error('ID Inesistente!') };

			return {
				data: mockSupabase.recensioniProfessori
					.filter((el) => el.id_professore === id_professore)
					.splice(range.min, range.max)
			};
		});

		const { error } = await getRecensioniProfessore(mockSupabase, id_professore, range);

		expect(error).toBeDefined;
	});

	test('Range Errato (min: -2, max: -3)', async () => {
		const id_professore = 1;
		const range = { min: -2, max: -3 };

		const { error } = await getRecensioniProfessore(mockSupabase, id_professore, range);

		expect(error).toBeDefined;
	});

	test('Parametri errati', async () => {
		const { error } = await getRecensioniProfessore(undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

// Test getRecensioneProfessoreUtente
describe('Test Recupero Recensione del Professore di un Utente', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Recensione Utente ID = 2', async () => {
		const id_profilo = 2;
		const id_professore = 14;
		const expectedUsername = `user${id_profilo}`;

		// Simula il comportamento della funzione
		mockSupabase.single.mockResolvedValueOnce({
			data: mockSupabase.recensioniProfessori
				.filter((el) => el.id_professore === id_professore && el.id_profilo === id_profilo)
				.at(0)
		});

		const { data: recensioni } = await getRecensioneProfessoreUtente(
			mockSupabase,
			id_professore,
			id_profilo
		);

		expect(recensioni.descrizione).toBe('Recensione 2');
		expect(recensioni.profiles.username).toBe(expectedUsername);
	});

	test('Ricerca di una Recensione inesistente', async () => {
		const id_profilo = 1;
		const id_professore = 2;

		// Simula il comportamento della funzione
		mockSupabase.single.mockResolvedValueOnce({
			data: mockSupabase.recensioniProfessori
				.filter((el) => el.id_professore === id_professore && el.id_profilo === id_profilo)
				.at(0)
		});

		const { data: recensioni } = await getRecensioneProfessoreUtente(
			mockSupabase,
			id_professore,
			id_profilo
		);

		expect(recensioni).toBeUndefined;
	});

	test('Ricerca con ID Utente Inesistente', async () => {
		const id_profilo = -1;
		const id_professore = 1;

		// Simula il comportamento della funzione
		mockSupabase.single.mockImplementationOnce(() => {
			if (
				!mockSupabase.recensioniProfessori
					.map((el) => {
						return el.id_profilo;
					})
					.includes(id_profilo)
			)
				return { error: new Error('ID Inesistente!') };

			return {
				data: mockSupabase.recensioniProfessori
					.filter((el) => el.id_professore === id_professore && el.id_profilo === id_profilo)
					.at(0)
			};
		});

		const { error } = await getRecensioneProfessoreUtente(mockSupabase, id_professore, id_profilo);

		expect(error.message).toBe('ID Inesistente!');
	});

	test('Parametri Errati', async () => {
		const { error } = await getRecensioneProfessoreUtente(undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Aggiunta Recensione ad un Professore', () => {
	var mockRecensioniProfessori;

	beforeEach(() => {
		mockRecensioniProfessori = [...mockSupabase.recensioniProfessori];

		vi.clearAllMocks();
	});

	test('Corretta Aggiunta di una Recensione', async () => {
		const datiRecensione = {
			descrizione: 'Nuova Recensione',
			valutazione: 2,
			data: new Date().toISOString()
		};
		const id_professore = 1;
		const id_profilo = 1;

		mockSupabase.upsert.mockImplementation((data) => {
			if (!data.id) {
				data.id = mockRecensioniProfessori.length;
			}

			let index = mockRecensioniProfessori.findIndex((obj) => obj.id === data.id);
			if (index >= 0) {
				mockRecensioniProfessori[index] = data;
			} else {
				mockRecensioniProfessori.push(data);
			}
		});

		await addRecensioneProfessore(mockSupabase, datiRecensione, id_professore, id_profilo);

		expect(mockRecensioniProfessori.pop().descrizione).toBe(datiRecensione.descrizione);
	});

	test('Corretto Aggiornamento di una Recensione', async () => {
		const datiRecensione = {
			id: 1,
			descrizione: 'Recensione Modificata',
			valutazione: 2,
			data: new Date().toISOString()
		};
		const id_professore = 1;
		const id_profilo = 1;

		await addRecensioneProfessore(mockSupabase, datiRecensione, id_professore, id_profilo);

		expect(mockRecensioniProfessori.at(0).descrizione).toBe(datiRecensione.descrizione);
	});

	test('Inserimento di una Recensione con Parole Volgari', async () => {
		const datiRecensione = {
			id: 1,
			descrizione: 'Recensione con parole volgari cazz0',
			valutazione: 2,
			data: new Date().toISOString()
		};
		const id_professore = 1;
		const id_profilo = 1;

		const { error } = await addRecensioneProfessore(
			mockSupabase,
			datiRecensione,
			id_professore,
			id_profilo
		);

		expect(error.message).toBe('La recensione contiene parole volgari');
	});

	test('Inserimento di una Recensione con Parametri Errati', async () => {
		const { error } = await addRecensioneProfessore(undefined, undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test("Errore durante l'inserimento di una Recensione", async () => {
		const datiRecensione = {
			descrizione: 'Recensione con Errore Inserimento',
			valutazione: 4,
			data: new Date().toISOString()
		};
		const id_professore = 1;
		const id_profilo = 1;

		mockSupabase.upsert.mockImplementationOnce(() => {
			return { error: new Error("Errore durante l'inserimento!") };
		});

		const { error } = await addRecensioneProfessore(
			mockSupabase,
			datiRecensione,
			id_professore,
			id_profilo
		);

		expect(error.message).toBe("Errore durante l'inserimento!");
	});
});
