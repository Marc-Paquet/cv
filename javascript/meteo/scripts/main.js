import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

const CLEFAPI = 'fd772f565c09c12e1e9ebceddc79292b';
let resultatsAPI;


const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur')
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargement = document.querySelector('.overlay-icone-chargement')


if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {

    // console.log(position);
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    appelAPI(long, lat);

  }, () => {
    alert(`Vous avez refusé la géolocalistion, l'application ne peut fonctionner !`)
  })
}

function appelAPI(long, lat) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {

      resultatsAPI = data;

      temps.innerText = resultatsAPI.current.weather[0].description;
      temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}° C`;
      localisation.innerText = resultatsAPI.timezone;

      // heures par tranche de trois et temp

      let heureActuelle = new Date().getHours();

      for(let i = 0 ; i < heure.length ; i++) {

        let heureIncr = heureActuelle + i * 3;

        if(heureIncr > 24) {
          heure[i].innerText = `${heureIncr - 24} h`;
        }
        else if(heureIncr === 24) {
          heure[i].innerText = '00 h'
        }
        else {
          heure[i].innerText = `${heureIncr} h`
        }
      }

      for(let i = 0 ; i < tempPourH.length ; i++) {
        tempPourH[i].innerText = `${Math.trunc(resultatsAPI.hourly[i*3].temp)}° C`
      }


      // trois premières lettres des jours

      for (let i = 0 ; i < tabJoursEnOrdre.length ; i++) {
        joursDiv[i].innerText = tabJoursEnOrdre[i].slice(0, 3);
      }

      for (let i = 0 ; i < tabJoursEnOrdre.length ; i++) {
        tempJoursDiv[i].innerText = `${Math.trunc(resultatsAPI.daily[i + 1].temp.day)}° C`;
      }

      // icone dynamique

      if(heureActuelle >= 6 && heureActuelle < 21) {
        imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
      }
      else {
        imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
      }

      chargement.classList.add('disparition');
      
    })
}