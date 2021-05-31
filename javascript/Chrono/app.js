const affichageTravail = document.querySelector(".affichageT");
const affichagePause = document.querySelector(".affichageP");
const btnGo = document.querySelector(".b1");
const btnPause = document.querySelector(".b2");
const btnReset = document.querySelector(".b3");
const cycles = document.querySelector("h2");

let checkInterval = false;
let tempsInitial = 3000;
let tempsDeRepos = 300;
let pause = false;
let nbDeCycles = 0;

affichageDuNombreDeCycles();
affichageDuTempsDeTravail();
affichageDuTempsDePause();

btnGo.addEventListener("click", () => {
  if (checkInterval === false) {
    checkInterval = true;

    tempsInitial--;
    affichageDuTempsDeTravail();

    
    let timer = setInterval(() => {
      if (pause === false && tempsInitial > 0) {
        tempsInitial--;
        affichageDuTempsDeTravail();
      } else if (pause === false && tempsDeRepos === 0 && tempsInitial === 0) {
        tempsInitial = 1800;
        tempsDeRepos = 300;
        nbDeCycles++;
        affichageDuNombreDeCycles();
        affichageDuTempsDeTravail();
        affichageDuTempsDePause();
      } else if (pause === false && tempsInitial === 0) {
        tempsDeRepos--;
        affichageDuTempsDePause();
      }

      btnReset.addEventListener('click', () => {
        clearInterval(timer);
        checkInterval = false;
        tempsInitial = 1800;
        tempsDeRepos = 300;
        affichageDuTempsDeTravail();
        affichageDuTempsDePause();
      })
    }, 1000);
  } else {
    return;
  }

  

});

btnPause.addEventListener('click', () => {

    if(pause === false) {
      btnPause.innerHTML = "Play";
    }
    else if (pause === true) {
      btnPause.innerHTML = "Pause";
    }
    pause = !pause;
})




function affichageDuNombreDeCycles() {
  cycles.innerText = `Nombre de cycles ${nbDeCycles}`;
}

function affichageDuTempsDeTravail() {
  affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${
    Math.trunc(tempsInitial % 60 < 10)
      ? `0${Math.trunc(tempsInitial % 60)}`
      : Math.trunc(tempsInitial % 60)
  }`;
}

function affichageDuTempsDePause() {
  affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)} : ${
    Math.trunc(tempsDeRepos % 60 < 10)
      ? `0${Math.trunc(tempsDeRepos % 60)}`
      : Math.trunc(tempsDeRepos % 60)
  }`;
}
