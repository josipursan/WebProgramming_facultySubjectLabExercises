// Zadatak 1 kod ide ovdje

var firstSide_string = "firstSide";
var secondSide_string = "secondSide";
var cat_info_class_string = ".cat-info"; 
var fighterBox_string = "fighter-box";
var randomFightersButton_string = "randomFight";

var firstSide = document.getElementById(firstSide_string);
var secondSide = document.getElementById(secondSide_string);

var firstSide_fightButtonApproval = 0;
var secondSide_fightButtonApproval = 0;
toggleFighterButton(0,0);

let randomFightersButton = document.getElementById(randomFightersButton_string);
randomFightersButton.addEventListener("click", getRandomFighters);

let allFighters = document.getElementsByClassName("fighter-box");

for(let i = 0; i<allFighters.length; i++)
{
    allFighters[i].addEventListener("click", function() {getFighterOnClick(allFighters[i])}, false);
}




function getRandomFighters()
{
    let array_firstSideFighters = Array.from(firstSide.getElementsByClassName(fighterBox_string));
    var firstchosenFighter = array_firstSideFighters[Math.floor(Math.random()*array_firstSideFighters.length)];

    let array_secondSideFighters = Array.from(secondSide.getElementsByClassName(fighterBox_string));
    var secondChosenFighter = array_secondSideFighters[Math.floor(Math.random()*array_secondSideFighters.length)];
    do
    {
        if(JSON.parse(firstchosenFighter.attributes[1].value).name == JSON.parse(secondChosenFighter.attributes[1].value).name)
        {
            firstchosenFighter = array_firstSideFighters[Math.floor(Math.random()*array_firstSideFighters.length)];
            secondChosenFighter = array_secondSideFighters[Math.floor(Math.random()*array_secondSideFighters.length)];
        }
        else
        {
            break;
        }
    }while(true)

    fillFighterData(firstchosenFighter, 1);
    putFighterImage(firstchosenFighter, 1);

    fillFighterData(secondChosenFighter, 2);
    putFighterImage(secondChosenFighter, 2);
    toggleFighterButton(1, 1);
}


function toggleFighterButton(boolValueToogle_firstSide, boolValueToggle_secondSide)
{
    let fightButton_idString = "generateFight";
    let fightButton = document.getElementById(fightButton_idString);
    fightButton.disabled = true;

    if(boolValueToogle_firstSide == 0 && boolValueToggle_secondSide == 0)    // 0 fightera je odabrano
    {   
        fightButton.disabled = true;    // fight button is disabled, hence true
    }
    else if(boolValueToogle_firstSide == 1 && boolValueToggle_secondSide == 1)   // oba fightera su odabrana
    {
        fightButton.disabled = false;   
    }
    else
    {
        fightButton.disabled = true;    //samo jedan fighter je odabran
    }
}

function fillFighterData(fighterObject, sideParameter)
{
    let clickedFighterName = JSON.parse(fighterObject.attributes[1].value).name; 
    let clickedFighterAge = JSON.parse(fighterObject.attributes[1].value).age;
    let clickedFighterCatInfo = JSON.parse(fighterObject.attributes[1].value).catInfo;
    let clickedFighterWins = JSON.parse(fighterObject.attributes[1].value).record.wins;
    let clickedFighterLosses = JSON.parse(fighterObject.attributes[1].value).record.loss;
    
    if(sideParameter == 1)
    {
        var Side_catInfo = firstSide.querySelector(cat_info_class_string).children;
    }
    else if(sideParameter == 2)
    {
        var Side_catInfo = secondSide.querySelector(cat_info_class_string).children;;
    }
    let array_Side_catInfo = Array.from(Side_catInfo);
    array_Side_catInfo[0].innerText = "Name : " + clickedFighterName;
    array_Side_catInfo[1].innerText = "Age : " + clickedFighterAge;
    array_Side_catInfo[2].innerText = "Cat Info : " + clickedFighterCatInfo;
    array_Side_catInfo[3].innerText = "Wins : " + clickedFighterWins + " " + "Losses : " + clickedFighterLosses;
}

function putFighterImage(fighterObject, sideParameter)
{
    let clickedFighter_picturePath = fighterObject.firstElementChild.getAttribute("src");
    if(sideParameter == 1)
    {
        var Side_featuredCatFighter = firstSide.getElementsByClassName("featured-cat-fighter-image");
    }
    else if(sideParameter == 2)
    {
        var Side_featuredCatFighter = secondSide.getElementsByClassName("featured-cat-fighter-image");
    }
    
    let featuredCatFighter = Array.from(Side_featuredCatFighter);
    featuredCatFighter[0].src = clickedFighter_picturePath;
}

/////////////////////////////////////////////////////////////////////////////   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


function getFighterOnClick(fighterObject)
{
    let clickedFighterName = JSON.parse(fighterObject.attributes[1].value).name; 

    let newParent = fighterObject.parentNode;

    do  //provjeri je li odabrana fighter macka na lijevoj ili desnoj strani
    {
        newParent = newParent.parentNode;
        
        var comparison1 = newParent.id.localeCompare(firstSide_string);
        var comparison2 = newParent.id.localeCompare(secondSide_string);

        if(comparison1 == 0 || comparison2 == 0)
        {
            var currentSide = newParent.id; //zapamti na koju stranu je kliknut, tj. na kojoj strani se nalazi macka koja je kliknuta
            break;
        }
    }while(true);

    if(currentSide.localeCompare(firstSide_string) == 0)
    {        
        fillFighterData(fighterObject, 1);
        putFighterImage(fighterObject, 1);

        let secondSide_fighters = secondSide.getElementsByClassName("fighter-box");

        Array.from(secondSide_fighters).forEach((item) => 
        {
            const currentFighterName = JSON.parse(item.dataset.info).name;
            if(currentFighterName.localeCompare(clickedFighterName) == 0)    //TU BACA ERROR AKO VARIJABLA clickedFighterName u funkciji fillFighterData ima keyword "let" ili "var"
            {
                item.style.opacity = "0.3";
                item.style.pointerEvents = "none";
            }
        });

        firstSide_fightButtonApproval = 1;
    }
    else
    {
        fillFighterData(fighterObject, 2); 
        putFighterImage(fighterObject, 2);

        let firstSide_fighters = firstSide.getElementsByClassName("fighter-box");

        Array.from(firstSide_fighters).forEach((item) => 
        {
            const currentFighterName = JSON.parse(item.dataset.info).name;
            if(currentFighterName.localeCompare(clickedFighterName) == 0)
            {
                item.style.opacity = 0.3;
                item.style.pointerEvents = "none";
            }
        });
        secondSide_fightButtonApproval = 1;
    }

    toggleFighterButton(firstSide_fightButtonApproval, secondSide_fightButtonApproval);
    // Kad bi Gordon Ramsay pravio špagete kakav je moj špageti kod, čovjek bi bio poznat diljem svemira...
}


/*
Zapisivanje podatak o mackama - izdvojiti, komentar je napisan ispod tog segmenta koda
Prebacivanje slike odabranog fightera u poziciju iznad - izdvojiti, komentar je napisan ispod relevantnog dijela koda

Funkcija koja stavlja fightere u fight pozicij : 
    razmisli da mozda predajes dva parametra : jedan je fighter a drugi je 
    gdje je fighter smjesten (lijeva ili desna strana) tako da funkcija moze odmah ici u tu stranu, a ne 
    traziti redom.


Select random fighter : povuci sve fightere na lijevoj i desnoj strani u zasebne arrayeve 
i onda na svaki taj array pukniti neki math.random ili sto vec javascript ima za dobivanje random elementa.
Onda te random dobijene fightere passati i predati funkciji koja ce ih gurniti gore u fight pozicije.


Ostaje jos jedan problem : kako disablati klikanje fightera na suprotnoj strani ako je taj fighter 
vec odabran na onoj drugoj strani? Nekako s tog fightera treba maknuti event za click...

*/
