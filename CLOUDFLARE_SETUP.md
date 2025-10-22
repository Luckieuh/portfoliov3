# Configuration Cloudflare R2 pour le stockage d'images

## Étapes de configuration

### 1. Créer un bucket Cloudflare R2

1. Connectez-vous à votre tableau de bord Cloudflare
2. Allez dans **R2** dans le menu de gauche
3. Cliquez sur **Create bucket**
4. Donnez un nom à votre bucket (ex: `portfolio-images`)
5. Cliquez sur **Create bucket**

### 2. Générer les clés d'accès API

1. Dans R2, cliquez sur **Manage R2 API Tokens**
2. Cliquez sur **Create API token**
3. Donnez un nom au token (ex: `portfolio-upload`)
4. Sélectionnez les permissions :
   - **Object Read & Write** pour le bucket
5. Cliquez sur **Create API Token**
6. **Sauvegardez** l'Access Key ID et le Secret Access Key (ils ne seront affichés qu'une fois)
Access Key ID : b0844e109254302b4b5856390eeaedce

Secret Access Key : 7767d378d37af153455cace1f31a5468c83c6eab07f1a44fcfb489327482b259


### 3. Configurer le domaine public (optionnel mais recommandé)

1. Dans votre bucket, allez dans **Settings**
2. Dans **Public access**, cliquez sur **Connect Domain**
3. Ajoutez un sous-domaine (ex: `cdn.votre-domaine.com`)
4. Suivez les instructions pour configurer le DNS

### 4. Configurer les variables d'environnement

Modifiez le fichier `.env.local` avec vos informations :

```env
# Cloudflare R2 Configuration
CLOUDFLARE_R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=votre_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=votre_secret_access_key
CLOUDFLARE_R2_BUCKET_NAME=nom-de-votre-bucket
CLOUDFLARE_R2_PUBLIC_URL=https://cdn.votre-domaine.com
```

**Où trouver votre ACCOUNT_ID** : 
- Dans l'URL de votre tableau de bord Cloudflare
- Ou dans **R2 > Overview**, dans la section "S3 API"

### 5. Redémarrer le serveur

```bash
npm run dev
```

## Utilisation

### API Routes disponibles

#### Upload d'un fichier
```
POST /api/upload
Content-Type: multipart/form-data
Body: file (File)

Response:
{
  "success": true,
  "url": "https://cdn.votre-domaine.com/uuid.jpg",
  "fileName": "uuid.jpg"
}
```

#### Supprimer un fichier
```
DELETE /api/delete
Content-Type: application/json
Body: { "fileName": "uuid.jpg" }

Response:
{
  "success": true,
  "message": "Fichier supprimé avec succès"
}
```

#### Créer une réalisation
```
POST /api/realisations
Content-Type: application/json
Body: {
  "title": "Titre",
  "description": "Description",
  "imageUrl": "https://...",
  "videoUrl": "https://...",
  "link": "https://...",
  "categories": ["photo", "voyage"]
}
```

#### Récupérer toutes les réalisations
```
GET /api/realisations
```

#### Récupérer une réalisation
```
GET /api/realisations/[id]
```

#### Mettre à jour une réalisation
```
PUT /api/realisations/[id]
Content-Type: application/json
Body: { ... }
```

#### Supprimer une réalisation
```
DELETE /api/realisations/[id]
```

## Exemple d'utilisation du composant ImageUpload

```tsx
import ImageUpload from '@/app/components/ImageUpload';

function MonComposant() {
  const handleUploadSuccess = (url: string) => {
    console.log('Image uploadée:', url);
    // Utilisez l'URL pour créer/modifier une réalisation
  };

  return (
    <ImageUpload 
      onUploadSuccess={handleUploadSuccess}
      maxSize={10} // 10MB max
    />
  );
}
```

## Sécurité

- Les clés API ne doivent **jamais** être commitées dans Git
- Le fichier `.env.local` est dans `.gitignore` par défaut
- Configurez les CORS sur Cloudflare si nécessaire
- Limitez les permissions des API tokens au strict minimum

## Types de fichiers supportés

- Images: JPEG, JPG, PNG, GIF, WebP
- Vidéos: MP4, WebM

## Limites

- Taille maximale par défaut: 10MB (modifiable)
- Vous pouvez ajuster la limite dans le composant ImageUpload
