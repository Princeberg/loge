// /pages/api/send-notif.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // clé avec droits lecture
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId } = req.body;

    try {
      // Récupérer l'order avec le produit associé
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select(`
          id,
          id_product,
          products:products(id_seller)
        `)
        .eq('id', orderId)
        .single();

      if (orderError || !orderData) {
        return res.status(404).json({ success: false, error: orderError || 'Order not found' });
      }

      const product = orderData.products;
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }

      // Récupérer le seller correspondant
      const { data: seller, error: sellerError } = await supabase
        .from('sellers')
        .select('id_user')
        .eq('id', product.id_seller)
        .single();

      if (sellerError || !seller) {
        return res.status(404).json({ success: false, error: sellerError || 'Seller not found' });
      }

      
      const response = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
        },
        body: JSON.stringify({
          app_id: process.env.ONESIGNAL_APP_ID,
          include_external_user_ids: [seller.id_user],
          headings: { en: 'Nouvelle commande !' },
          contents: { en: `Vous avez une nouvelle commande (#${orderId})` },
          url: `/dashboard/orders/${orderId}`,
        }),
      });

      const data = await response.json();
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
