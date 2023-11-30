import { vi } from 'vitest';
import {
	profili,
	corsi,
	professori,
	recensioniCorsi,
	recensioniProfessori,
	gruppi,
	iscrizioni_gruppi,
	messaggi
} from './data';

// ============== MOCK DI SUPABASE ============== //

/*function generaRecensioniCorsi() {
	let recensioni = [];
	for (let i = 0; i < 20; i++) {
		recensioni.push({
			id: i,
			descrizione: `Recensione ${i}`,
			valutazione: (i % 5) + 1,
			data_modifica: new Date().toISOString(),
			id_profilo: i,
			profiles: { username: `user${i}` },
			id_corso: 1
		});
	}

	return recensioni;
}

function generaRecensioniProfessori() {
	let recensioni = [];
	for (let i = 0; i < 20; i++) {
		recensioni.push({
			id: i,
			descrizione: `Recensione ${i}`,
			valutazione: (i % 5) + 1,
			data_modifica: new Date().toISOString(),
			id_profilo: i,
			profiles: { username: `user${i}` },
			id_professore: 1
		});
	}

	return recensioni;
}

// generazione dei corsi
let recensioniCorsi = generaRecensioniCorsi();
let recensioniProfessori = generaRecensioniProfessori();*/

// Mock di Supabase per simulare il comportamento delle chiamate a funzioni
export const mockSupabase = {
	rpc: vi.fn(),
	auth: {
		signInWithPassword: vi.fn().mockImplementation((data) => {
			if (data.email == 'test@example.com' && data.password == 'StrongPass123!') return { data };

			return { error: new Error('Credenziali Invalide!') };
		}),
		signUp: vi.fn()
	},
	storage: {
		from: vi.fn().mockImplementation(() => mockSupabase.storage),
		getPublicUrl: vi.fn().mockImplementation(() => mockSupabase.storage),
		upload: vi.fn().mockImplementation(() => mockSupabase.storage)
	},
	select: vi.fn().mockImplementation(() => mockSupabase),
	from: vi.fn().mockImplementation(() => mockSupabase),
	eq: vi.fn().mockImplementation(() => mockSupabase),
	range: vi.fn().mockImplementation(() => mockSupabase),
	single: vi.fn().mockImplementation(() => mockSupabase),
	match: vi.fn().mockImplementation(() => mockSupabase),
	upsert: vi.fn().mockImplementation(() => mockSupabase),
	order: vi.fn().mockImplementation(() => mockSupabase),
	ilike: vi.fn().mockImplementation(() => mockSupabase),
	or: vi.fn().mockImplementation(() => mockSupabase),
	insert: vi.fn().mockImplementation(() => mockSupabase),
	delete: vi.fn().mockImplementation(() => mockSupabase),
	profili,
	recensioniCorsi,
	corsi,
	recensioniProfessori,
	professori,
	gruppi,
	iscrizioni_gruppi,
	messaggi
};
