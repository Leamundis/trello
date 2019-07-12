# Évaluation NodeJS

## Projet

Le but était de recréer une application de type "Trello" en nodeJS.


## Outils

Pour lancer le projet, il faudra avoir installer :

- nodeJS
- express
- mongodb
- npm

## Mise en place

Après avoir récupérer le projet, il suffit de faire un :

`npm install`

Ce qui installera les dépendances nécesaires. Faire ensuite un :

`npm run dev`

Cette commande permet de lancer le serveur.

Lancer un navigateur, et rendez-vous à l'adresse suivante :

`localhost:3000`

Noralement, c'est bon! Enjoy!



## Quoi pour quoi?

Étant le thème de la semaine, nous avons bien entendu utilisé nodejs comme base du projet. 

Pour la structure, nous avons pris express.

Afin de simplifier l'affichage, nous avons utilisé twig comme moteur de templating de nos vues.

ENfin, mongodb pour la base de données.

## Les choses qui marchent

- On peut créer des utilisateurs et se connecter avec.
- On peut créer des tableaux et rentrer dedans.
- Les tableaux accessibles sont ceux que l'utilisateur courant à créé.

## Les choses qui marchent...pas...

- Une fois rentré dans un tableau, page vide. J'avais commencé à mettre en place l'affichage des colonnes, mais je n'ai pas eu le temps de faire ça bien.
- L'input pour ajouter une colonne existe, mais ne fonctionne pas encore complètement.
- Lorsque tu te connectes, il faut refresh la page pour que les tableaux s'affichent correctement. Je vois globalement d'où vient le soucis, je pensais me pencher dessus vers la fin, mais je n'ai pas eu le temps. 
