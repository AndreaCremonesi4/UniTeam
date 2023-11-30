import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mockSupabase } from '../../utilities';
import {
	getGruppiUtenteIscritto,
	getGruppiUtenteProprietario,
	getInfoProfilo,
	getRecensioniCorsi,
	getRecensioniProfessori,
	updateProfileUsername
} from '../../../../src/lib/controller/profilo';

describe('Test Recupero dati Profilo Utente tramite ID', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('ID = 2', async () => {
		const id_profilo = 2;

		mockSupabase.single.mockImplementationOnce(() => {
			return {
				data: mockSupabase.profili.filter((profilo) => profilo.id === id_profilo).at(0)
			};
		});

		const { data } = await getInfoProfilo(mockSupabase, id_profilo);

		expect(data.username).toBe('Utente 2');
	});

	test('ID nullo', async () => {
		const { error } = await getInfoProfilo(mockSupabase, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('ID inesistente', async () => {
		const id_profilo = -1;

		mockSupabase.single.mockImplementationOnce(() => {
			if (!mockSupabase.profili.map((profilo) => profilo.id).includes(id_profilo))
				return { error: new Error('Profilo inesistente!') };
		});

		const { error } = await getInfoProfilo(mockSupabase, id_profilo);

		expect(error.message).toBe('Profilo inesistente!');
	});
});

describe('Test Aggiornamento Profilo Utente', () => {
	var mockProfili;

	beforeEach(() => {
		mockProfili = [...mockSupabase.profili];
		vi.clearAllMocks();
	});

	test('Aggiornamento Con Successo', async () => {
		const id_profilo = 1;
		const newUsername = 'Nuovo Username';
		const prevProfilePhoto = mockProfili[0].profile_photo;

		mockSupabase.upsert.mockImplementationOnce((data) => {
			const index = mockProfili.findIndex((obj) => obj.id === data.id);
			mockProfili[index] = {
				...mockProfili[index],
				...data
			};
		});

		await updateProfileUsername(mockSupabase, id_profilo, newUsername);

		expect(mockProfili[0].username).toBe(newUsername);
		expect(mockProfili[0].profile_photo).not.toBe(prevProfilePhoto);
	});

	test("Errore nell'Aggiornamento", async () => {
		const id_profilo = 1;
		const newUsername = 'Nuovo Username';

		mockSupabase.upsert.mockImplementation(() => {
			return { error: new Error("Errore nell'aggiornamento") };
		});

		const { error } = await updateProfileUsername(mockSupabase, id_profilo, newUsername);

		expect(error.message).toBe("Errore nell'aggiornamento");
	});

	test('Parametri Errati', async () => {
		const { error } = await updateProfileUsername(undefined, '  ', undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Ricerca delle Recensioni dei Corsi di un Utente', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Ricerca Delle Recensioni dell'Utente ID = 5", async () => {
		const id_profilo = 5;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.recensioniCorsi
					.filter((recensione) => recensione.id_profilo === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getRecensioniCorsi(mockSupabase, id_profilo, range);

		expect(data.length).toBe(2);
	});

	test("Ricerca Delle Recensioni dell'Utente ID = 4 (Inesistenti)", async () => {
		const id_profilo = 4;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.recensioniCorsi
					.filter((recensione) => recensione.id_profilo === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getRecensioniCorsi(mockSupabase, id_profilo, range);

		expect(data.length).toBe(0);
	});

	test('Ricerca Delle Recensioni di un Utente Inesistente', async () => {
		const id_profilo = -1;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.recensioniCorsi
					.filter((recensione) => recensione.id_profilo === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getRecensioniCorsi(mockSupabase, id_profilo, range);

		expect(data.length).toBe(0);
	});

	test('Ricerca con Range Errato (min: -2, max: 3)', async () => {
		const id_profilo = 5;
		const range = { min: -2, max: 3 };

		const { error } = await getRecensioniCorsi(mockSupabase, id_profilo, range);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Ricerca con Range Errato (min: 5, max: 3)', async () => {
		const id_profilo = 5;
		const range = { min: 5, max: 3 };

		const { error } = await getRecensioniCorsi(mockSupabase, id_profilo, range);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Ricerca con Parametri Errati', async () => {
		const { error } = await getRecensioniCorsi(undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Ricerca delle Recensioni dei Professori di un Utente', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Ricerca Delle Recensioni dell'Utente ID = 12", async () => {
		const id_profilo = 12;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.recensioniProfessori
					.filter((recensione) => recensione.id_profilo === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getRecensioniProfessori(mockSupabase, id_profilo, range);

		expect(data.length).toBe(2);
	});

	test("Ricerca Delle Recensioni dell'Utente ID = 8 (Inesistenti)", async () => {
		const id_profilo = 8;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.recensioniProfessori
					.filter((recensione) => recensione.id_profilo === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getRecensioniProfessori(mockSupabase, id_profilo, range);

		expect(data.length).toBe(0);
	});

	test('Ricerca Delle Recensioni di un Utente Inesistente', async () => {
		const id_profilo = -1;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.recensioniProfessori
					.filter((recensione) => recensione.id_profilo === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getRecensioniProfessori(mockSupabase, id_profilo, range);

		expect(data.length).toBe(0);
	});

	test('Ricerca con Range Errato (min: -1, max: 5)', async () => {
		const id_profilo = 8;
		const range = { min: -1, max: 5 };

		const { error } = await getRecensioniProfessori(mockSupabase, id_profilo, range);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Ricerca con Range Errato (min: 10, max: 7)', async () => {
		const id_profilo = 8;
		const range = { min: 10, max: 7 };

		const { error } = await getRecensioniProfessori(mockSupabase, id_profilo, range);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Ricerca con Parametri Errati', async () => {
		const { error } = await getRecensioniProfessori(undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Ricerca dei Gruppi creati da un Utente', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Ricerca dei Gruppi creati dall'Utente ID = 9", async () => {
		const id_profilo = 9;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.gruppi
					.filter((gruppo) => gruppo.proprietario === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getGruppiUtenteProprietario(mockSupabase, id_profilo, range);

		expect(data[0].nome).toBe('Gruppo4');
		expect(data.length).toBe(1);
	});

	test("Ricerca dei Gruppi creati dall'Utente ID = 11 (Inesistenti)", async () => {
		const id_profilo = 11;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.gruppi
					.filter((gruppo) => gruppo.proprietario === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getGruppiUtenteProprietario(mockSupabase, id_profilo, range);

		expect(data.length).toBe(0);
	});

	test('Ricerca dei Gruppi creati da un Utente Inesistente', async () => {
		const id_profilo = -1;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.gruppi
					.filter((gruppo) => gruppo.proprietario === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getGruppiUtenteProprietario(mockSupabase, id_profilo, range);

		expect(data.length).toBe(0);
	});

	test('Ricerca con Range Errato (min: -5, max: 0)', async () => {
		const id_profilo = 9;
		const range = { min: -5, max: 0 };

		const { error } = await getGruppiUtenteProprietario(mockSupabase, id_profilo, range);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Ricerca con Range Errato (min: 7, max: -2)', async () => {
		const id_profilo = 9;
		const range = { min: 7, max: -2 };

		const { error } = await getGruppiUtenteProprietario(mockSupabase, id_profilo, range);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Ricerca con Parametri Errati', async () => {
		const { error } = await getGruppiUtenteProprietario(undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});

describe('Test Ricerca dei Gruppi a cui un Utente è Iscritto', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Ricerca dei Gruppi a cui è iscritto l'Utente ID = 4", async () => {
		const id_profilo = 4;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.iscrizioni_gruppi
					.filter((iscrizione) => iscrizione.id_profilo === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getGruppiUtenteIscritto(mockSupabase, id_profilo, range);

		expect(data.length).toBe(1);
	});

	test("Ricerca dei Gruppi a cui è iscritto l'Utente ID = 1 (Inesistenti)", async () => {
		const id_profilo = 1;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.iscrizioni_gruppi
					.filter((iscrizione) => iscrizione.id_profilo === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getGruppiUtenteIscritto(mockSupabase, id_profilo, range);

		expect(data.length).toBe(0);
	});

	test("Ricerca dei Gruppi a cui è iscritto un'Utente Inesistente", async () => {
		const id_profilo = -1;
		const range = { min: 0, max: 5 };

		mockSupabase.range.mockImplementationOnce(() => {
			return {
				data: mockSupabase.iscrizioni_gruppi
					.filter((iscrizione) => iscrizione.id_profilo === id_profilo)
					.slice(range.min, range.max)
			};
		});

		const { data } = await getGruppiUtenteIscritto(mockSupabase, id_profilo, range);

		expect(data.length).toBe(0);
	});

	test('Ricerca con Range Errato (min: -3, max: 1)', async () => {
		const id_profilo = 9;
		const range = { min: -3, max: 1 };

		const { error } = await getGruppiUtenteIscritto(mockSupabase, id_profilo, range);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Ricerca con Range Errato (min: 12, max: 11)', async () => {
		const id_profilo = 9;
		const range = { min: 12, max: 11 };

		const { error } = await getGruppiUtenteIscritto(mockSupabase, id_profilo, range);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});

	test('Ricerca con Parametri Errati', async () => {
		const { error } = await getGruppiUtenteIscritto(undefined, undefined, undefined);

		expect(error.message).toBe("Errore nell'inserimento dei parametri");
	});
});
