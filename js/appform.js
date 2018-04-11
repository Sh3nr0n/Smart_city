function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        console.log(files.length)
        var file = files[i];
        var imageType = /^image\//;

        if (!imageType.test(file.type)) {
            continue;
        }
        var img = document.createElement("img");
        img.classList.add("miniature");
        img.file = file;
        document.getElementById("preview").appendChild(img); // En admettant que "preview" est l'élément div qui contiendra le contenu affiché. 

        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);

        $('#cadrePhoto').children().hide();
        $('#supprimer').html("<label class='suppButton'><i class='fas fa-times-circle fa-3x'></i><input type='button' onchange='removePhoto()'>");
        $("#supprimer").show();

    }
}

$('#supprimer').on("click", removePhoto);

function removePhoto() {
    // Une même image ne s'affichera pas si elle est rechargée une seconde fois.
    $("#preview").children().remove();
    $("#supprimer").children().hide();
    $('#cadrePhoto').children().show();
}

$(document).ready(function(){
//Récupération de la catégorie depuis le sessionstorage

var cat = sessionStorage.getItem("categorie");
console.log(cat);
$("#title").text(cat);

//Récupération de la latitude depuis le sessionstorage
var lat = sessionStorage.getItem("lat");
console.log(lat);

//Récupération de la longitude depuis le sessionstorage
var lon = sessionStorage.getItem("lon");
console.log(lon);

//Obtenir le nombre d'enregistrements / la taille d'un objet
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

//Obtenir les nouvelles valeurs dans le tableau (objet)

//Vérification de la présence de l'objet userMarkers dans le locastorage 
console.log(localStorage.getItem("userMarkers")==null);

if (localStorage.getItem("userMarkers")==null){
    // Initialiser l'objet dans le localstorage
    var userMarkers = {"obj1":{"lat":lat,"lon":lon,"cat":cat}};
    localStorage.setItem("userMarkers",JSON.stringify(userMarkers));
    getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));
    console.log("getUserMarkers if : ",getUserMarkers);
}else{
    //Récupération de l'objet userMarkers
    getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));
    console.log("getUserMarkers else : ",getUserMarkers );

    //Nombre d'enregistrements dans l'objet
    var objSize = Object.size(getUserMarkers);
    console.log("size : ",Object.size(getUserMarkers));

    //Ajouter une nouvelle ligne au tableau:
    //Nombre de lignes
    var objetNumber = objSize+1;
    //Concaténation du nom de la clé
    var objet = 'obj'+objetNumber;
    console.log("objet:",objet);
    //Création de la nouvelle ligne (valeur associée à la clé)
    newEntry = {"lat" :lat,"lon":lon,"cat" :cat};
    console.log(newEntry);
    //Ajout de la ligne (valeur) dans la dernière clé de l'objet userMarkers
    getUserMarkers[objet]= newEntry;
    //Stocker le nouveau tableau dans l'objet userMarkers du localStorage
    setUserMarkers = localStorage.setItem("userMarkers", JSON.stringify(getUserMarkers));
}

console.log("getUserMarkers",getUserMarkers);


});