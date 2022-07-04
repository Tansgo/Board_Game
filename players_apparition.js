$(function() {

    var yRandom, xRandom;
    var j1, j2;
    var cssCaseSelectionne, caseDessus, caseDessous, caseDroite, caseGauche, cssCaseDessus, cssCaseDessous, cssCaseDroite, cssCaseGauche;

    while(true){ //Tant que la création du joueur 1 n'est pas possible, on répéte
        yRandom = parseInt(Math.random() * 9); //Le placement se fait aléatoirement
        xRandom = parseInt(Math.random() * 9);

        j1 = 'tr:eq('+yRandom+') > td:eq('+xRandom+')'; //On crée un sélecteur à l'aide des coordonnées aléatoire
        cssCaseSelectionne = $(j1).css('background-color').toString(); //On récupère le css du sélecteur j1 qu'on transforme en String par soucis de faciliter pour la suite

        if(cssCaseSelectionne == 'rgba(0, 0, 0, 0)'){ //On vérifie que la case où on se trouve ne soit pas occuper par une case grise
            player1.y = yRandom; //La vérification est bonne, on donne les coordonnées au joueur 1
            player1.x = xRandom;
            break; // Plus besoin de répéter, on quitte donc la boucle
        }
    }

    //On place le joueur 1 sur la carte
    $(j1).css('background-image', 'url("img/j1.png")').css('background-size', '90% 90%').css('background-repeat', 'no-repeat').css('background-position', 'center');

    while(true){ //Tant que la création du joueur 2 n'est pas possible, on répéte
        yRandom = parseInt(Math.random() * 9); //On récupére de nouvelles coordonnées aléatoirement
        xRandom = parseInt(Math.random() * 9);

        j2 = 'tr:eq('+yRandom+') > td:eq('+xRandom+')'; //On crée un sélecteur à l'aide des coordonnées aléatoire
        cssCaseSelectionne = $(j2).css('background-color').toString(); //On récupère le css du sélecteur j2 qu'on transforme en String par soucis de faciliter pour la vérification finale
        imgCaseSelectionne = $(j2).css('background-image').toString(); //On récupère l'image du sélecteur j2

        //On récupère le css des cases entourant (haut, bas, droite, gauche) notre case temporaire
        caseDessus = 'tr:eq('+(yRandom-1)+') > td:eq('+xRandom+')';
        imgCaseDessus = $(caseDessus).css('background-image').toString();

        caseDessous = 'tr:eq('+(yRandom+1)+') > td:eq('+xRandom+')';
        imgCaseDessous = $(caseDessous).css('background-image').toString();

        caseDroite = 'tr:eq('+yRandom+') > td:eq('+(xRandom+1)+')';
        imgCaseDroite = $(caseDroite).css('background-image').toString();

        caseGauche = 'tr:eq('+yRandom+') > td:eq('+(xRandom-1)+')';
        imgCaseGauche = $(caseGauche).css('background-image').toString();

        //Vérification que la case temporaire ne soit pas occupée par une case grise et qu'il n'y ait pas le joueur 1 à côté ou dessus
        if(cssCaseSelectionne == 'rgba(0, 0, 0, 0)' && imgCaseSelectionne == 'none' && imgCaseDessus == 'none'  && imgCaseDessous == 'none' && imgCaseDroite == 'none' && imgCaseGauche == 'none'){
            player2.y = yRandom;
            player2.x = xRandom;
            break;
        }
    }

    $(j2).css('background-image', 'url("img/j2.jpg")').css('background-size', '90% 90%').css('background-repeat', 'no-repeat').css('background-position', 'center');

});
