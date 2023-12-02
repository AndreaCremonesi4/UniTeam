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

// Mock di Supabase per simulare il comportamento delle chiamate a funzioni
export const mockSupabase = {
	rpc: vi.fn(),
	auth: {
		signInWithPassword: vi.fn(),
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
