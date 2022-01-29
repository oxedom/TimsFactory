let table = document.getElementById("myTable")
const search = document.getElementById("search")

let arr = [{ name: 'Yosi', Number: 5}, { name: 'Nir', Number: 10} ] 
arr

let getDep = async (id) => fetch(`https://localhost:44367/api/Department/${id}`)

let getShifts = async (id) => fetch(`https://localhost:44367/api/shift/${id}`)
 

let displayEmployeeData = async () => 
{
let ResponseEMP = await fetch('https://localhost:44367/api/Employee')
let empData = await ResponseEMP.json()


let count = 0
let hasShift = false

empData.forEach( emp => {

    //CREATES A ROW FOR THE EMP
    let row = document.createElement("tr")
    //Adds the count to the Numaaaa
    count++
    let countData = document.createElement('td')
    countData.innerText = count

    //Adds the Fullname to a link with a href to the ID for the edit Employeepage 
    let NameData = document.createElement('td')
    NameData.innerHTML = `<a href="http://127.0.0.1:5500/employeeMenu/edit_Employee.html/${emp.ID}"> ${emp.fname} ${emp.lname} </a>`
    
    //Adds Start Of Working Year (Converted with DateOBJ)
    let StartOfWorkingData = document.createElement('td')
    StartOfWorkingData.innerText = new Date(emp.startYear).getFullYear()

    //Fetchs the Department name by inputing ID of EMP and displays the new from the dep
    let departmentData = document.createElement('td')
    getDep(emp.ID)
    .then(Response => Response.json())
    .then(data => { departmentData.innerText = data.name    } )
   
   
    //Gets EMP shifts using emp ID and displays the shifts 
    let buttonData = document.createElement('td')
    let shiftData = document.createElement('td')

    let editButton = document.createElement('input')
    let addButton = document.createElement('input')
    let deleteButton = document.createElement('input')

    getShifts(emp.ID)
    .then(Response => Response.json())
    .then(data => 
        {

    if(data.length > 0) 
    { hasShift = true }
    deleteButton.setAttribute('type', 'button')
    editButton.setAttribute('type', 'button')
    addButton.setAttribute('type', 'button')
        
    editButton.setAttribute('value', 'EDIT') 
    addButton.setAttribute('value', 'ADD')
    deleteButton.setAttribute('value', 'DELETE') 


    editButton.addEventListener("click", e => {window.location.replace(`http://127.0.0.1:5500/employeeMenu/edit_Employee.html/?${emp.ID}`)}) 
    addButton.addEventListener("click", e => {window.location.replace(`http://127.0.0.1:5500/employeeMenu/add_Employee.html/?${emp.ID}`)})        
    deleteButton.addEventListener("click", e =>  {
    //      fetch(`https://localhost:44367/api/Employee/${emp.ID}`,{
    //     method: 'delete'})
    
    
    
    
    // .then(Response => console.log(Response.json()))

(e.path[2].classList.add('hide2'))
})   
            
      let counter = 0
        data.forEach(shift => {
            counter++
            let date = new Date(shift.dateOfShift)
          
            let sampleShift = 
            `SHIFT: ${counter}:
             Day: ${date.getDay()},
             Month: ${date.getMonth()+1},
             Year: ${date.getFullYear()}  
             Hours: (${shift.startTime} - ${shift.endTime})
            \n\n `   
            
            deleteButton.addEventListener("click", e => { console.log(e)})  
            buttonData.removeChild(deleteButton)
            shiftData.innerText += `${sampleShift}`
        } )
        })
   
      
    buttonData.appendChild(deleteButton)
    buttonData.appendChild(editButton)
    buttonData.appendChild(addButton)
    
 
    row.appendChild(countData)
    row.appendChild(NameData)
    row.appendChild(StartOfWorkingData)
    row.appendChild(departmentData)
    row.appendChild(shiftData)
    row.appendChild(buttonData)
    table.appendChild(row)
});

}


setTimeout(() => {
    displayEmployeeData()
}, 100);






search.addEventListener('keyup', () => {

let tds = document.querySelectorAll('td')
const term = search.value.trim().toLowerCase();
let trs = document.querySelectorAll('tr')
            console.log(trs)
trs.forEach(tr => { tr.classList.remove("hide")})

tds.forEach(td => 
        {   
            if(td.innerText.toLowerCase().startsWith(term) && term.length > 0) 
            {    
               
                td.parentElement.classList.add("hide")
            }
            })  
  });




