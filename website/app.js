/* Global Variables */

// Create a new date instance dynamically with JS
let todayDate = new Date();
let newDate = todayDate.getMonth()+'.'+ todayDate.getDate()+'.'+ todayDate.getFullYear();

//API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let APIKey = '&appid=8ac5a4d425d7e497393615797b605ac4&units=imperial';

//DOM
const buttonEl = document.getElementById('generate');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const contentEl = document.getElementById('content');


/*functions and events*/

//click on button event
buttonEl.addEventListener('click',startFunction);

//function when button clicked
function startFunction(){
    const zipCode = document.getElementById('zip').value;
    const countryEl = document.getElementById('country').value;
    const feelings = document.getElementById('feelings').value;
    
    NewURL(baseURL,zipCode,countryEl,APIKey)
        .then(function(data){
            postData('/post',{date:newDate, temp:data.main.temp, content:feelings});
            updateUI();
        });
};

//get the data of API
const NewURL = async (url, zip,country,key)=>{
    const res = await fetch(url+zip+","+country+key)
    try{
        const data = await res.json();
        return data;
    }catch(error){
        console.log("error",error);
        dateEl.innerHTML = "error in getting your data";
    }
}

//post data function
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    dateEl.innerHTML = "error in getting your data";
    }
}


// Get data and Add Data to the site
const updateUI = async () =>{
    const request = await fetch('/get');
    try{
        const allData = await request.json();
        dateEl.innerHTML = `Date: ${allData.date} `;
        tempEl.innerHTML = `Temperature: ${allData.temp}`
        contentEl.innerHTML = `I Feel: ${allData.content}`;
    }catch(error){
        console.log("error",error);
        dateEl.innerHTML = "error in getting your data";
    }
}