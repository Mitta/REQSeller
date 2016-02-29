// ==UserScript==
// @name         REQ Seller
// @namespace    http://bymitta.nl/
// @version      0.5
// @description  Sell your REQs the easy way
// @author       ByMitta
// @match        https://www.halowaypoint.com/en-us/games/halo-5-guardians/xbox-one/requisitions/categories/powerandvehicle?ownedOnly=False
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


var bt_startselling = document.createElement("input");
bt_startselling.type = "button";
bt_startselling.value = "Start Selling";
bt_startselling.onclick = StartSelling;
bt_startselling.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 99999;' ;

var tb_amountToKeep = document.createElement("input");
tb_amountToKeep.type = "text";
tb_amountToKeep.id = 'amountOfCardsToKeep';
tb_amountToKeep.value = 5;
tb_amountToKeep.style.cssText = 'position: fixed; top: 30px; left: 0px; z-index: 99999';



document.body.appendChild(bt_startselling);
document.body.appendChild(tb_amountToKeep);



function GetAmountOfCards()
{
    var amountOfCards = document.getElementsByClassName("popup-content")[0].getElementsByClassName('text--small card-count')[0].innerText;
    amountOfCards = amountOfCards.substring(1);
    return amountOfCards;
}

function StartSelling()
{
    var amountOfCards = GetAmountOfCards();
    var cardThreshold = document.getElementById('amountOfCardsToKeep').value;

    if(cardThreshold < amountOfCards)
    {
        //Check if the confirmation window is gone
        if(document.getElementsByClassName("popup-content")[1] == null)
        {
            var sellButton = document.getElementsByClassName("popup-content")[0].getElementsByTagName('button');
            sellButton[0].click();
            setTimeout(function(){
                var buttons = document.getElementsByClassName("popup-content")[1].getElementsByClassName('button-list')[0].getElementsByTagName('button');
                for (var i = 0; i < buttons.length; i++) {
                    console.log(buttons[i]);

                    if (buttons[i].innerHTML == 'Yes') {
                        console.log(buttons[i]);
                        buttons[i].click();
                        break;
                    }
                }
            }, 400);
        }
        setTimeout(function(){
            StartSelling();
        }, 500);
    }


}
