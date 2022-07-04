$(function() {

    //Variables
    var error = false;
    var weaponTab = [poingJ1, poingJ2, baton, boule, fusilChasse]; //On crée un tableau de toutes les armes

    //Function réinitialisant les sélecteurs
    function reinitialise(){
        var sel;
        for(i = 0; i < 10; i++){ //On parcourt tout le tableau
            for(j = 0; j < 10; j++){
                sel = 'tr:eq('+i+') > td:eq('+j+')'; //On étudie chaque case du tableau
                $(sel).off(); //On annule tous les évenements des sélecteurs pour éviter des conflits avec les futurs nouveaux sélecteurs
            }
        }
    }


    //Fonctions permettant d'éviter de passer par une case grise ou d'effacer un élément de la map pendant la sélection
    function verifCaseGriseEnter(elem){ //S'enclenche lorsque le pointeur de la souris est dessus
        for(i = 0; i < elem.length; i++){ //On parcourt les cases présentes entre le joueur et le pointeur de la souris
            var cssCase = $(elem[i]).css('background-color').toString(); //Récupération du css de la case en cours
            const backgroundImageCase = $(elem[i]).css('background-image'); //Récupération du background-image de la case en cours

            if(cssCase == 'rgba(0, 0, 0, 0)' && backgroundImageCase.search(/j[1-2]/) === -1){ //Si la case n'a pas de background-color, on traite. Sinon, on arrête la coloration des cases à ce niveau là
                $(elem[i]).css('background-color', '#6495ed');
            }
            else{
                error = true; //Permet d'éviter de cliquer dessus ou après une case grise pour executer une action
                break;
            }
        }
    }


    function verifCaseGriseOut(elem){ //S'enclenche lorsque le pointeur n'est plus présent dans la case
        for(i = 0; i < elem.length; i++){ //On traite tous les éléments passés en paramètres
            var cssCase = $(elem[i]).css('background-color').toString(); //On récupère le css de la case en cours
            const backgroundImageCase = $(elem[i]).css('background-image'); //Récupération du background-image de la case en cours

            if(cssCase != 'rgba(190, 190, 190, 0.6)' && backgroundImageCase.search(/j[1-2]/) === -1){ //Si la case n'est pas grise
                $(elem[i]).css('background-color', 'transparent'); //On l'a rend transparente, pour supprimer le background-color temporaire
            }
        }
        error = false;
    }


    function departCase(player){
        $('tr:eq('+player.y+') > td:eq('+player.x+')').css('background-image', 'none'); //On supprime le css présent sur la case qu'on va quitter
        for(i = 0; i<weaponTab.length; i++){ //On parcourt jusqu'à voir si les coordonnées d'une arme correspondent à celle du joueur pour l'afficher
            if(weaponTab[i].x == player.x && weaponTab[i].y == player.y){
                $('tr:eq('+player.y+') > td:eq('+player.x+')').css('background-image', weaponTab[i].url).css('background-size', '90% 90%').css('background-repeat', 'no-repeat').css('background-position', 'center');
            }
        }
    }


    function changementArme(sel, player){
        if($(sel).css('background-image').toString() != 'none'){
            for(j = 0; j<weaponTab.length; j++){ //On parcourt jusqu'à voir si les coordonnées d'une arme correspondent à celle du joueur
                if(weaponTab[j].x == player.x && weaponTab[j].y == player.y){
                    $(sel).css('background-image', player.weapon.url).css('background-size', '90% 90%').css('background-repeat', 'no-repeat').css('background-position', 'center');
                    player.weapon.x = player.x;
                    player.weapon.y = player.y;
                    player.weapon = weaponTab[j]; //On change l'arme du joueur
                    player.weapon.x = 10;
                    player.weapon.y = 10;
                    player.id == player1.id ? $('#player1Weapon').text(player.weapon.name) : $('#player2Weapon').text(player.weapon.name); //On affiche la nouvelle arme du joueur
                    break;
                }
            }
        }
    }


    //Fonction pour faire changer le joueur de cases
    function mouvement(selecteur, coordonnee, nbCases, player){ //nbCases peut être positif ou négatif en fonction du mouvement choisi
        if(!error){

            var curSel;

            departCase(player);

            for(i = 1; i < Math.abs(nbCases)+1; i++){ //On parcourt toutes les cases sur lesquelles on est passées

                if(coordonnee == 'y'){ //On regarde si notre mouvement se fait sur l'abscisse ou l'ordonnée pour modifier les coordonnées du joueur
                    player.y = nbCases < 0 ? player.y-1 : player.y+1;
                }
                else{
                    player.x = nbCases < 0 ? player.x-1 : player.x+1;
                }

                curSel = 'tr:eq('+player.y+') > td:eq('+player.x+')'; //On adapte notre selecteur en fonction du signe de nbCases
                $(curSel).css('background-color', 'transparent'); //On remet toutes les cases traversées en transparent


                changementArme(curSel, player);
            }

            $(selecteur).css('background-image', player.url).css('background-size', '90% 90%').css('background-repeat', 'no-repeat').css('background-position', 'center').css('background-color', 'transparent'); //On met en place l'image du joueur sur la nouvelle case

            if((player1.x == player2.x+1 && player1.y == player2.y) || (player1.x == player2.x-1 && player1.y == player2.y) || (player1.y == player2.y+1 && player1.x == player2.x) || (player1.y == player2.y-1 && player1.x == player2.x)){ //On vérifie si les joueurs sont à côté
                reinitialise(); //On réinitialise tous les sélecteurs avant de lancer le combat
                if(player.id == 1){ //On récupère l'identité du joueur qui lance le combat pour qu'il soit le premier à faire ses choix
                    firstPlayer = player1;
                    secondPlayer = player2;
                }
                else{
                    firstPlayer = player2;
                    secondPlayer = player1;
                }
                combat = true; //On lance le combat
            }
            else{
                if(player.id == 1) joueurActif(player2); //On laisse l'autre joueur jouer
                else joueurActif(player1);
            }
        }
    }


    function selection(coordonnee, signe, player){

        var xPlayer, yPlayer;
        var selecteur1, selecteur2, selecteur3;
        var y1, y2, y3, x1, x2, x3; //Permet d'adapter une coordonnée à un sélecteur
        y1 = y2 = y3 = x1 = x2 = x3 = 0; //On initialise à 0

        //Attribution des coordonnées du joueurs
        xPlayer = player.x;
        yPlayer = player.y;

        if(coordonnee == 'y'){
            y1 = yPlayer + (signe*1);
            y2 = yPlayer + (signe*2);
            y3 = yPlayer + (signe*3);
            x1 = x2 = x3 = xPlayer;
        }
        else{
            x1 = xPlayer + (signe*1);
            x2 = xPlayer + (signe*2);
            x3 = xPlayer + (signe*3);
            y1 = y2 = y3 = yPlayer;
        }


        selecteur1 = 'tr:eq('+y1+') > td:eq('+x1+')';
        selecteur2 = 'tr:eq('+y2+') > td:eq('+x2+')';
        selecteur3 = 'tr:eq('+y3+') > td:eq('+x3+')';

        if((y1 >= 0 && coordonnee == 'y') || ( x1 >= 0 && coordonnee == 'x')){ //Evite la sélection par le bas ou la droite en fonction du placement du joueur

            $(selecteur1).mouseenter(function(){
                verifCaseGriseEnter([selecteur1]); //On vérifie la case survolée
            }).click(function() {
                mouvement(selecteur1, coordonnee, signe*1, player); //Lors du clique, on enclenche le mouvement du joueur en passant en paramètre les conditions de déplacement
            });

        }

        if((y2 >= 0 && coordonnee == 'y') || ( x2 >= 0 && coordonnee == 'x')){

            $(selecteur2).mouseenter(function(){
                verifCaseGriseEnter([selecteur1, selecteur2]);
            }).click(function() {
                mouvement(selecteur2, coordonnee, signe*2, player);
            });

        }

        if((y3 >= 0 && coordonnee == 'y') || ( x3 >= 0 && coordonnee == 'x')){

            $(selecteur3).mouseenter(function(){
                verifCaseGriseEnter([selecteur1, selecteur2, selecteur3]);
            }).click(function() {
                mouvement(selecteur3, coordonnee, signe*3, player);
            });

        }

        $(selecteur1 + ',' + selecteur2 + ',' + selecteur3).mouseout(function(){
            verifCaseGriseOut([selecteur1, selecteur2, selecteur3]);
        });

    }



    //Fonction lançant le jeu
    function joueurActif(player){

        //Les fonctions des sélecteurs sont supprimées
        reinitialise();

        selection('y', -1, player); //Selection au-dessus
        selection('y', 1, player); //Selection en dessous
        selection('x', -1, player); //Selection à gauche
        selection('x', 1, player); //Selection à droite
    }

    joueurActif(player1); //Permet de lancer la boucle
});
