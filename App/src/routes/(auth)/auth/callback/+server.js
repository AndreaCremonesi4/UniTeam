import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get('code');
  const redirectTo = url.searchParams.get('redirectTo');

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  throw redirect(303, redirectTo ?? '/');
}