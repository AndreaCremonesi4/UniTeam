

export async function load({ params, parent }) {
    const parent_data = await parent();

    const { data: corso, error } = await parent_data.supabase
        .from('corsi')
        .select('*')
        .eq("id", params.id);

    return {
        ...parent_data, corso
    }
}