$(function() {

    for(var i = 0; i<8; i++){ //On se limite à 8 cases au plus qui peuvent être grisée, pour éviter de se retrouver avec trop de zones grises
        var yRandom = parseInt(Math.random() * 9); //On détermine aléatoirement la coordonnée Y de la future case grisé
        var xRandom = parseInt(Math.random() * 9); //On fait de même avec la coordonnée de X
        var caseGrise = 'tr:eq('+yRandom+') > td:eq('+xRandom+')';  //On initialise les coordonnées en choisissant la ligne du tableau, puis la colonne
        var caseGriseCarte = '#carte ' + caseGrise; //On crée le sélecteur en s'assurant d'être bien sur la carte
        $(caseGriseCarte).css('background-color', 'rgba(190,190,190,0.6)'); //La case selectionné est grisé avec un peu de transparence
    }

});
