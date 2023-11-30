import blacklist from '../../data/blacklist.json';

export function checkTextValidity(testo) {
	testo = testo.toLowerCase();

	for (let i = 0; i < blacklist.length; i++) {
		if (testo.includes(blacklist[i])) return false;
	}

	return true;
}

// Viewport observer

let intersectionObserver;

function ensureIntersectionObserver() {
	if (intersectionObserver) return;

	intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport';
			entry.target.dispatchEvent(new CustomEvent(eventName));
		});
	});
}

export default function viewport(element) {
	ensureIntersectionObserver();

	intersectionObserver.observe(element);

	return {
		destroy() {
			intersectionObserver.unobserve(element);
		}
	};
}

export function convertiDataMessaggio(dataString) {
	if (!dataString?.trim()) return undefined;

	const data = new Date(dataString);

	if (!isValidDate(data)) return undefined;

	const minuti = data.getMinutes().toString().padStart(2, '0');
	const ore = data.getHours().toString().padStart(2, '0');
	const giorno = data.getDate().toString().padStart(2, '0');
	const mese = (data.getMonth() + 1).toString().padStart(2, '0');
	const anno = data.getFullYear();

	const dataFormattata = `${giorno}/${mese}/${anno} - ${ore}:${minuti}`;

	return dataFormattata;
}

function isValidDate(date) {
	return date instanceof Date && !isNaN(date);
}
