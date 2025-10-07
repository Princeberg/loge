function uploadImageToCloudinary(file, fileName = '') {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      return reject(new Error("Fichier image non valide"));
    }

    // Extraire l'extension du fichier original
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    if (!validExtensions.includes(fileExtension)) {
      return reject(new Error("Type de fichier non supporté. Utilisez JPG, PNG ou WEBP"));
    }

    // Créer un nom de fichier sécurisé et unique
    const uniqueId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now();
    const safeFileName = fileName 
      ? fileName.toLowerCase()
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
      : `product-${timestamp}-${uniqueId}`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'produits');
    formData.append('public_id', `products/${safeFileName}`);
    formData.append('tags', 'produit,webp');
    formData.append('folder', 'products'); // Ajout d'un dossier spécifique
    // Removed: formData.append('use_filename', 'true');
    // Removed: formData.append('unique_filename', 'true');

    fetch('https://api.cloudinary.com/v1_1/dryaemkif/image/upload', {
      method: 'POST',
      body: formData
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          console.error("Erreur Cloudinary détaillée:", data);
          throw new Error(data.error?.message || "Échec de l'upload");
        }
        return data;
      })
      .then(data => {
        if (data.secure_url) {
          // Générer URL optimisée en WebP
          const webpUrl = data.secure_url
            .replace('/upload/', '/upload/f_webp,q_auto/')
            .replace(/\.(jpg|jpeg|png|gif|bmp|tiff)$/i, '.webp');

          resolve({
            url: webpUrl,
            public_id: data.public_id,
            original_filename: data.original_filename,
            format: data.format,
            width: data.width,
            height: data.height
          });
        } else {
          throw new Error("URL sécurisée non reçue de Cloudinary");
        }
      })
      .catch(err => {
        console.error("❌ Erreur Cloudinary:", err);
        reject(new Error(err.message || "Échec de l'upload vers Cloudinary"));
      });
  });
}

export { uploadImageToCloudinary };