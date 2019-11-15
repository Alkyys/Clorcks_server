# Documentation de Clorcks 🎨

## Git
### Gitflow
![img](https://git-flow.readthedocs.io/fr/latest/_images/gitflow.png)


* **Master** : 
<br> C’est la branche principale dans lequel le projet fonctionnel est déployé, il est dans l’environnement de production.

* **Hotfixes** :
<br> Hotfixes sert à corriger des erreurs critiques rencontrer dans la branche master, il tourne lui aussi dans l’environnement de production.

* **Release branches** :
<br>  Release branche est une branche accessible seulement par les développeurs. Son utilité est de tester avant de merge avec la branche master. Elle est dans un environnement de développement.

* **Feature-xxx** :
<br>  Feature est la branche dans laquelle le développeur va développer un composant. Lorsque la feature est terminée, une review du code est réalisée avant de merge sur la branche Develop.

* **Develop** :
<br>  Develop est la branche dans laquelle les Features sont merge (ramener la branche créée à la branche principale) au fur et à mesure.

## Verif User

### REGEX

#### regex rgba
```javascript
const RGBA_REGEX = /^(?:rgba\(\s?([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s?([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s?([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s?([0-1]\.0|0\.[0-9]{1,2})\))/;
// TRUE rgba( 0, 255, 255, 1.0)
// FALSE rgba(255,999, 255,0.15)
// FALSE rgba(255,255,256,0.154)
// FALSE rgba(255,255,256,0.5)
// TRUE rgba(000,255,255,0.5)
// TRUE rgba(255,255,255,0.5)
```
#### regex color 
```javascript
const COLOR_REGEX = /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/
// FALSE 256
// FALSE 1.2
// TRUE 255
// TRUE 0
```

#### regex name
```javascript
const NAME_REGEX = /^([A-Za-z0-9 '-]{3,25})$/;
// FALSE jean?
// FALSE be
// TRUE Bleu Nuit
// TRUE Je ne sais pas quoi mettre
```

#### regex ObjectId
```javascript
const OBJECTID_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
```