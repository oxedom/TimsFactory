let select = document.getElementById("deps");
let fname = document.getElementById("fname")
let lname = document.getElementById("lname")
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('empid');

let form = document.getElementById("form")
console.log(form)




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
select.appendChild(option);
    
}
})



fetch(`https://localhost:44367/api/Employee/${myParam}`)
.then(Response => Response.json())
.then(data => 
    {
        fname.value = data.fname
        lname.value = data.lname
        select.value = data.DepartmentID
    })


