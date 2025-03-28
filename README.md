# 🏡 Participation Citoyenne - Backend

Ce dépôt contient le backend de l'application **Participation Citoyenne**, qui permet aux citoyens de Mohammedia de signaler des problèmes urbains, proposer des idées, suivre l'actualité locale et participer aux décisions de la commune.

## 🚀 Fonctionnalités

- 📌 Signalement des problèmes urbains avec suivi en temps réel
- 💡 Soumission d'idées citoyennes avec votes et commentaires
- 🏡 Participation aux décisions locales (sondages, budgets participatifs)
- 📰 Affichage des annonces officielles et événements locaux
- 🟥️ Carte interactive des infrastructures communales

## 🛠️ Technologies utilisées

- **Backend** : Node.js + Express.js
- **Base de données** : MySQL
- **Authentification** : JSON Web Tokens (JWT)
- **WebSockets** : Pour le suivi en temps réel des signalements
- **Stockage d'images** : Cloudinary (ou autre solution adaptée)

## 🛀 Installation

### 1️⃣ Prérequis

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### 2️⃣ Cloner le projet

```bash
git clone https://github.com/ton-utilisateur/participation-citoyenne-backend.git
cd participation-citoyenne-backend
```

### 3️⃣ Installer les dépendances

```bash
npm install
```

### 4️⃣ Configurer les variables d'environnement

Créer un fichier `.env` et ajouter :

```env
PORT=5000
DB_HOST=localhost
DB_NAME=participation_citoyenne
JWT_SECRET=your_jwt_secret
```

### 5️⃣ Lancer le serveur

```bash
npm start
```

L'API sera disponible sur `http://localhost:3000`.

## 📚 Documentation API

Les routes principales de l'API :

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/auth/register` | Inscription d'un utilisateur |
| `POST` | `/api/auth/login` | Connexion d'un utilisateur |
| `GET` | `/api/reports` | Récupérer les signalements urbains |
| `POST` | `/api/reports` | Ajouter un nouveau signalement |
| `PUT` | `/api/reports/:id` | Mettre à jour le statut d'un signalement |
| `GET` | `/api/ideas` | Récupérer les idées des citoyens |
| `POST` | `/api/ideas` | Soumettre une nouvelle idée |
| `GET` | `/api/events` | Récupérer les événements municipaux |

## 📌 Contribution

1. Forker le projet 🍴
2. Créer une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commiter vos modifications (`git commit -m "Ajout de ma fonctionnalité"`)
4. Pousser vos modifications (`git push origin feature/ma-fonctionnalite`)
5. Ouvrir une Pull Request ✅

## 🐝 Licence

Ce projet est sous licence **MIT**.

---

🔥 **Développé avec passion pour améliorer la participation citoyenne !**

# Mohammedia-Hub
