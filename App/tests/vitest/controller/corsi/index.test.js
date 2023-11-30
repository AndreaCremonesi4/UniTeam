import {
	addRecensioneCorso,
	getAnni,
	getCorsiWithCount,
	getCorsoById,
	getFacolta,
	getRecensioneCorsoUtente,
	getRecensioniCorso
} from '../../../../src/lib/controller/corsi';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mockSupabase } from '../../utilities';

describe('Test Recupero dati Corso tramite ID', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('ID = 4', async () => {
		const id_corso = 4;

		mockSupabase.single.mockImplementationOnce(() => {
			return {
				data: mockSupabase.corsi.filter((corso) => corso.id == id_corso).at(0)
			};
		});

		const { data } = await getCorsoById(mockSupabase, id_corso);

		expect(data.nome).toBe('MUSEOLOGIA');
	});

	test('ID nullo', async () => {
		const id_corso = undefined;
		const { error } = await getCorsoById(mockSupabase, id_corso);

		expect(error).toBeDefined();
	});

	test('ID inesistente', async () => {
		const id_corso = -1;

		mockSupabase.single.mockImplementationOnce(() => {
			if (!mockSupabase.corsi.map((corso) => corso.id).includes(id_corso))
				return { error: new Error('Corso inesistente!') };
			return {
				data: mockSupabase.corsi.filter((corso) => corso.id == id_corso).at(0)
			};
		});

		const { error } = await getCorsoById(mockSupabase, id_corso);

		expect(error.message).toBe('Corso inesistente!');
	});
});

describe('Test Recupero dei Corsi', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Ricerca senza filtri', async () => {
		const filtroNome = '';
		const filtroAnno = '';
		const filtroFacolta = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return { data: mockSupabase.corsi.slice(page * pageSize, pageSize + page * pageSize) };
		});

		const { data } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		expect(data.length).toBe(10);
	});

	test('Ricerca tamite Nome', async () => {
		const filtroNome = 'LETTERATURA GIAPPONESE 1';
		const filtroAnno = '';
		const filtroFacolta = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.corsi
					.filter((corso) => corso.nome === filtroNome)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		expect(data[0].nome).toBe(filtroNome);
	});

	test('Ricerca tramite Anno', async () => {
		const filtroNome = '';
		const filtroAnno = '1°anno (Triennale)';
		const filtroFacolta = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.corsi
					.filter((corso) => corso.anno_full === filtroAnno)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		data.forEach((element) => {
			expect(element.anno_full).toBe(filtroAnno);
		});
	});

	test('Ricerca tramite Facoltà', async () => {
		const filtroNome = '';
		const filtroAnno = '';
		const filtroFacolta = 'Lettere';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.corsi
					.filter((corso) => corso.facolta === filtroFacolta)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		data.forEach((element) => {
			expect(element.facolta).toBe(filtroFacolta);
		});
	});

	test('Ricerca Corso tramite Nome, Anno e Facoltà', async () => {
		const filtroNome = 'MUSEOLOGIA';
		const filtroAnno = '2°anno (Triennale)';
		const filtroFacolta = 'Lettere';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.corsi
					.filter(
						(corso) =>
							corso.nome === filtroNome &&
							corso.anno_full === filtroAnno &&
							corso.facolta === filtroFacolta
					)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		expect(data.length).toBe(1);
	});

	test('Ricerca di un Nome Inesistente', async () => {
		const filtroNome = 'Nome Inesistente';
		const filtroAnno = '';
		const filtroFacolta = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.corsi
					.filter((corso) => corso.nome === filtroNome)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		expect(data.length).toBe(0);
	});

	test('Ricerca di un Anno Inesistente', async () => {
		const filtroNome = '';
		const filtroAnno = 'Anno Inesistente';
		const filtroFacolta = '';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.corsi
					.filter((corso) => corso.anno_full === filtroAnno)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		expect(data.length).toBe(0);
	});

	test('Ricerca di una Facoltà Inesistente', async () => {
		const filtroNome = '';
		const filtroAnno = '';
		const filtroFacolta = 'Facoltà Inesistente';
		const page = 0;
		const pageSize = 10;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.corsi
					.filter((corso) => corso.facolta === filtroFacolta)
					.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		expect(data.length).toBe(0);
	});

	test('Ricerca con Paginazione di 5', async () => {
		const filtroNome = '';
		const filtroAnno = '';
		const filtroFacolta = '';
		const page = 0;
		const pageSize = 5;

		mockSupabase.order.mockImplementationOnce(() => {
			return {
				data: mockSupabase.corsi.slice(page * pageSize, pageSize + page * pageSize)
			};
		});

		const { data } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		expect(data.length).toBe(5);
	});

	test('Ricerca con Paginazione di 0', async () => {
		const filtroNome = '';
		const filtroAnno = '';
		const filtroFacolta = '';
		const page = 0;
		const pageSize = 0;

		const { error } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		expect(error).toBeDefined;
	});

	test('Ricerca con Paginazione negativa', async () => {
		const filtroNome = '';
		const filtroAnno = '';
		const filtroFacolta = '';
		const page = 0;
		const pageSize = 0;

		const { error } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		expect(error).toBeDefined;
	});

	test('Ricerca con Parametri nulli', async () => {
		const filtroNome = undefined;
		const filtroAnno = undefined;
		const filtroFacolta = undefined;
		const page = undefined;
		const pageSize = undefined;

		const { error } = await getCorsiWithCount(
			mockSupabase,
			filtroNome,
			filtroAnno,
			filtroFacolta,
			page,
			pageSize
		);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Funzione RPC "getAnni"', () => {
	test('Parametri corretti', async () => {
		mockSupabase.rpc.mockImplementationOnce(() => {
			const anni = mockSupabase.corsi.map((corso) => corso.anno_full);
			return {
				data: anni.filter((val, index) => anni.indexOf(val) === index)
			};
		});

		const result = await getAnni(mockSupabase);

		expect(result.length).toBeGreaterThan(0);
	});

	test('Parametri non corretti', async () => {
		const { error } = await getAnni(undefined);

		expect(error).toBeUndefined;
	});
});

describe('Test Funzione RPC "getFacolta"', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Parametri corretti', async () => {
		mockSupabase.rpc.mockImplementationOnce(() => {
			const anni = mockSupabase.corsi.map((corso) => corso.facolta);
			return {
				data: anni.filter((val, index) => anni.indexOf(val) === index)
			};
		});

		const result = await getFacolta(mockSupabase);

		expect(result.length).toBeGreaterThan(0);
	});

	test('Parametri non corretti', async () => {
		const { error } = await getFacolta(undefined);

		expect(error).toBeUndefined;
	});
});

// Test GetRecensioniCorso
describe('Test Recupero Recensioni di un Corso', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Ultime 10 recensioni del Corso con ID = 1', async () => {
		const id_corso = 1;
		const range = { min: 0, max: 10 };

		// Simula il comportamento della funzione
		mockSupabase.range.mockResolvedValueOnce({
			data: mockSupabase.recensioniCorsi
				.filter((el) => el.id_corso === id_corso)
				.splice(range.min, range.max)
		});

		const { data: recensioni } = await getRecensioniCorso(mockSupabase, id_corso, range);

		expect(recensioni.length).toBe(4);
	});

	test('Ultime 10 recensioni del Corso con ID = 2 (Inesistenti)', async () => {
		const id_corso = 2;
		const range = { min: 0, max: 10 };

		// Simula il comportamento della funzione
		mockSupabase.range.mockResolvedValueOnce({
			data: mockSupabase.recensioniCorsi
				.filter((el) => el.id_corso === id_corso)
				.splice(range.min, range.max)
		});

		const { data: recensioni } = await getRecensioniCorso(mockSupabase, id_corso, range);

		expect(recensioni.length).toBe(0);
	});

	test('ID corso inesistente', async () => {
		const id_corso = -1;
		const range = { min: 0, max: 10 };

		mockSupabase.range.mockImplementationOnce(() => {
			if (
				!mockSupabase.recensioniCorsi
					.map((el) => {
						return el.id_corso;
					})
					.includes(id_corso)
			)
				return { error: new Error('ID Inesistente!') };

			return {
				data: mockSupabase.recensioniCorsi
					.filter((el) => el.id_corso === id_corso)
					.splice(range.min, range.max)
			};
		});

		const { error } = await getRecensioniCorso(mockSupabase, id_corso, range);

		expect(error).toBeDefined;
	});

	test('Range Errato (min: -2, max: -3)', async () => {
		const id_corso = 1;
		const range = { min: -2, max: -3 };

		const { error } = await getRecensioniCorso(mockSupabase, id_corso, range);

		expect(error).toBeDefined;
	});

	test('Parametri errati', async () => {
		const { error } = await getRecensioniCorso(undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

// Test getRecensioneCorsoUtente
describe('Test Recupero Recensione del Corso di un Utente', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Recensione Utente ID = 10', async () => {
		const id_profilo = 10;
		const id_corso = 7;
		const expectedUsername = `user${id_profilo}`;

		// Simula il comportamento della funzione
		mockSupabase.single.mockResolvedValueOnce({
			data: mockSupabase.recensioniCorsi
				.filter((el) => el.id_corso === id_corso && el.id_profilo === id_profilo)
				.at(0)
		});

		const { data: recensione } = await getRecensioneCorsoUtente(mockSupabase, id_corso, id_profilo);

		expect(recensione.descrizione).toBe('Recensione 10');
		expect(recensione.profiles.username).toBe(expectedUsername);
	});

	test('Recensione di una Recensione inesistente', async () => {
		const id_profilo = 1;
		const id_corso = 2;

		// Simula il comportamento della funzione
		mockSupabase.single.mockResolvedValueOnce({
			data: mockSupabase.recensioniCorsi
				.filter((el) => el.id_corso === id_corso && el.id_profilo === id_profilo)
				.at(0)
		});

		const { data: recensione } = await getRecensioneCorsoUtente(mockSupabase, id_corso, id_profilo);

		expect(recensione).toBeUndefined;
	});

	test('Ricerca con ID Utente Inesistente', async () => {
		const id_profilo = -1;
		const id_corso = 1;

		// Simula il comportamento della funzione
		mockSupabase.single.mockImplementationOnce(() => {
			if (
				!mockSupabase.recensioniCorsi
					.map((el) => {
						return el.id_profilo;
					})
					.includes(id_profilo)
			)
				return { error: new Error('ID Inesistente!') };

			return {
				data: mockSupabase.recensioniCorsi
					.filter((el) => el.id_corso === id_corso && el.id_profilo === id_profilo)
					.at(0)
			};
		});

		const { error } = await getRecensioneCorsoUtente(mockSupabase, id_corso, id_profilo);

		expect(error.message).toBe('ID Inesistente!');
	});

	test('Parametri Errati', async () => {
		const { error } = await getRecensioneCorsoUtente(undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Aggiunta Recensione ad un Corso', () => {
	var mockRecensioniCorsi;

	beforeEach(() => {
		mockRecensioniCorsi = [...mockSupabase.recensioniCorsi];

		vi.clearAllMocks();
	});

	test('Corretta Aggiunta di una Recensione', async () => {
		const datiRecensione = {
			descrizione: 'Nuova Recensione',
			valutazione: 2,
			data: new Date().toISOString()
		};
		const id_corso = 1;
		const id_profilo = 1;

		mockSupabase.upsert.mockImplementation((data) => {
			if (!data.id) {
				data.id = mockRecensioniCorsi.length;
			}

			let index = mockRecensioniCorsi.findIndex((obj) => obj.id === data.id);
			if (index >= 0) {
				mockRecensioniCorsi[index] = data;
			} else {
				mockRecensioniCorsi.push(data);
			}
		});

		await addRecensioneCorso(mockSupabase, datiRecensione, id_corso, id_profilo);

		expect(mockRecensioniCorsi.at(19).descrizione).toBe(datiRecensione.descrizione);
	});

	test('Corretto Aggiornamento di una Recensione', async () => {
		const datiRecensione = {
			id: 1,
			descrizione: 'Recensione Modificata',
			valutazione: 2,
			data: new Date().toISOString()
		};
		const id_corso = 1;
		const id_profilo = 1;

		await addRecensioneCorso(mockSupabase, datiRecensione, id_corso, id_profilo);

		expect(mockRecensioniCorsi.at(0).descrizione).toBe(datiRecensione.descrizione);
	});

	test('Inserimento di una Recensione con Parole Volgari', async () => {
		const datiRecensione = {
			id: 1,
			descrizione: 'Recensione con parole volgari cazz0',
			valutazione: 2,
			data: new Date().toISOString()
		};
		const id_corso = 1;
		const id_profilo = 1;

		const { error } = await addRecensioneCorso(mockSupabase, datiRecensione, id_corso, id_profilo);

		expect(error.message).toBe('La recensione contiene parole volgari');
	});

	test('Inserimento di una Recensione con Parametri Errati', async () => {
		const { error } = await addRecensioneCorso(undefined, undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test("Errore durante l'inserimento di una Recensione", async () => {
		const datiRecensione = {
			descrizione: 'Recensione con Errore Inserimento',
			valutazione: 4,
			data: new Date().toISOString()
		};
		const id_corso = 1;
		const id_profilo = 1;

		mockSupabase.upsert.mockImplementationOnce(() => {
			return { error: new Error("Errore durante l'inserimento!") };
		});

		const { error } = await addRecensioneCorso(mockSupabase, datiRecensione, id_corso, id_profilo);

		expect(error.message).toBe("Errore durante l'inserimento!");
	});
});
