# 🚨 Action requise : Configuration de la base de données

## ✅ Build réussi !

Votre déploiement Vercel a réussi, mais la base de données n'est pas encore configurée.

## ⚠️ Erreur actuelle

```
The table `public.Realisations` does not exist in the current database.
```

**Cause** : Les migrations Prisma n'ont pas encore été exécutées sur la base de données de production.

---

## 🔧 Solution : 2 options

### Option A : Vercel Postgres (Recommandé - 2 minutes)

#### 1. Créer la base de données Vercel Postgres

1. Aller sur votre projet Vercel : https://vercel.com/dashboard
2. Cliquer sur votre projet `portfoliov3`
3. Aller dans l'onglet **Storage**
4. Cliquer sur **Create Database**
5. Sélectionner **Postgres**
6. Nommer la base : `portfoliov3-db`
7. Région : **Washington D.C. (iad1)** (même que votre build)
8. Cliquer sur **Create**

✅ Les variables `DATABASE_URL` et `DIRECT_URL` seront automatiquement ajoutées à votre projet !

#### 2. Exécuter les migrations

**Via Vercel CLI** (recommandé) :
```bash
# Installer Vercel CLI si pas déjà fait
npm install -g vercel

# Se connecter
vercel login

# Lier le projet (dans le dossier c:\portfoliov2\portfoliov3)
cd c:\portfoliov2\portfoliov3
vercel link

# Récupérer les variables d'environnement de production
vercel env pull .env.production

# Exécuter les migrations
npx prisma migrate deploy --schema=./prisma/schema.prisma
```

**Via une Function Vercel temporaire** :

Créer un fichier temporaire `src/app/api/migrate/route.ts` :
```typescript
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function GET() {
  // Sécuriser avec un token secret
  const secret = process.env.MIGRATION_SECRET;
  
  if (!secret) {
    return NextResponse.json({ error: 'Not configured' }, { status: 403 });
  }
  
  try {
    const { stdout, stderr } = await execPromise('npx prisma migrate deploy');
    return NextResponse.json({ 
      success: true, 
      stdout, 
      stderr 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      stderr: error.stderr 
    }, { status: 500 });
  }
}
```

Puis :
1. Ajouter variable `MIGRATION_SECRET=un_secret_fort` sur Vercel
2. Visiter `https://votre-site.vercel.app/api/migrate`
3. Supprimer le fichier après migration

---

### Option B : Base de données externe

Si vous utilisez Supabase, Neon, Railway, etc. :

#### 1. Ajouter les variables d'environnement sur Vercel

1. Aller dans **Settings** → **Environment Variables**
2. Ajouter :
   ```
   DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
   DIRECT_URL=postgresql://user:password@host:port/database?sslmode=require
   ```
3. Sélectionner **Production, Preview, Development**
4. Cliquer sur **Save**

#### 2. Redéployer

Vercel va automatiquement redéployer avec les nouvelles variables.

#### 3. Exécuter les migrations

Utiliser Vercel CLI (comme ci-dessus) ou connecter directement à votre base :

```bash
# Avec l'URL de votre base externe
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

---

## ✅ Vérification après migration

1. Redéployer votre site (ou attendre le redéploiement automatique)
2. Visiter votre site : `https://votre-site.vercel.app`
3. La page d'accueil devrait s'afficher sans erreur
4. Tester l'admin : `https://votre-site.vercel.app/admin`

---

## 🔍 Dépannage

### "Connection timed out"
**Cause** : La base de données n'accepte pas les connexions depuis Vercel  
**Solution** : Vérifier que votre base autorise les connexions depuis toutes les IPs Vercel (ou 0.0.0.0/0)

### "Authentication failed"
**Cause** : Mauvais `DATABASE_URL`  
**Solution** : Vérifier l'URL de connexion, le mot de passe et les permissions

### "Table already exists"
**Cause** : Les migrations ont déjà été exécutées  
**Solution** : Tout est bon ! Redéployer simplement

---

## 📊 Statut du déploiement

- ✅ Build réussi (57s)
- ✅ Code déployé
- ✅ Serverless functions créées (26 routes API)
- ✅ Cache créé (236 MB)
- ⚠️ **Base de données à configurer**
- ⏳ Variables d'environnement à ajouter (Gmail, Cloudflare, Admin)

---

## 📝 Prochaines étapes

1. **[URGENT]** Configurer la base de données (voir ci-dessus)
2. Ajouter les variables d'environnement manquantes :
   - `GMAIL_USER` et `GMAIL_PASSWORD` (pour le formulaire de contact)
   - `CLOUDFLARE_R2_*` (pour l'upload d'images)
   - `ADMIN_PASSWORD_HASH` (pour l'authentification admin)
3. Redéployer ou attendre le redéploiement automatique
4. Tester toutes les fonctionnalités

Voir `.env.example` pour la liste complète des variables.

---

## 🎉 Résultat

Après ces étapes, votre portfolio sera **100% fonctionnel** en production !

**Temps estimé** : 5-10 minutes
