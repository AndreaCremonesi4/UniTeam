import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { getSession }, url }) => {
    const session = await getSession();

    if(!session)
        throw redirect(303, `/login?redirectTo=${url.pathname}`);

    return {
      session: session
    }
}