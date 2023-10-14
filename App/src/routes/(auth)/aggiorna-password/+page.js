import { error } from '@sveltejs/kit';

export async function load({ url, parent }) {
    const data = await parent();

    const authError = url.searchParams.get('error');
    if(authError)
	    throw error(url.searchParams.get('error_code'), url.searchParams.get('error_description'));

    return data;
}