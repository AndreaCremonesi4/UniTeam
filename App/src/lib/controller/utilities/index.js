import blacklist from '../../data/blacklist.json';

export function checkReviewValidity(testoRecensione) {
	testoRecensione = testoRecensione.toLowerCase();

	for (let i = 0; i < blacklist.length; i++) {
		if (testoRecensione.includes(blacklist[i])) return false;
	}

	return true;
}
