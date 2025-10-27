# 🎨 Gestion des Images du Site - Mise en place complète

## ✅ Ce qui a été fait

### 1. **Page d'Administration des Images** (`/admin/site-images`)
- ✨ Interface visuelle avec aperçu de chaque image
- 📸 Affichage de l'image actuelle ET de l'image par défaut
- 📤 Upload simple avec statut (Custom vs Par défaut)
- 🔄 Bouton "Réinitialiser aux valeurs par défaut"

### 2. **Composants mis à jour pour utiliser les images dynamiques**

#### Header (`src/app/components/Header.tsx`)
- ✅ Logo clair chargé depuis `/api/site-images` (clé: `header_logo_light`)
- ✅ Logo sombre chargé depuis `/api/site-images` (clé: `header_logo_dark`)
- ✅ Fallback automatique si l'image n'existe pas

#### Footer (`src/app/components/Footer.tsx`)
- ✅ Photo de profil chargée depuis `/api/site-images` (clé: `footer_profile`)
- ✅ Fallback automatique aux images par défaut

### 3. **Initialisation des Images par défaut**
- ✅ Endpoint `/api/site-images/init` pour initialiser les images
- ✅ Crée les 5 images par défaut si elles n'existent pas
- ✅ Accessible via bouton dans l'admin

## 📊 5 Images Gérées

| Clé | Label | Fallback | Utilisation |
|-----|-------|----------|-------------|
| `header_logo_light` | Logo Header (Clair) | `/white-logo.png` | Header en mode clair |
| `header_logo_dark` | Logo Header (Sombre) | `/dark-logo.png` | Header en mode sombre |
| `footer_profile` | Photo Profil Footer | `/IMG_1949-2.png` | Footer - photo profil |
| `homepage_banner` | Bannière Accueil | `/banner.jpg` | Page d'accueil - bannière |
| `homepage_profile` | Photo Profil Accueil | `/profile.jpg` | Page d'accueil - profil |

## 🚀 Flux de travail

1. **Accéder à l'admin** → `/admin` → 🖼️ "Gérer les images"
2. **Voir l'image actuelle** en aperçu
3. **Voir le statut** : "Image custom" ou "Par défaut"
4. **Cliquer "Changer"** pour uploader une nouvelle image
5. **L'image se met à jour** automatiquement sur le site

## 🔧 API Routes

```
GET  /api/site-images           → Toutes les images {key: url}
GET  /api/site-images/[key]     → Image spécifique
PUT  /api/site-images/[key]     → Mettre à jour une image
POST /api/site-images/init      → Initialiser les valeurs par défaut
```

## 💡 Avantages

✅ **Pas de modification de code** pour changer les images
✅ **Aperçu visuel** du contenu actuel
✅ **Statut clair** (custom vs par défaut)
✅ **Fallback automatique** si l'image est supprimée
✅ **Initialisation rapide** des valeurs par défaut
✅ **Résilience** en cas d'erreur de chargement

## 📝 À faire (Optionnel)

Si tu veux gérer aussi les images de la page d'accueil et "à propos":
- Trouver les composants qui utilisent `/banner.jpg` et `/profile.jpg`
- Les mettre à jour pour charger depuis l'API avec les clés `homepage_banner` et `homepage_profile`
