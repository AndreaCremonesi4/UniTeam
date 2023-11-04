export async function load({ parent }) {
    const parent_data = await parent();
    const { data: professori, error } = await parent_data.supabase
        .from('professori')
        .select('*');
    return {
        ...parent_data, professori
    }
}
