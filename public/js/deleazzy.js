

function play(){
    var audio = document.getElementById("audio");
    audio.play();
}

//geolocation
function getlocation() {  
  if(navigator.geolocation){  
      navigator.geolocation.getCurrentPosition(showPosition)  
    }  
  else  
  {  
        alert("Sorry! your browser is not supporting")  
    } }  
  
function showPosition(position){ 
var text = document.getElementById('loc');
text.value=" ";
var x = "Latitude: " + position.coords.latitude + ", " + "Longitude: " +    position.coords.longitude;  
  
text.value += x;

}  


function preventnum(e) {

  if (!isNaN(e.key)) {
      e.preventDefault();
  }
}

function validateName()
{
    var regName =  /^[a-zA-Z ]{2,30}$/;
    var name = document.getElementById('fn').value;
    var name1=document.getElementById('ln').value;
    var error = document.getElementById("error");
    if (!regName.test(name) && name!='')
    {
      error.textContent = "Please enter a valid first name";
      error.style.color = "red";
      document.getElementById("fn").value='';
      document.getElementById("fn").focus();
    }

    else if(!regName.test(name1) && name1!='') 
    {
      error.textContent = "Please enter a valid last name";
      error.style.color = "red";
      document.getElementById("ln").value='';
      document.getElementById("ln").focus();
    }

    else 
    {
      error.textContent = ""
    }
    
}

//validating phone number
function preventalpha(e) {
  if (isNaN(e.key)) {
      e.preventDefault();
  }
}

function validatePhone()
{
    var regName =  /^[0-9]{10}$/;
    var name = document.getElementById('phno').value;
    var error = document.getElementById("error1");
    if (!regName.test(name) && name!='')
    {
      error.textContent = "Please enter a valid phone number(10 digits)";
      error.style.color = "red";
      document.getElementById("phno").focus();
    }
    
    else 
    {
      error.textContent = ""
    }
}

//validating email
function validateEmail()
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2})+$/;
    var name = document.getElementById('email').value;
    var error = document.getElementById("error2");
    if (!mailformat.test(name) && name!='')
    {
      error.textContent = "Please enter a valid email ID";
      error.style.color = "red";
      document.getElementById("email").focus();
    }
    
    else 
    {
      error.textContent = ""
    }
}

//validating password field
function validatePassword()
{
var regpass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;
var passwd = document.getElementById('pass1').value;
var passwd1=document.getElementById('cpass').value;
    var error = document.getElementById("error3");
    if (!regpass.test(passwd) && passwd!='')
    {
      error.textContent = "Please enter a strong password";
      error.style.color = "red";
      document.getElementById("pass1").focus();
    }
    else if((!regpass.test(passwd1) && passwd1!='')|| passwd!=passwd1) 
    {
      error.textContent = "Passwords do not match!!";
      error.style.color = "red";
      document.getElementById("cpass").focus();
    }
    
    else 
    {
      error.textContent = ""
    }
}

//cookies

function setCookie(cname,cvalue) 
{
const d = new Date();
d.setTime(d.getTime() + (3*24*60*60*1000));
let expires = "expires="+ d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function storeValues()  
{
setCookie("First Name", document.forms.formid.fn.value);
setCookie("Last Name", document.forms.formid.ln.value);
setCookie("Phone Number", document.forms.formid.phno.value);
sessionStorage.setItem("Email Address", document.forms.formid.email.value);
sessionStorage.setItem("Password", document.forms.formid.pass1.value);
localStorage.setItem("Date of Birth", document.forms.formid.dob.value);

}

function changecolor(el) {

document.getElementById("reg").style.backgroundColor = el.value;
setCookie("background color", document.forms.formid.colorpicker.value);
}

function getCookie(cname) 
{
let name = cname + "=";
let decodedCookie = decodeURIComponent(document.cookie);
let ca = decodedCookie.split(';');
for(let i = 0; i <ca.length; i++) {
let c = ca[i];
while (c.charAt(0) == ' ') {
  c = c.substring(1);
}
if (c.indexOf(name) == 0) {
  return c.substring(name.length, c.length);
}
}
return "";
}

function setColor()
{
let bg = getCookie("background color");
document.getElementById("reg").style.backgroundColor = bg;

}

function delete_cookie(name) 
{
document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}