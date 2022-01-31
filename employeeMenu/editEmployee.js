let selectDeps = document.getElementById("deps");
let selectYear = document.getElementById("StartOfWorkingYear")
let fname = document.getElementById("fname")
let lname = document.getElementById("lname")
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('empid');


let form = document.getElementById("form")
form.addEventListener("submit", (e) => 
{
e.preventDefault()
let empObj = 
{
fname: fname.value,
lname: lname.value,
startYear: `${selectYear.value}-01-01`,
DepartmentID: selectDeps.value
}   

console.log(empObj)
    
    
    const putMethod = {
        method: 'PUT', // Method itself
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(empObj) // We send data in JSON format
       }

       console.log(putMethod)
fetch(`https://localhost:44367/api/Employee/${myParam}`, putMethod)


e.preventDefault()

})



let year = new Date();
for (let index = year.getFullYear() ; index > 1999; index--) {
    let select = document.getElementById("StartOfWorkingYear");
    let option = document.createElement("option");
    option.text = index
    option.value = index
    select.appendChild(option)

}


fetch('https://localhost:44367/api/Department')
.then(Response => Response.json())
.then(data => {
    let select = document.getElementById("deps");    
for (let index = 0; index < data.length; index++) 
{
    let option = document.createElement("option");
option.text = data[index].name;
option.value = data[index].ID;
selectDeps.appendChild(option);
    
}
})



fetch(`https://localhost:44367/api/Employee/${myParam}`)
.then(Response => Response.json())
.then(data => 
    {
        fname.value = data.fname
        lname.value = data.lname
        selectDeps.value = data.DepartmentID
    })


