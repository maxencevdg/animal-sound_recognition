# 🐾 Animal Sound Recognition 🐾

Ce projet est une application web interactive qui utilise la reconnaissance vocale pour permettre aux utilisateurs d'imiter les sons des animaux. L'application utilise TensorFlow.js et Teachable Machine pour la reconnaissance des sons.

## Structure du projet

- `index.html` : Le fichier HTML principal qui structure la page web.
- `styles.css` : Le fichier CSS pour le style de la page.
- `script.js` : Le fichier JavaScript principal qui contient la logique de l'application.
- `my_model/` : Contient les fichiers du modèle de reconnaissance vocale.
  - `metadata.json` : Métadonnées du modèle.
  - `model.json` : Topologie du modèle.
  - `weights.bin` : Poids du modèle.
- `images/` : Contient les images des animaux et l'arrière-plan.
  - `chevre.png`, `cochon.png`, `chat.png`, `poule.png`, `chien.png`, `loup.png`, `vache.png`, `singe.png`, `arriere-plan.png` : Images des animaux et de l'arrière-plan.

## Utilisation

1. Ouvrez `index.html` dans un navigateur web.
2. Cliquez sur le bouton "Start" pour démarrer la reconnaissance vocale.
3. Imitez le son de l'animal affiché à l'écran.
4. Le score sera mis à jour en fonction de la précision de votre imitation.
5. La barre de santé de l'animal sera mise à jour en fonction de votre score.

## Auteur

- [Maxence](https://github.com/maxencevdg)
- [Guillaume](https://github.com/guigzlsx)
- [Jeff](https://github.com/26jeff)
- [Lionel](https://github.com/Lionel78570)