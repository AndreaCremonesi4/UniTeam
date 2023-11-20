import blacklist from '../../data/blacklist.json';

export function checkTextValidity(testo) {
	testo = testo.toLowerCase();

	for (let i = 0; i < blacklist.length; i++) {
		if (testo.includes(blacklist[i])) return false;
	}

	return true;
}
