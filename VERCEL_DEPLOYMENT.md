# Guide de déploiement Vercel

Ce guide vous accompagne étape par étape pour déployer le portfolio sur Vercel depuis le repository `portfoliov3`.

## ✅ Prérequis

Avant de déployer, assurez-vous d'avoir :

- [ ] Un compte [Vercel](https://vercel.com) (gratuit)
- [ ] Le compte GitHub connecté à Vercel
- [ ] Une base de données PostgreSQL (Vercel Postgres recommandé)
- [ ] Un bucket Cloudflare R2 configuré (voir `CLOUDFLARE_SETUP.md`)
- [ ] Un compte Gmail avec mot de passe d'application
- [ ] Le hash du mot de passe admin généré

## 🚀 Déploiement

### Étape 1 : Importer le projet

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Cliquer sur "Import Git Repository"
3. Sélectionner **Luckieuh/portfoliov3**
4. Cliquer sur **Import**

### Étape 2 : Configurer le projet

#### Framework Preset
Vercel devrait automatiquement détecter **Next.js**. Si ce n'est pas le cas :
- Framework Preset : `Next.js`
- Build Command : `prisma generate && next build`
- Output Directory : `.next`
- Install Command : `npm install`

#### Root Directory
Laisser à **/** (racine du projet)

### Étape 3 : Configurer les variables d'environnement

Cliquer sur **Environment Variables** et ajouter les suivantes :

#### Base de données (obligatoire)
```
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
```

**Note** : Si vous utilisez Vercel Postgres, ces variables seront automatiquement ajoutées après création de la base de données.

#### Cloudflare R2 (obligatoire pour les images)
```
CLOUDFLARE_R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key
CLOUDFLARE_R2_BUCKET_NAME=your-bucket-name
CLOUDFLARE_R2_PUBLIC_URL=https://cdn.your-domain.com
```

#### Gmail (obligatoire pour le formulaire de contact)
```
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-specific-password
```

**Comment obtenir un mot de passe d'application Gmail** :
1. Aller sur [myaccount.google.com/security](https://myaccount.google.com/security)
2. Activer la validation en deux étapes
3. Aller dans "Mots de passe des applications"
4. Générer un nouveau mot de passe pour "Mail"
5. Copier le mot de passe (16 caractères)

#### Admin (obligatoire)
```
ADMIN_PASSWORD_HASH=bcrypt_hash_of_your_password
```

**Comment générer le hash** :
```bash
# Localement
npm install -g bcryptjs
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('VotreMotDePasse', 10));"
```

Ou utiliser le script `scripts/init-admin.ts`.

#### Sélection des environnements
Pour chaque variable, sélectionner :
- ✅ Production
- ✅ Preview
- ✅ Development

### Étape 4 : Déployer

1. Cliquer sur **Deploy**
2. Attendre la fin du build (2-3 minutes)
3. ✅ Le site est en ligne !

## 🗄️ Configuration de la base de données

### Option A : Vercel Postgres (recommandé)

1. Dans votre projet Vercel, aller dans l'onglet **Storage**
2. Cliquer sur **Create Database**
3. Sélectionner **Postgres**
4. Donner un nom (ex : `portfolio-db`)
5. Cliquer sur **Create**
6. Les variables `DATABASE_URL` et `DIRECT_URL` sont automatiquement ajoutées

### Option B : Base de données externe

Vous pouvez utiliser :
- [Supabase](https://supabase.com) (gratuit)
- [Neon](https://neon.tech) (gratuit)
- [Railway](https://railway.app) (gratuit)
- Ou tout autre fournisseur PostgreSQL

Copiez l'URL de connexion et ajoutez-la comme `DATABASE_URL` et `DIRECT_URL`.

### Exécuter les migrations

Après le premier déploiement avec la base de données configurée :

#### Via Vercel CLI (recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Récupérer les variables d'environnement
vercel env pull .env.local

# Exécuter les migrations
npx prisma migrate deploy

# Générer le client Prisma (si nécessaire)
npx prisma generate
```

#### Via l'interface Vercel
1. Aller dans **Settings** → **Functions**
2. Créer une fonction serverless temporaire pour exécuter les migrations
3. Ou utiliser une action GitHub personnalisée

## 🌐 Configuration du domaine

### Domaine Vercel (automatique)
Votre site est accessible sur : `https://votre-projet.vercel.app`

### Domaine personnalisé (optionnel)

1. Dans votre projet Vercel : **Settings** → **Domains**
2. Cliquer sur **Add**
3. Entrer votre domaine (ex : `portfolio.com`)
4. Suivre les instructions pour configurer le DNS

**Configuration DNS** :
- Type : `A` ou `CNAME`
- Valeur : fournie par Vercel

**SSL** : Automatiquement activé par Vercel (Let's Encrypt)

## 🔧 Configuration post-déploiement

### 1. Vérifier les logs
- **Deployments** → Cliquer sur le dernier déploiement
- Vérifier qu'il n'y a pas d'erreurs dans **Build Logs** et **Function Logs**

### 2. Tester les fonctionnalités
- [ ] Page d'accueil s'affiche correctement
- [ ] Les images se chargent depuis Cloudflare R2
- [ ] Le formulaire de contact fonctionne
- [ ] L'admin panel est accessible (`/admin`)
- [ ] Connexion admin fonctionne
- [ ] Upload d'images fonctionne
- [ ] CRUD des réalisations fonctionne

### 3. Créer le premier utilisateur admin (si nécessaire)

Si vous n'avez pas encore d'utilisateur admin dans la base de données :

```bash
# Via Prisma Studio (localement avec les variables d'environnement de production)
vercel env pull .env.local
npx prisma studio

# Ou créer un script de seed
```

### 4. Configurer les redirections (optionnel)

Dans `vercel.json`, vous pouvez ajouter des redirections :

```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

## 🔍 Dépannage

### Erreur : "Prisma Client is not generated"
**Solution** : Vérifier que `prisma generate` est dans le `buildCommand` de `vercel.json`

### Erreur : "DATABASE_URL is not defined"
**Solution** : Vérifier que la variable est bien définie dans **Settings** → **Environment Variables** pour **Production**

### Erreur 500 sur `/api/*`
**Solution** : Vérifier les logs dans **Deployments** → **Function Logs**

### Images ne se chargent pas
**Solutions** :
1. Vérifier que les variables Cloudflare R2 sont correctes
2. Vérifier que le bucket est public ou que le domaine public est configuré
3. Vérifier les CORS du bucket Cloudflare

### Formulaire de contact ne fonctionne pas
**Solutions** :
1. Vérifier les variables `GMAIL_USER` et `GMAIL_PASSWORD`
2. Vérifier que la validation en deux étapes est activée sur Gmail
3. Vérifier que le mot de passe est un "mot de passe d'application" (pas le mot de passe principal)

### Build échoue
**Solutions** :
1. Vérifier les erreurs dans **Build Logs**
2. Tester le build localement : `npm run build`
3. Vérifier que toutes les dépendances sont dans `package.json`

## 🚀 Redéploiement

### Automatique (recommandé)
- Tout push sur `main` déclenche automatiquement un nouveau déploiement

### Manuel
1. Aller dans **Deployments**
2. Cliquer sur **Redeploy** sur un déploiement précédent
3. Ou pousser un commit sur GitHub

### Déploiement de preview
- Tout push sur une branche autre que `main` crée un déploiement de preview
- URL unique générée pour chaque PR

## 📊 Monitoring

### Analytics
- Aller dans **Analytics** pour voir les statistiques de trafic

### Logs
- **Function Logs** : Logs des API routes
- **Build Logs** : Logs de compilation

### Alertes
- Configurer des alertes dans **Settings** → **Notifications**

## 🔐 Sécurité

### Variables d'environnement
- ✅ Jamais exposées au client
- ✅ Chiffrées au repos
- ✅ Séparées par environnement

### Recommandations
- [ ] Activer "Automatically expose System Environment Variables" uniquement si nécessaire
- [ ] Utiliser des mots de passe forts pour l'admin
- [ ] Régénérer les clés API régulièrement
- [ ] Activer la protection DDoS dans les paramètres Vercel (plans Pro+)

## 💰 Coûts

### Plan Hobby (gratuit)
- ✅ Parfait pour ce portfolio
- 100 GB de bande passante
- Builds illimités
- SSL gratuit
- Domaine Vercel gratuit

### Plan Pro (20$/mois)
Si vous avez besoin de :
- Plus de bande passante
- Analytics avancés
- Support prioritaire
- Protection DDoS

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Vercel CLI](https://vercel.com/docs/cli)

## ✅ Checklist finale

Avant de considérer le déploiement terminé :

- [ ] Le site est accessible sur l'URL Vercel
- [ ] Toutes les pages se chargent sans erreur
- [ ] Les images s'affichent correctement
- [ ] Le formulaire de contact envoie des emails
- [ ] L'admin panel est fonctionnel
- [ ] Les migrations de base de données sont appliquées
- [ ] Les variables d'environnement sont toutes configurées
- [ ] Le domaine personnalisé est configuré (si applicable)
- [ ] Les logs ne montrent pas d'erreurs critiques
- [ ] La sécurité est vérifiée (pas de clés exposées)

🎉 **Félicitations ! Votre portfolio est en ligne !**
