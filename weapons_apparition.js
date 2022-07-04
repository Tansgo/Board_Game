$(function() {

    var yRandom, xRandom;
    var urlImg;
    var weapon, cssCaseSelectionne, imgCaseSelectionne;

    for(i = 0; i < 3; i++){
        while(true){ //Tant qu'on a pas positionné l'arme en cours

            yRandom = parseInt(Math.random() * 9); //Le placement se fait aléatoirement
            xRandom = parseInt(Math.random() * 9);

            weapon = 'tr:eq('+yRandom+') > td:eq('+xRandom+')'; //On crée le sélecteur de la case choisie aléatoirement
            cssCaseSelectionne = $(weapon).css('background-color').toString(); //On récupère le css de la case
            imgCaseSelectionne = $(weapon).css('background-image').toString(); //On récupère l'image de la case

            if(cssCaseSelectionne == 'rgba(0, 0, 0, 0)' && imgCaseSelectionne == 'none'){ //S'il y a pas de couleur, ni d'image, on peut placer l'arme sur la case

                switch (i) {

                    case 0:
                        urlImg = baton.url; //On spécifie l'url de l'image de l'arme
                        baton.y = yRandom; //On donne les coordonnées aux propriétés de l'arme
                        baton.x = xRandom;
                        break;

                    case 1:
                        urlImg = boule.url;
                        boule.y = yRandom;
                        boule.x = xRandom;
                        break;

                    case 2:
                        urlImg = fusilChasse.url;
                        fusilChasse.y = yRandom;
                        fusilChasse.x = xRandom;
                        break;
                }

                $(weapon).css('background-image', urlImg).css('background-size', '90% 90%').css('background-repeat', 'no-repeat').css('background-position', 'center'); //On place l'arme sur la case en lui attribuant des valeurs css
                break; //On quitte la boucle car on a pu placé l'arme
            }
        }
    }

});
