import {
	signInWithEmailAndPassword,
	signUpWithEmailAndPassword,
	validateEmail,
	validatePassword,
	checkIfUsernameExists
} from '../../../../src/lib/controller/auth';

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mockSupabase } from '../../utilities';

describe('Test Validità Formato Email', () => {
	test('Email valida', () => {
		const email = 'test@example.com';
		expect(validateEmail(email)).toBeTruthy();
	});

	test('Email valida con caratteri speciali', () => {
		const email = 'user.name+tag@example.co.uk';
		expect(validateEmail(email)).toBeTruthy();
	});

	test('Email valida con dominio multilivello', () => {
		const email = 'user@sub.domain.example';
		expect(validateEmail(email)).toBeTruthy();
	});

	test('Email non valida senza "@"', () => {
		const email = 'invalidemail.com';
		expect(validateEmail(email)).toBeFalsy();
	});

	test('Email non valida senza dominio', () => {
		const email = 'user@invalid';
		expect(validateEmail(email)).toBeFalsy();
	});

	test('Email non valida con spazi', () => {
		const email = 'user @example.com';
		expect(validateEmail(email)).toBeFalsy();
	});

	test('Email non valida con più "@"', () => {
		const email = 'user@domain@example.com';
		expect(validateEmail(email)).toBeFalsy();
	});

	test('Email non valida con punti in posizioni non valide', () => {
		const email = 'user@.example.com';
		expect(validateEmail(email)).toBeFalsy();
	});
});

describe('Test Validità Formato Password', () => {
	test('Password valida', () => {
		const password = 'StrongPass123!';
		expect(validatePassword(password)).toBeNull();
	});

	test('Password valida con lunghezza 5', () => {
		const password = 'Pas1!';
		expect(validatePassword(password, 5)).toBeNull();
	});

	test('Password non valida con lunghezza insufficiente', () => {
		const password = 'Weak1!';
		expect(validatePassword(password, 10)).toBe('La password deve contenere almeno 10 caratteri');
	});

	test('Password non valida senza lettera minuscola', () => {
		const password = 'NOPASSWORD1!';
		expect(validatePassword(password)).toBe(
			'La password deve contenere almeno una lettera minuscola'
		);
	});

	test('Password non valida senza lettera maiuscola', () => {
		const password = 'nopassword1!';
		expect(validatePassword(password)).toBe(
			'La password deve contenere almeno una lettera maiuscola'
		);
	});

	test('Password non valida senza numero', () => {
		const password = 'NoPassword!';
		expect(validatePassword(password)).toBe('La password deve contenere almeno un numero');
	});

	test('Password non valida senza carattere speciale', () => {
		const password = 'NoPassword123';
		expect(validatePassword(password)).toBe(
			'La password deve contenere almeno un carattere speciale'
		);
	});
});

describe('Test Login con Email e Password', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Parametri validi', async () => {
		const email = 'test@example.com';
		const password = 'StrongPass123!';

		await signInWithEmailAndPassword(mockSupabase, email, password);

		expect(mockSupabase.auth.signInWithPassword).toBeCalledWith({ email, password });
	});

	test('Parametri mancanti', async () => {
		const result = await signInWithEmailAndPassword(mockSupabase, '', '');

		expect(mockSupabase.auth.signInWithPassword).not.toHaveBeenCalled();
		expect(result).toEqual({ error: new Error('Errore nel passaggio dei parametri') });
	});

	test('Credenziali Errate', async () => {
		mockSupabase.auth.signInWithPassword.mockImplementationOnce((data) => {
			if (data.email == 'test@example.com' && data.password == 'StrongPass123!') return { data };

			return { error: new Error('Credenziali Invalide!') };
		});

		const { error } = await signInWithEmailAndPassword(
			mockSupabase,
			'wrongmail@mail.com',
			'wronGPass321!'
		);

		expect(error).toBeDefined;
	});
});

describe('Test Registrazione con Email e Password', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Parametri validi', async () => {
		const email = 'test@example.com';
		const password = 'StrongPass123!';
		const username = 'Username';
		const redirectTo = '/';

		mockSupabase.rpc.mockResolvedValueOnce({ data: {} });

		await signUpWithEmailAndPassword(mockSupabase, email, password, username, redirectTo);

		expect(mockSupabase.auth.signUp).toHaveBeenCalled;
	});

	test('Errore durante la registrazione', async () => {
		const email = 'test@example.com';
		const password = 'StrongPass123!';
		const username = 'Username';
		const redirectTo = '/';

		// Simula una chiamata Supabase che restituisce un errore
		const supabaseError = new Error('Errore di autenticazione');
		mockSupabase.auth.signUp.mockRejectedValueOnce(supabaseError);

		mockSupabase.rpc.mockResolvedValue({ data: {} });

		const result = await signUpWithEmailAndPassword(
			mockSupabase,
			email,
			password,
			username,
			redirectTo
		);

		expect(result.error).toBeDefined;
	});

	test('Parametri mancanti', async () => {
		const result = await signUpWithEmailAndPassword(mockSupabase, '', '', '', '');

		expect(mockSupabase.auth.signUp).not.toHaveBeenCalled();
		expect(result).toEqual({ error: new Error('Errore nel passaggio dei parametri') });
	});
});

describe('Test Verifica Nome Utente Disponibile', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('Nome utente esiste', async () => {
		const username = 'existingUsername';

		mockSupabase.rpc.mockResolvedValueOnce({ data: true });

		const result = await checkIfUsernameExists(mockSupabase, username);

		expect(mockSupabase.rpc).toHaveBeenCalledWith('check_username_exists', {
			p_username: 'existingUsername'
		});
		expect(result).toBe(true);
	});

	test('Nome utente non esistente', async () => {
		const username = 'nonExistingUsername';

		mockSupabase.rpc.mockResolvedValueOnce({ data: false });

		const result = await checkIfUsernameExists(mockSupabase, username);

		expect(mockSupabase.rpc).toHaveBeenCalledWith('check_username_exists', {
			p_username: 'nonExistingUsername'
		});
		expect(result).toBe(false);
	});

	test('Parametri mancanti', async () => {
		const result = await checkIfUsernameExists(mockSupabase, '');

		expect(mockSupabase.rpc).not.toHaveBeenCalled();
		expect(result).toBe(false);
	});
});
