$(document).ready(function(){
    var submitButton_ID = "buttonSubmit";

    var fighterName_ID = "fighterNameInput";
    var fighterAge_ID = "fighterAgeInput";
    var fighterCatInfo_ID = "fighterCatInfoInput";
    var fighterWins_ID = "fighterWinsInput";
    var fighterLoss_ID = "fighterLossInput";

    var submitButton = document.getElementById(submitButton_ID);
    submitButton.disabled = true;

    var nameElement = document.getElementById(fighterName_ID);
    var ageElement = document.getElementById(fighterAge_ID);
    var infoElement = document.getElementById(fighterCatInfo_ID);
    var winsElement = document.getElementById(fighterWins_ID);
    var lossElement = document.getElementById(fighterLoss_ID);

    nameElement.addEventListener("change", checkIfEmpty);
    ageElement.addEventListener("change", checkIfEmpty);
    infoElement.addEventListener("change", checkIfEmpty);
    winsElement.addEventListener("change", checkIfEmpty);
    lossElement.addEventListener("change", checkIfEmpty);

    function checkIfEmpty()
    {
        var nameValue = document.getElementById(fighterName_ID).value;
        var ageValue = document.getElementById(fighterAge_ID).value;
        var infoValue = document.getElementById(fighterCatInfo_ID).value;
        var winsValue = document.getElementById(fighterWins_ID).value;
        var lossValue = document.getElementById(fighterLoss_ID).value;

        if(nameValue == "" || nameValue == null || ageValue == "" || ageValue == null || infoValue == "" || infoValue == null || winsValue == "" || winsValue == null || lossValue == "" || lossValue == null)
        {
            submitButton.disabled = true;

        }
        else
        {
            submitButton.disabled = false;
        }

        if(winsValue < 0 || lossValue < 0)
        {
            submitButton.disabled = true
        }
    }
});









