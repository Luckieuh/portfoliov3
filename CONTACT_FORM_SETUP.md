# Configuration du Formulaire de Contact

## 📧 Mise en place de l'envoi d'emails

Le formulaire de contact utilise **Gmail** pour envoyer les messages. Voici comment configurer:

### Étapes de configuration:

1. **Créer un mot de passe d'application Gmail:**
   - Allez sur [Google Account Security](https://myaccount.google.com/apppasswords)
   - Authentifiez-vous avec votre compte Google
   - Sélectionnez **Mail** comme application
   - Sélectionnez **Windows Computer** comme appareil
   - Google générera un mot de passe de **16 caractères**

2. **Configurer les variables d'environnement:**
   - Copiez `.env.local.example` en `.env.local`
   - Remplissez:
     ```
     GMAIL_USER=votre-email@gmail.com
     GMAIL_PASSWORD=votre-mot-de-passe-16-caracteres
     ```

3. **Redémarrer le serveur:**
   ```bash
   npm run dev
   ```

### Fonctionnalités du formulaire:

✅ Formulaire réutilisable sur les pages:
- Page d'accueil (`/`)
- Page À propos (`/a-propos`)
- Page Réalisations (`/realisations`)

✅ Envoi d'emails:
- Email reçu par Lucas à `lucas2.thom@gmail.com`
- Email de confirmation à l'utilisateur

✅ Validations:
- Tous les champs obligatoires
- Gestion des erreurs
- Messages de succès/erreur
- Loading state pendant l'envoi

### API Endpoint:

**POST** `/api/contact`

**Body:**
```json
{
  "prenom": "string",
  "nom": "string",
  "objet": "string",
  "message": "string"
}
```

**Responses:**
- ✅ `200 OK`: `{ "success": "Message envoyé avec succès!" }`
- ❌ `400 Bad Request`: `{ "error": "Tous les champs sont obligatoires" }`
- ❌ `500 Server Error`: `{ "error": "Erreur lors de l'envoi du message" }`

## 🚀 Déploiement

Pour le déploiement sur production:
- Stockez les variables d'environnement dans le service de votre hébergeur (Vercel, Netlify, etc.)
- Ne commitez jamais le `.env.local` dans Git
- Assurez-vous que `GMAIL_USER` et `GMAIL_PASSWORD` sont configurés dans les variables d'environnement du serveur
