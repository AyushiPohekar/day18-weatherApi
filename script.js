// bootstrap container
var container=document.createElement('div');
container.setAttribute('class','container');


// bootstrap row
var row=document.createElement('div');
row.setAttribute('class','row');
container.append(row);
document.body.append(container);

// pagination logic
var cur_page=0;
var records_per_page=21;
var max_pages=Math.ceil(250/records_per_page);

function prev_page()
{
    if(cur_page>1)
    {
        changePage(cur_page-1);
    }
}
function next_page()
{
    if(cur_page<max_pages)
    {
        changePage(cur_page+1);
    }
}

function changePage(num)
{
    if(num<1)
    {
        num=1;
    }
    if(num>max_pages){
        num=max_pages;
    }

    var startpoint=(num-1)*records_per_page;
    var endpoint=(num)*records_per_page;

    cur_page=num;
    Create_data_container(startpoint,endpoint);

    if (num===1){
        document.getElementById("prev").style.visibility="hidden";
    }
    else{
        document.getElementById("prev").style.visibility="hidden";
    }

    if (num===max-pages){
        document.getElementById("next").style.visibility="hidden";
    }
    else{
        document.getElementById("prev").style.visibility="hidden";
    }
}


 async function get_weather_data() {
        container.innerHTML='';
        try {
            let response = await fetch("https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json");
            console.log(response);
            let data = await response.json();
            console.log(data);
            
            
             data.forEach((element, index) => {
                var card = document.createElement('div');
                card.setAttribute('class','card row col-lg-4 col-md-6 col-sm-12');
                card.setAttribute("id","cards")
    
    
                var header = document.createElement('h4')
                header.setAttribute('class', 'card-title text-center  text-black')
                header.innerHTML = element.name;
                console.log(element.name);
    

                

                card.append(header);
                row.append(card);
                container.append(row);
            })
           


        
         
        }
        catch (error) {
            console.log(error);
        }
    }
    get_weather_data();


// Anchorlist

var Anchorlist=document.createElement("div");
Anchorlist.setAttribute('class','anchorlist');

var prev=document.createElement('a');
prev.href=`javascript:prev_page`;
prev.id='prev';
prev.innerHTML='&laquo;';

var next=document.createElement('a');
next.href=`javascript:next_page`;
next.id='next';
next.innerHTML="&raquo;";

var arr=createAnchorlist();

function createAnchorlist()
{
    var  ar=[];
    for(var i=1;i<=11;i++)
    {
        var a=document.createElement('a');
        a.href=`javascript:(${i})`;
        a.innerHTML=i;
        if(i==1)
        {
            a.setAttribute("class","active");
        }
        ar.push(a);
    }
    return ar;
}
Anchorlist.append(prev, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9],arr[10],next)
container.append(Anchorlist);







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