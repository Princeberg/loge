// /pages/api/delete-account.js
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch'; 

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId manquant' });

  try {
    // 1️⃣ Supprimer le vendeur lié à l’utilisateur Clerk
    const { error: sellerError } = await supabaseAdmin
      .from('sellers')
      .delete()
      .eq('id_user', userId);

    if (sellerError) throw sellerError;

    // 2️⃣ Supprimer le compte Clerk via l’API REST
    const clerkRes = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!clerkRes.ok) {
      const text = await clerkRes.text();
      console.error('Erreur Clerk API:', clerkRes.status, text);
      return res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur Clerk' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Erreur suppression compte:', err);
    return res.status(500).json({ error: 'Erreur lors de la suppression du compte' });
  }
}
