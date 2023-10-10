import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { getSession } }) => {
    const session = await getSession();

    console.log(session);

    if(!session)
        throw redirect(303, '/login');
    // TODO riportare a questa pagina una volta eseguito l'accesso

    return {
      session: session
    }
}