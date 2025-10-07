import { clerkClient } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email requis' });
  }

  try {
    await clerkClient.users.resetPasswordEmailAddress(email);
    return res.status(200).json({ message: 'Email de réinitialisation envoyé.' });
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de l'envoi de l'email." });
  }
}
