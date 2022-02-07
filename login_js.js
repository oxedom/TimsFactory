let form = document.getElementById("form")
let usernameinput = document.getElementById("userinput")
let passwordInput = document.getElementById("passinput")   
let loginObj = { "username": "null","password": "null"} 


let login = async (loginObj) => 
{
let answer = false  
        //SENDS POST REQUEST TO USERBASETABLE AND RETURNS A CUSTOM USEROBJECT
        //WITH THE PASSWORD
        const rawResponse = await fetch('https://localhost:44367/api/userbase/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: loginObj.username, password: loginObj.password})
        });
        //USEROBJECT
        const user = await rawResponse.json();
        console.log(user)
        //API REETURNS NULL USER OBJECT IF INCORRECT PASSWORD/USERNAME
        if(user.ID == 0) { alert("Password/username is not correct")}
        else if (user.id != 0)  {           
           //SETS THE LOCALSTORAGE FOR USER/FULLNAME/NUM OF ACTIONS
            window.localStorage.setItem("id", user.ID)
            window.localStorage.setItem('fullname', user.full_name)
            window.localStorage.setItem('user', user.username)
            window.localStorage.setItem('numOfActions', parseInt(user.numOfActions))
            //REDIRECTS TO HOMEPAGE
            // location.href = 'http://127.0.0.1:5500/homepage/homepage.html'
            answer = true
             }
return answer
}



form.addEventListener("submit", e => 
{
e.preventDefault()        
e.stopPropagation()
loginObj.username = usernameinput.value;
loginObj.password = passwordInput.value;
console.log("LOG-IN Button pressed")

login(loginObj).then(Response => 
{ 

  if(Response) 
  { window.location.replace('http://127.0.0.1:5500/homepage/homepage.html') }

})
})