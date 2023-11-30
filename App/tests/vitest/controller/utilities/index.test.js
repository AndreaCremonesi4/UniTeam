import { checkTextValidity, convertiDataMessaggio } from '../../../../src/lib/controller/utilities';
import { describe, expect, test } from 'vitest';

describe('Test Validità Testo', () => {
	test('Test di base con stringa valida', () => {
		const testo = 'Questo è un testo valido.';
		expect(checkTextValidity(testo)).toBe(true);
	});

	test('Test con stringa che contiene una parola nella blacklist', () => {
		const testo = 'Cazz0';
		expect(checkTextValidity(testo)).toBe(false);
	});

	test('Test con stringa che contiene parole nella blacklist, ma in maiuscolo', () => {
		const testo = 'BASTARDO';
		expect(checkTextValidity(testo)).toBe(false);
	});

	test('Test con stringa vuota', () => {
		const testo = '';
		expect(checkTextValidity(testo)).toBe(true);
	});

	test('Test con stringa contenente solo spazi bianchi', () => {
		const testo = '     ';
		expect(checkTextValidity(testo)).toBe(true);
	});

	test('Test con stringa contenente solo parole non vietate', () => {
		const testo = 'Questo testo contiene solo parole ammissibili.';
		expect(checkTextValidity(testo)).toBe(true);
	});

	test('Test con stringa contenente parole non vietate e parole vietate', () => {
		const testo = 'Questo testo contiene parole non vietate e C0glion3.';
		expect(checkTextValidity(testo)).toBe(false);
	});
});

describe('Test Conversione Formato Data', () => {
	test('Test con data valida', () => {
		const dataString = '2023-01-15T12:30:00';
		expect(convertiDataMessaggio(dataString)).toBe('15/01/2023 - 12:30');
	});

	test('Test con data vuota', () => {
		const dataString = '';
		expect(convertiDataMessaggio(dataString)).toBeUndefined();
	});

	test('Test con data con soli spazi bianchi', () => {
		const dataString = '    ';
		expect(convertiDataMessaggio(dataString)).toBeUndefined();
	});

	test('Test con data nulla', () => {
		const dataString = null;
		expect(convertiDataMessaggio(dataString)).toBeUndefined();
	});

	test('Test con data nel formato non valido', () => {
		const dataString = 'DataNonValida';
		expect(convertiDataMessaggio(dataString)).toBeUndefined();
	});
});
