function Weapon(name, damage, url){ //On crée un objet Weapon pour inventer des armes
    this.name = name;
    this.damage = damage;
    this.url = url; //On spécifie le chemin d'accès à chaque arme
    this.x = 10; //Par défaut, les armes sont placés hors de la carte en attendant d'être positionnés aléatoirement
    this.y = 10;
}

//Initialisation des armes
//On est obligé de créer un poing pour chaque joueur, sinon il y a des conflits pour le positionnement du poing
var poingJ1 = new Weapon('Poing', 10, 'url(img/poing.png)');
var poingJ2 = new Weapon('Poing', 10, 'url(img/poing.png)');
var baton = new Weapon('Baton', 13, 'url(img/baton.jpg)');
var boule = new Weapon('Boule', 16, 'url(img/boule.jpg)');
var fusilChasse = new Weapon('Fusil de chasse', 20, 'url(img/fusil.jpg)');

function Player(id, nick, url, weapon){ //On crée un objet Player pour pouvoir enregistrer les données d'un joueur
    this.id = id;
    this.nick = nick;
    this.url = url; //On spécifie le chemin d'accès à l'image du joueur
    this.weapon = weapon;
    this.x = 10; //Par défaut, les joueurs sont placés hors de la carte en attendant d'être positionnés aléatoirement
    this.y = 10;
    this.life = 100;
    this.strategie = null;
}

//Initialisation des joueurs
var player1 = new Player(1, 'Joueur 1', 'url(img/j1.png)', poingJ1);
var player2 = new Player(2, 'Joueur 2', 'url(img/j2.jpg)', poingJ2);
