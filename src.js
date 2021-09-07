let chaineCaractere= "";
let elementsToDO=[];
let i=0;
let idMemoire;
let ctn = document.getElementById("contener")

// Check le local storage
window.addEventListener('load', function(){
    display();
});

// Set la saisie dans le local storage
window.addEventListener("keyup",function (event){
    let touche = event.which;
    if (touche==13){
        i = localStorage.length;
        string = document.getElementById("saisieText").value;
        idStore = 'idStore'+i;

        newObj = objectJSON(string);

        localStorage.setItem( idStore, JSON.stringify(newObj));
        display();
        i++;
    }
});

document.getElementById("btAdd").addEventListener("click", function(){
    i = localStorage.length;
    string = document.getElementById("saisieText").value;
    idStore = 'idStore'+i;

    newObj = objectJSON(string);

    localStorage.setItem( idStore, JSON.stringify(newObj));
    display();
    i++;
});

// Clear le local storage
// btCLear = document.getElementById('btClear');
// btClear.addEventListener('click', function(){
//     localStorage.clear();
//     display();
// });

function display() {
    
        let list = '<ul id="list">';
        for(let j=0;j<localStorage.length;j++){

            let obj = JSON.parse(localStorage.getItem('idStore'+j));
            if (obj['status'] == true){
            list += '<li id="idStore'+j+'" class="strike postIt">'+obj['string']+'</li>';
            }else{
                list += '<li id="idStore'+j+'" class="postIt">'+obj['string']+'</li>';
            }

        }
        list += '</ul>';

    ctn.innerHTML = list;

    // Ajout d'une fonction strike sur chaque element de la liste
    let elements = document.getElementById('list').getElementsByTagName('li');

    for(j = 0; j<elements.length; j++) {
            elements[j].addEventListener('click', function  strikeElement(){
                let storeObj = JSON.parse(localStorage.getItem(this.id));
                if (storeObj['status'] == true ) {
                    storeObj['status'] = false;
                }else{
                    storeObj['status'] = true;
                }
                localStorage.setItem(this.id, JSON.stringify(storeObj));
                display();
            });
        }
}

// Suppression de taches barrés dans la liste et reinitialisation du localStorage
document.getElementById("deleteBt").addEventListener("click", function deleteElements(){
    let elStrikes = document.getElementsByClassName("strike");
    console.log(elStrikes);
    for(let k=0; k<elStrikes.length; k++){

        let idDel = elStrikes[k].id;
        localStorage.removeItem(idDel);
    }
    console.log(localStorage);

    let arrayTmp = [];
    
    for(l=0; l<localStorage.length; l++){
        let tmpId = localStorage.key(l);
        arrayTmp[l] = localStorage.getItem(tmpId);
    }
    
    console.log(arrayTmp);
    localStorage.clear();
    for (m=0; m<arrayTmp.length;m++){
        localStorage.setItem('idStore'+m, arrayTmp[m]);
    }
    console.log(localStorage);
    display();
});


/// make an objet JSON
function objectJSON(str) {

    let obj = {
        string : str,
        status : false,
      };

      return obj;
}