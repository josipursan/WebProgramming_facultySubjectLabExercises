// Zadatak 1 kod ide ovdje

var firstSide_fightButtonApproval = 0;
var secondSide_fightButtonApproval = 0;
toggleFighterButton(0,0);



let allFighters = document.getElementsByClassName("fighter-box");

for(let i = 0; i<allFighters.length; i++)
{
    allFighters[i].addEventListener("click", function() {getFighterOnClick(allFighters[i])}, false);
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



/////////////////////////////////////////////////////////////////////////////   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


function getFighterOnClick(fighterObject)
{
    let firstSide_string = "firstSide";
    let secondSide_string = "secondSide";

    let firstSide = document.getElementById(firstSide_string);
    let secondSide = document.getElementById(secondSide_string);

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
        let clickedFighterName = JSON.parse(fighterObject.attributes[1].value).name; 
        let clickedFighterAge = JSON.parse(fighterObject.attributes[1].value).age;
        let clickedFighterCatInfo = JSON.parse(fighterObject.attributes[1].value).catInfo;
        let clickedFighterWins = JSON.parse(fighterObject.attributes[1].value).record.wins;
        let clickedFighterLosses = JSON.parse(fighterObject.attributes[1].value).record.loss;
        
        let firstSide_catInfo = firstSide.querySelector(".cat-info").children;
        let array_firstSide_catInfo = Array.from(firstSide_catInfo);
        array_firstSide_catInfo[0].innerText = "Name : " + clickedFighterName;
        array_firstSide_catInfo[1].innerText = "Age : " + clickedFighterAge;
        array_firstSide_catInfo[2].innerText = "Cat Info : " + clickedFighterCatInfo;
        array_firstSide_catInfo[3].innerText = "Wins : " + clickedFighterWins + " " + "Losses : " + clickedFighterLosses;
        // Cijeli gornji segment koda koji sluzi za popunjavanje polja odabranog fightera s njegovim podacima
        // izdvojiti u zasebnu funkciju. Funkcija ce primati jedan parametar, fighter object, nema returna. 
        
        console.log(array_firstSide_catInfo[0].innerText);



        let clickedFighter_picturePath = fighterObject.firstElementChild.getAttribute("src");   //dohvacena putanja slike kliknute macke

        let secondSide_fighters = secondSide.getElementsByClassName("fighter-box");
        

        Array.from(secondSide_fighters).forEach((item) => 
        {
            const currentFighterName = JSON.parse(item.dataset.info).name;
            if(currentFighterName.localeCompare(clickedFighterName) == 0)
            {
                item.style.opacity = "0.3";
            }
        });

        // 5 linija koda ispod je za prebacivanje slike u tamo gdje treba biti slika odabranog fightera
        let firstSide_featuredCatFighter = firstSide.getElementsByClassName("featured-cat-fighter-image");
        console.log(firstSide_featuredCatFighter);

        let featuredCatFighter = Array.from(firstSide_featuredCatFighter);
        featuredCatFighter[0].src = clickedFighter_picturePath;
        console.log(featuredCatFighter[0].getAttribute("src"));
        //Gornjih 5 linija za prebacivanje slike odabranog borca u gornju poziciju izdvojiti kao 
        //zasebnu funkcionalnost. Funkciji se ne predaje nista, mora samo imati pristup firstSide varijabli
        //sto znaci da ju mozda treba prebaciti u globalnu varijablu, ili napraviti onaj neki data object
        //kao sto je Omrcen napravio, i onda passati odgovarajuci parametar za firstSide. 

        firstSide_fightButtonApproval = 1;
    }
    else
    {
        let clickedFighterName = JSON.parse(fighterObject.attributes[1].value).name;
        
        let clickedFighterNameR = JSON.parse(fighterObject.attributes[1].value).name; 
        let clickedFighterAgeR = JSON.parse(fighterObject.attributes[1].value).age;
        let clickedFighterCatInfoR = JSON.parse(fighterObject.attributes[1].value).catInfo;
        let clickedFighterWinsR = JSON.parse(fighterObject.attributes[1].value).record.wins;
        let clickedFighterLossesR = JSON.parse(fighterObject.attributes[1].value).record.loss;
        
        let secondSide_catInfo = secondSide.querySelector(".cat-info").children;
        let array_secondSide_catInfo = Array.from(secondSide_catInfo);
        array_secondSide_catInfo[0].innerText = "Name : " + clickedFighterNameR;
        array_secondSide_catInfo[1].innerText = "Age : " + clickedFighterAgeR;
        array_secondSide_catInfo[2].innerText = "Cat Info : " + clickedFighterCatInfoR;
        array_secondSide_catInfo[3].innerText = "Wins : " + clickedFighterWinsR + " " + "Losses : " + clickedFighterLossesR;
        // Gornji segment koda je ista situacija kao i u taj isti kod prije - izdvojiti u zasebnu funkciju. 

        let firstSide_fighters = firstSide.getElementsByClassName("fighter-box");

        Array.from(firstSide_fighters).forEach((item) => 
        {
            const currentFighterName = JSON.parse(item.dataset.info).name;
            if(currentFighterName.localeCompare(clickedFighterName) == 0)
            {
                console.log("Current fighter name");
                console.log(currentFighterName);
                item.style.opacity = 0.3;

            }
        });
        let clickedFighter_picturePath = fighterObject.firstElementChild.getAttribute("src");
        let secondSide_featuredCatFighter = secondSide.getElementsByClassName("featured-cat-fighter-image");
        console.log(secondSide_featuredCatFighter);

        let featuredCatFighter = Array.from(secondSide_featuredCatFighter);
        featuredCatFighter[0].src = clickedFighter_picturePath;
        // 5 linija iznad - ista prica kao i njihovi blizanci.

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
