$(document).ready(function () {
  let openWeatherMap;
  const apiKey = "4fef282177ffa572c43cefbf2ccb3143"; // Api nyckel som behövs för fetching av API:et
  const url = "https://api.openweathermap.org/data/2.5/weather?q="; // API

  var btn = document.querySelector(".button");
  let input = document.querySelector(".input");
  let name = document.querySelector(".name");
  let desc = document.querySelector(".description");
  let temp = document.querySelector(".temperature");
  let checkbox = document.querySelector(".degrees");
  let language = document.querySelector(".language");

  btn.addEventListener("click", fetchCity); // Parameter 1, Land eller stad
  checkbox.addEventListener("click", fetchDegrees); // Parameter 2, Temperatur = imperial & metric, C & F
  language.addEventListener("click", fetchLanguage); // Parameter 3, Språk (Ändrande av beskrivning av väderförhållanden)

  async function fetchCity() {
    try {
      let response = await fetch(url + input.value + "&appid=" + apiKey);
      let data = await response.json();
      if (input.value.trim() == "") {
        name.innerHTML = "Error! City or region not found.";
        temp.innerHTML = "";
        desc.innerHTML = "";
        $("#wicon").attr("src", "");
        return;
      }
      let nameValue = data.name;
      name.innerHTML = nameValue;
      let tempValue = Math.round(data.main.temp - 273.15);
      temp.innerHTML = tempValue + " °C";
      let descValue = data.weather[0].description;
      desc.innerHTML = descValue;
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
      $("#wicon").attr("src", iconurl);
    } catch {
      name.innerHTML = "Error! City or region not found.";
      temp.innerHTML = "";
      desc.innerHTML = "";
      $("#wicon").attr("src", "");
    }
  }

  async function fetchDegrees() {
    var checkbox1 = "";
    if (checkbox.checked) {
      checkbox1 = "imperial";
    } else if (!checkbox.checked) {
      checkbox1 = "metric";
    }
    let response = await fetch(
      url + input.value + "&appid=" + apiKey + "&units=" + checkbox1
    );
    let data = await response.json();
    let tempValue = Math.round(data.main.temp);
    if (checkbox.checked) {
      temp.innerHTML = tempValue + " °F";
    } else if (!checkbox.checked) {
      temp.innerHTML = tempValue + " °C";
    }
  }

  async function fetchLanguage() {
    let response = await fetch(
      url + input.value + "&appid=" + apiKey + "&lang=" + language.value
    );
    let data = await response.json();
    let descValue = data.weather[0].description;
    desc.innerHTML = descValue;
  }
});
