$(function(){

    var choix = true; //A la valeur true tant qu'il y a des choix à faire

    function choisir(){ //Les joueurs choisissent s'ils vont attaquer ou défendre
        if(choix){
            if(firstPlayer.strategie == null){ //Si le joueur 1 n'a pas fait son choix
                choix = false; //Permet d'éviter que la fonction se répéte tant que le premier joueur n'a pas fait son choix
                $('#combat').html('<p>' + firstPlayer.nick + ', faites votre choix.</p><br><button id="att">Attaquer</button><button id="def">Défendre</button>'); //Affiche les choix au joueur 1
                $('#att').click(function(){ //Si l'attaque est choisi
                    firstPlayer.strategie = "attaque"; //On donne la stratégie attaque au joueur 1
                    choix = true; //On remet la valeur true pour permettre au joueur 2 de choisir sa stratégie
                });
                $('#def').click(function(){
                    firstPlayer.strategie = "defense";
                    choix = true;
                });
            }
            else{
                choix = false;
                $('#combat').html('<p>' + secondPlayer.nick + ', faites votre choix.</p><br><button id="att">Attaquer</button><button id="def">Défendre</button>');
                $('#att').click(function(){
                    secondPlayer.strategie = "attaque";
                });
                $('#def').click(function(){
                    secondPlayer.strategie = "defense";
                });
            }
        }
    }

    function attaque(){ //Execute les stratégies
        if(firstPlayer.strategie && secondPlayer.strategie){ //Tant que les choix des 2 joueurs ne sont pas fait, la fonction ne s'execute pas
            //On étudie ensuite cas par cas le choix stratégique des joueurs pour appliquer les actions correspondantent. On affiche ensuite aux 2 joueurs les actions qui se déroule et les dégâts pris par chacun
            if(firstPlayer.strategie == "attaque"){
                if(secondPlayer.strategie == "defense"){
                    secondPlayer.life -= firstPlayer.weapon.damage/2;
                    $('#combat').html('<p>' + firstPlayer.nick + ' attaque ! Mais ' + secondPlayer.nick + ' se défend. ' + firstPlayer.nick + ' inflige ' + firstPlayer.weapon.damage/2 + ' points de dégâts à ' + secondPlayer.nick + '.</p>');
                }
                else{
                    secondPlayer.life -= firstPlayer.weapon.damage;
                    firstPlayer.life -= secondPlayer.weapon.damage;
                    $('#combat').html('<p>' + firstPlayer.nick + ' attaque ! ' + firstPlayer.nick + ' inflige ' + firstPlayer.weapon.damage + ' points de dégâts à ' + secondPlayer.nick + '.</p><br><p>' + secondPlayer.nick + ' attaque ! ' + secondPlayer.nick + ' inflige ' + secondPlayer.weapon.damage + ' points de dégâts à ' + firstPlayer.nick + '.</p>');
                }
            }
            else{
                if(secondPlayer.strategie == "defense"){
                    $('#combat').html('<p>' + firstPlayer.nick + ' défend ! Mais ' + secondPlayer.nick + ' se défend aussi. Il ne se passe rien...</p>');
                }
                else{
                    firstPlayer.life -= secondPlayer.weapon.damage/2;
                    $('#combat').html('<p>' + secondPlayer.nick + ' attaque ! Mais ' + firstPlayer.nick + ' se défend. ' + secondPlayer.nick + ' inflige ' + secondPlayer.weapon.damage/2 + ' points de dégâts à ' + firstPlayer.nick + '.</p>');
                }
            }

            firstPlayer.strategie = null;
            secondPlayer.strategie = null;
            setTimeout(function(){choix = true;}, 5000); //Attendre 5sec avant de faire un nouveau choix pour permettre aux joueurs de lire ce qui vient de se passer
        }
    }

    function fight(){ //Cette fonction va se répéter tant qu'il y a un combat. Permet de créer des "tours" où on choisit sa stratégie avec les actions qui s'en suit
        if(combat){ //Tant que true, il y a toujours le combat
            choisir(); //On choisit d'abord la stratégie
            attaque(); //Puis on les mets à éxecution
            $('#player1Life').text(player1.life.toString()); //On met à jour l'affichage des vies des joueurs
            $('#player2Life').text(player2.life.toString());
            if(firstPlayer.life <= 0 || secondPlayer.life <= 0){ //Si l'un des 2 joueurs est K.O
                combat = false; //Le combat est arrêté
                if(secondPlayer.life <= 0) alert(firstPlayer.nick + ' a gagné !'); //On ouvre une boite de dialogue pour donner le gagnant
                else alert(secondPlayer.nick + ' a gagné !');
                window.location = "index.html"; //On quitte le plateau pour mettre fin au jeu une fois la boite de dialogue cliquée
            }
        }
    }

    setInterval(fight, 100); //La fonction fight va se répéter toutes les 100ms
});
