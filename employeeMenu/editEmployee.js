let select = document.getElementById("deps");

fetch('https://localhost:44367/api/Department')
.then(Response => Response.json())
.then(data => {
for (let index = 0; index < data.length; index++) 
{
    let option = document.createElement("option");
option.text = data[index].name;
option.value = data[index].ID;
select.appendChild(option);
    
}
})