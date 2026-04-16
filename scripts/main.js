// =================================
// 🌱 1. Sélection des éléments DOM
// =================================
const inputChampion = document.querySelector('.inputChampion');
const addBtn = document.querySelector('.btnAjouter');
const message = document.querySelector('.message');
const compteur = document.querySelector('.compteur');
const listeChampions = document.querySelector('.liste-champions');
const selectContainer = document.querySelector('.select');
// =================================
// 🧠 2. Variables globales / état
// =================================
const champions = [
  // Top
  "Darius", "Garen", "Malphite", "Fiora", "Camille", "Teemo", "Nasus", "Irelia", "Riven", "Sett",
  // Jungle
  "Vi", "Warwick", "Hecarim", "Lee Sin", "Ekko", "Amumu", "Shyvana", "Kha'Zix", "Rengar", "Nidalee",
  // Mid
  "Yasuo", "Lux", "Syndra", "Zed", "Ahri", "Fizz", "Orianna", "Veigar", "Viktor", "Katarina",
  // ADC
  "Jinx", "Caitlyn", "Ezreal", "Jhin", "Miss Fortune", "Vayne", "Ashe", "Draven", "Kai'Sa", "Xayah",
  // Support
  "Thresh", "Lulu", "Blitzcrank", "Soraka", "Nautilus", "Leona", "Morgana", "Zilean", "Nami", "Pyke"
];

const roster = [];
let nbrChampions = 0;
// =================================
// 🎊 3. Fonctions (logique métier)
// =================================
function generateSelect(array) {

  const selectBox = document.createElement('select');
  const disabledOption = document.createElement('option');
  disabledOption.setAttribute('disabled', '');
  disabledOption.setAttribute('selected', '');
  disabledOption.textContent = "Sélectionnez votre champion";
  selectBox.appendChild(disabledOption);

  for (let i = 0; i < array.length; i++) {
    const option = document.createElement('option');
    option.textContent = array[i];
    selectBox.appendChild(option);
  }
  selectContainer.appendChild(selectBox);
}

function displayLastChamp(champion) {
  const myLi = document.createElement('li');
  myLi.textContent = champion[champion.length-1];
  listeChampions.appendChild(myLi);
}

function addChampion(champion, array) {
  if (array.indexOf(champion) !== -1) {
    message.innerHTML = `⚠️ <strong>${champion}</strong> est déjà dans ton roster ! ⚠️`;
    return;
  }
  array.push(champion);
  displayLastChamp(array);
  modifCompteur(roster);
}


function reset(select, input) {
  select.selectedIndex = 0;
  input.value = "";
}

function modifCompteur(tableau) {
  compteur.textContent = tableau.length;
}
// =================================
// 🧲 4. Événements (interactions)
// =================================
generateSelect(champions);

addBtn.addEventListener('click', function() {
    const selectChampion = document.querySelector('select');

    const selectValue = selectChampion.value;
    const inputValue = inputChampion.value;

    if (selectValue === "Sélectionnez votre champion" && inputValue === "") {
      message.textContent = "Merci de remplir au moins un des 2 input"
      return;
    }
    message.textContent = "";
    if (selectValue !== "Sélectionnez votre champion") {
      addChampion(selectValue, roster);
    }
    if (inputValue !== "") {
      addChampion(inputValue, roster);
    }
    
    reset(selectChampion,inputChampion);
    if (roster.length == 5) {
      message.textContent = "⚔️ Ton équipe est prête, bonne chance sur la faille ! ⚔️"
      addBtn.remove();
    }  
}); 