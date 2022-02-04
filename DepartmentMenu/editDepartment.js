const form = document.getElementById('form')
const nameInput = document.getElementById('name')
const mangerDropbox = document.getElementById('manger')
const depDropbox = document.getElementById('department')
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('depid');

fetch('https://localhost:44367/api/Employee')
.then(Response => Response.json())
.then(data => {
    let select = document.getElementById("deps");    
for (let index = 0; index < data.length; index++) 
{
    let option = document.createElement("option");
option.text = data[index].fname +" "+ data[index].lname;
option.value = data[index].ID;
mangerDropbox.value = data.ID
mangerDropbox.appendChild(option);
 
}
getDeps()
})

let getDeps = () =>
 {
    fetch('https://localhost:44367/api/Department')
    .then(Response => Response.json())
    .then(data => {
        let select = document.getElementById("deps");    
    for (let index = 0; index < data.length; index++) 
    {
        let option = document.createElement("option");
      
    option.text = data[index].name
    option.value = data[index].ID;
    depDropbox.value = data.ID
    depDropbox.appendChild(option);

    

    }
    })
    
 }





form.addEventListener("submit", (e) => 
{
e.preventDefault()
let depObj = { name: nameInput.value, mangerFK: parseInt(mangerDropbox.value) }   
let depID = depDropbox.value
console.log(depObj)
console.log(depID)
    
    const putMethod = {
        method: 'PUT', // Method itself
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(depObj) // We send data in JSON format
       }

if(nameInput.value.length > 3) 
{
    fetch(`https://localhost:44367/api/Department/${depID}`, putMethod)
    setTimeout(() => {
        location.reload();
    }, 500);
    alert("EDITED")
}
else { alert("NEW NAME NEEDS TO BE AT LEAST 3 CHARS LONG")}



})





