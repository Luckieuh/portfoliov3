# 🔐 Système d'Administration

POUR CHANGER ID ADMIN : LANCER DANS LE TERMINAL : npm run admin:manage


## Vue d'ensemble

Ce portfolio inclut un **système d'authentification sécurisé** pour accéder au tableau d'administration et gérer les projets (réalisations).

### Fonctionnalités

✅ **Authentification JWT** avec tokens sécurisés  
✅ **Système de login/logout**  
✅ **Gestion complète des projets** (CRUD)  
✅ **Interface d'administration moderne** avec liste et formulaire  
✅ **Protection middleware** des routes sensibles  

---

## 🚀 Mise en place initiale

### 1. Initialiser le compte admin

Lors du premier lancement, visitez:

```
http://localhost:3000/setup
```

Créez votre compte administrateur avec les identifiants de votre choix.

**Identifiants par défaut (si fournis):**
- Username: `admin`
- Password: `admin123`

> ⚠️ **Important**: Changez ces identifiants après la première connexion pour des raisons de sécurité.

### 2. Se connecter à l'administration

Une fois le compte créé, accédez à:

```
http://localhost:3000/auth/login
```

Entrez vos identifiants et vous serez redirigé vers:

```
http://localhost:3000/admin
```

---

## 📋 Tableau d'Administration

### Interface

L'écran admin est divisé en **deux colonnes**:

**Colonne gauche:** Liste des réalisations  
- Affiche tous les projets existants
- Boutons `Éditer` et `Supprimer` pour chaque projet
- Compteur du nombre de projets

**Colonne droite:** Formulaire de création/édition  
- Visible uniquement quand un projet est en cours de création ou d'édition
- Tous les champs remplis automatiquement lors de l'édition

### Boutons d'action

| Bouton | Action |
|--------|--------|
| ➕ **Nouveau** | Ouvre le formulaire pour créer un nouveau projet |
| ✏️ **Éditer** | Remplit le formulaire avec les données du projet |
| 🗑️ **Supprimer** | Supprime le projet (avec confirmation) |
| 🔴 **Déconnexion** | Vous déconnecte et redirige vers le login |

---

## 🔧 Gestion des projets

### Créer un projet

1. Cliquez sur le bouton **"Nouveau"**
2. Remplissez le formulaire:
   - **Titre** * (obligatoire)
   - **Description** * (obligatoire)
   - **Localisation** (optionnel)
   - **Date de création** (date du projet)
   - **Images** * (au moins une obligatoire)
   - **Vidéo** (optionnel)
   - **URL YouTube** (optionnel)
   - **Lien externe** (optionnel)
   - **Catégories** (photo, video, design, voyage, architecture)
3. Cliquez sur **"Créer"**

### Modifier un projet

1. Cliquez sur l'icône **✏️ Éditer** à côté du projet
2. Le formulaire se remplit automatiquement
3. Modifiez les champs souhaités
4. Cliquez sur **"Modifier"**

### Supprimer un projet

1. Cliquez sur l'icône **🗑️ Supprimer** à côté du projet
2. Confirmez la suppression
3. Le projet est supprimé (ainsi que toutes ses images)

---

## 🔒 Sécurité

### Authentification

- **JWT (JSON Web Tokens)** pour les sessions utilisateur
- Tokens expiration après **7 jours**
- Mot de passe **hashé avec bcryptjs** (10 rounds)

### Protection des routes

#### Routes protégées (nécessitent authentification)

- `GET/POST/PUT/DELETE /api/realisations` (sauf GET qui est public)
- `POST /api/auth/login`
- `/admin` (page admin)
- `/api/admin/*`

#### Routes publiques

- `GET /api/realisations` (voir tous les projets)
- `GET /api/realisations/[id]` (voir détails d'un projet)
- `/` (accueil)
- `/realisations` (liste des projets)
- `/auth/login` (page de connexion)

### Middleware de sécurité

Un middleware valide chaque requête:

```typescript
// Protection des routes /admin
// Protection des endpoints API sensibles
// Redirection automatique si token invalide
```

---

## 🛠️ Structure des fichiers

```
src/
├── app/
│   ├── admin/page.tsx                 # Page d'administration
│   ├── auth/login/page.tsx            # Page de connexion
│   ├── setup/page.tsx                 # Page d'initialisation du compte
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts         # Endpoint login
│       │   └── logout/route.ts        # Endpoint logout
│       ├── admin/
│       │   └── init/route.ts          # Endpoint initialisation admin
│       └── realisations/
│           ├── route.ts               # GET (public), POST (protégé)
│           └── [id]/route.ts          # GET (public), PUT/DELETE (protégé)
├── lib/
│   ├── auth.ts                        # Utilitaires d'authentification
│   └── prisma.ts                      # Client Prisma
│
middleware.ts                           # Middleware de sécurité
```

---

## 📊 Variables d'environnement

Assurez-vous que `.env.local` contient:

```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
JWT_SECRET=your-secret-key-change-in-production
```

> 💡 Si `JWT_SECRET` n'est pas défini, une clé par défaut sera utilisée (non recommandé en production).

---

## 🚨 Dépannage

### "Module not found: @/lib/auth"

Assurez-vous que les fichiers sont dans `src/lib/`:
- `src/lib/auth.ts`
- `src/lib/prisma.ts`

### "Unauthorized" en accédant à /admin

Votre token JWT a peut-être expiré. Déconnectez-vous et reconnectez-vous.

### Les changements n'apparaissent pas

1. Rafraîchissez le navigateur (Ctrl+F5)
2. Vérifiez la console du serveur pour les erreurs
3. Assurez-vous que la base de données est accessible

---

## 🔑 API Endpoints

### Authentification

```bash
# Login
POST /api/auth/login
Body: { username: string, password: string }
Response: { success: true, message: string }

# Logout
POST /api/auth/logout
Response: { success: true, message: string }

# Initialiser admin
POST /api/admin/init
Body: { username: string, password: string }
Response: { success: true, message: string, id: number }
```

### Réalisations (CRUD)

```bash
# Récupérer tous les projets (PUBLIC)
GET /api/realisations
Response: Realisation[]

# Récupérer un projet (PUBLIC)
GET /api/realisations/[id]
Response: Realisation

# Créer un projet (PROTÉGÉ)
POST /api/realisations
Body: { title, description, categories[], images[], ... }
Response: Realisation

# Modifier un projet (PROTÉGÉ)
PUT /api/realisations/[id]
Body: { title, description, ... }
Response: Realisation

# Supprimer un projet (PROTÉGÉ)
DELETE /api/realisations/[id]
Response: { success: true, message: string }
```

---

## 📝 Notes importantes

- Les images doivent être uploadées via Cloudflare R2 (endpoint fourni)
- Les vidéos YouTube sont affichées en priorité si disponibles
- Les images en cascade avec `onDelete: Cascade` sont automatiquement supprimées
- La date de création peut être modifiée lors de l'édition
- Les modifications n'affectent que la base de données, pas l'interface en direct

---

## 🔄 Flux d'authentification

```
1. Utilisateur accède à /auth/login
2. Entre username et password
3. ✓ Vérifie en base de données
4. ✓ Crée JWT token
5. ✓ Stocke token dans cookie sécurisé
6. ✓ Redirige vers /admin
7. Middleware vérifie le token pour chaque requête
8. ✓ Accès autorisé ou redirection vers login
```

---

## 📚 Références

- **JWT**: https://jwt.io
- **bcryptjs**: https://github.com/dcodeIO/bcrypt.js
- **Prisma**: https://www.prisma.io
- **Next.js Middleware**: https://nextjs.org/docs/advanced-features/middleware

---

**Dernière mise à jour**: Octobre 2025  
**Version**: 1.0.0
