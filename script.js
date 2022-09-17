// bootstrap container
var container = document.createElement("div");
container.setAttribute("class", "container");

// bootstrap row
var row = document.createElement("div");
row.setAttribute("class", "row");

// pagination logic
var cur_page = 0;
var records_per_page = 25;
var max_pages = Math.ceil(250 / records_per_page);

function prev_page() {
  if (cur_page > 1) {
    changePage(cur_page - 1);
  }
}
function next_page() {
  if (cur_page < max_pages) {
    changePage(cur_page + 1);
  }
}

function changePage(num) {
  if (num < 1) num = 1;

  if (num > max_pages) num = max_pages;

  var startpoint = (num - 1) * records_per_page;
  var endpoint = num * records_per_page;

  cur_page = num;
  Create_data_container(startpoint, endpoint);

  if (num === 1) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }

  if (num === max_pages) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }
}

function Create_data_container(start, end) {
  row.innerHTML = " ";
  async function get_weather_data() {
    try {
      let response = await fetch("https://restcountries.com/v3.1/all");
      console.log(response);
      let data = await response.json();
      console.log(data);

      for (var i = start; i < end; i++) {
        var card = document.createElement("div");
        card.setAttribute("class", "card row col-lg-4 col-md-6 col-sm-12");
        card.setAttribute("id", "cards");

        var header = document.createElement("h4");
        header.setAttribute("class", "card-title text-center");
        header.innerHTML = data[i].name.common;

        // var cardbody = document.createElement('div');
        // card.setAttribute('class','card-body');

        var img = document.createElement("img");
        img.setAttribute("class", "card-img-top img-center");
        img.src = data[i].flags.png;

        var capital = document.createElement("h6");
        capital.setAttribute("class", "card-text text-center");
        capital.innerHTML = "Capital : " + data[i].capital;

        var region = document.createElement("h6");
        region.setAttribute("class", "card-text text-center");
        region.innerHTML = "Region : " + data[i].region;

        var code = document.createElement("h6");
        code.setAttribute("class", "card-text text-center");
        code.innerHTML = "Country-code : " + data[i].cca3;

        var climate = document.createElement("h6");
        climate.setAttribute("class", "card-text text-center mt-3");
        // climate.innerHTML='hello';

        var button = document.createElement("button");
        button.setAttribute("class", "btn-btn-info button");
       
        button.innerHTML = "Click for Weather";
        button.setAttribute('id',i);
           
            
        button.onclick = async function () {
          try {
            console.log(i);
            console.log(this.id);
            // var a=this.id;
            var response1 = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${data[this.id].latlng[0]}&lon=${data[this.id].latlng[1]}&appid=9886709d311837a96f411b3ed9f3b47e`
            );
            var data1 = await response1.json();
            console.log(data1);
            //  climate.innerHTML=data1.main.temp;
            // climate.id=a;
            // climate.innerHTML = "hello";


          } catch (err) {
            console.log(err);
          }
        };

        row.append(card);
        container.append(row);
        card.append(header, img, capital, region, code, button, climate);
        // cardbody.append(capital);
      }
    } catch (error) {
      console.log(error);
    }
  }
  get_weather_data();
}

// Anchorlist

var Anchorlist = document.createElement("div");
Anchorlist.setAttribute("class", "anchorlist");

var prev = document.createElement("a");
prev.href = `javascript:prev_page`;
prev.id = "prev";
prev.innerHTML = "&laquo;";

var next = document.createElement("a");
next.href = `javascript:next_page`;
next.id = "next";
next.innerHTML = "&raquo;";

var arr = createAnchorlist();

function createAnchorlist() {
  var ar = [];
  for (var i = 1; i <= 11; i++) {
    var a = document.createElement("a");
    a.href = `javascript:changePage(${i})`;
    a.innerHTML = i;
    if (i === 1) {
      a.setAttribute("class", "active");
    }
    ar.push(a);
  }
  return ar;
}
Anchorlist.append(
  prev,
  arr[0],
  arr[1],
  arr[2],
  arr[3],
  arr[4],
  arr[5],
  arr[6],
  arr[7],
  arr[8],
  arr[9],
  arr[10],
  next
);
document.body.append(container, Anchorlist);

changePage(1);

// async function get_weather_data() {
//     try {
//         let response = await fetch("https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json");
//         console.log(response);
//         let data = await response.json();
//         console.log(data);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }
// get_weather_data();
