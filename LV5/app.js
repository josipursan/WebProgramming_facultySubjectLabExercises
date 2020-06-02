var firstSide_string = "firstSide";
var secondSide_string = "secondSide";
var cat_info_class_string = ".cat-info"; 
var fighterBox_string = "fighter-box";
var randomFightersButton_string = "randomFight";
var fightButton_string = "generateFight";


var firstSide = document.getElementById(firstSide_string);
var secondSide = document.getElementById(secondSide_string);
var fightbutton = document.getElementById(fightButton_string);

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

fightbutton.addEventListener("click", fight);



function fight()
{
    var rememberFirstSideCat = 0;
    var rememberSecondSideCat = 0;

    var winsFirst = 0;
    var lossesFirst = 0;

    var winsSecond = 0;
    var lossesSecond = 0;

    let array_firstSideFighters = Array.from(firstSide.getElementsByClassName(fighterBox_string));
    let array_secondSideFighters = Array.from(secondSide.getElementsByClassName(fighterBox_string));

    var firstSideFeatured_catPicture = Array.from(firstSide.getElementsByClassName("featured-cat-fighter-image"));
    var secondSideFeatured_catPicture = Array.from(secondSide.getElementsByClassName("featured-cat-fighter-image"));

    for(let i = 0; i<array_firstSideFighters.length; i++)
    {
        if(array_firstSideFighters[i].lastElementChild.getAttribute("src") == firstSideFeatured_catPicture[0].getAttribute("src"))
        {
            winsFirst = JSON.parse(array_firstSideFighters[i].attributes[1].value).record.wins;
            lossesFirst = JSON.parse(array_firstSideFighters[i].attributes[1].value).record.loss;
            rememberFirstSideCat = i;
        }
        else
        {
            continue;
        }
    }

    for(let i = 0; i<array_secondSideFighters.length; i++)
    {
        if(array_secondSideFighters[i].lastElementChild.getAttribute("src") == secondSideFeatured_catPicture[0].getAttribute("src"))
        {
            winsSecond = JSON.parse(array_secondSideFighters[i].attributes[1].value).record.wins;
            lossesSecond = JSON.parse(array_firstSideFighters[i].attributes[1].value).record.loss;
            rememberSecondSideCat = i;
        }
    }
    
    var firstFighter_WLPercentage = (winsFirst/(winsFirst+lossesFirst))*100;
    var secondFighter_WLPercentage = (winsSecond/(winsSecond+lossesSecond))*100;
    console.log(secondFighter_WLPercentage);

    var chances = [];

    if((firstFighter_WLPercentage-secondFighter_WLPercentage) > 0)
    {
        if(Math.abs(firstFighter_WLPercentage-secondFighter_WLPercentage) < 10)
        {
            chances.push(60);
            chances.push(40);
        }
        else if(Math.abs(firstFighter_WLPercentage-secondFighter_WLPercentage) > 10)
        {
            chances.push(70);
            chances.push(30);
        }
    }
    else if((firstFighter_WLPercentage-secondFighter_WLPercentage) < 0)
    {
        if(Math.abs(firstFighter_WLPercentage-secondFighter_WLPercentage) < 10)
        {
            chances.push(40);
            chances.push(70);
        }
        else if(Math.abs(firstFighter_WLPercentage-secondFighter_WLPercentage) > 10)
        {
            chances.push(30);
            chances.push(70);
        }
    }

    var fighters = [
        "first", 
        "second",
    ];
    
    var sum = chances.reduce((acc, el) => acc + el, 0);
    var acc = 0;
    chances = chances.map(el => (acc = el + acc));
    var rand = Math.random() * sum;
    var result = fighters[chances.filter(el => el <= rand).length];
    console.log(result);

    if(result == fighters[0])
    {
        firstSideFeatured_catPicture[0].style.border = 'solid 4px green';
        secondSideFeatured_catPicture[0].style.border = 'solid 4px red'
    }
    else
    {
        secondSideFeatured_catPicture[0].style.border = 'solid 4px green';
        firstSideFeatured_catPicture[0].style.border = 'solid 4px red';
    }
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

    if(boolValueToogle_firstSide == 0 && boolValueToggle_secondSide == 0)
    {   
        fightButton.disabled = true;
    }
    else if(boolValueToogle_firstSide == 1 && boolValueToggle_secondSide == 1)
    {
        fightButton.disabled = false;   
    }
    else
    {
        fightButton.disabled = true;
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
    featuredCatFighter[0].style.border = "none";
}


function getFighterOnClick(fighterObject)
{
    let clickedFighterName = JSON.parse(fighterObject.attributes[1].value).name; 

    let newParent = fighterObject.parentNode;

    do
    {
        newParent = newParent.parentNode;
        
        var comparison1 = newParent.id.localeCompare(firstSide_string);
        var comparison2 = newParent.id.localeCompare(secondSide_string);

        if(comparison1 == 0 || comparison2 == 0)
        {
            var currentSide = newParent.id;
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
            if(currentFighterName.localeCompare(clickedFighterName) == 0)
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
}