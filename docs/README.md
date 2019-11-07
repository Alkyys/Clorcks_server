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
