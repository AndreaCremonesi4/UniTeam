

export async function load({ params, parent }) {
    const parent_data = await parent();

    const { data: professore, error } = await parent_data.supabase
        .from('professori')
        .select('*')
        .eq("id", params.id);

    return {
        ...parent_data, professore
    }
}


