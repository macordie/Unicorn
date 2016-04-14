/*
This source is shared under the terms of LGPL 3
www.gnu.org/licenses/lgpl.html

You are free to use the code in Commercial or non-commercial projects
*/

 //Set up an associative array
 //The keys represent the size of the cake
 //The values represent the cost of the cake i.e A 10" cake cost's $35
 var cake_prices = new Array();
 cake_prices["Heart"]=0; 
 cake_prices["Pegasus"]=1048576; 
 cake_prices["Zebra"]=0;
 cake_prices["Destrier"]=4194304;
 cake_prices["Nightmare"]=2097152;
 cake_prices["Rainbow"]=5242880;
 cake_prices["Magical"]=10485808;

 var current_horse = "";

 
 //Set up an associative array 
 //The keys represent the filling type
 //The value represents the cost of the filling i.e. Lemon filling is $5,Dobash filling is $9
 //We use this this array when the user selects a filling from the form
 var filling_prices= new Array();
 filling_prices["None"]=0;
 filling_prices["Small Wings"]=16; // Bit 5 Small Wings
 filling_prices["Large Wings"]=128;  // Bits 5&6, Large Wings
 	 
	 
// getCakeSizePrice() finds the price based on the size of the cake.
// Here, we need to take user's the selection from radio button selection
function getCakeSizePrice()
{  
    var cakeSizePrice=0;
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the cake the user Chooses name=selectedCake":
    var selectedCake = theForm.elements["selectedcake"];
    //Here since there are 4 radio buttons selectedCake.length = 4
    //We loop through each radio buttons
    for(var i = 0; i < selectedCake.length; i++)
    {
        //if the radio button is checked
        if(selectedCake[i].checked)
        {
            //we set cakeSizePrice to the value of the selected radio button
            //i.e. if the user choose the 8" cake we set it to 25
            //by using the cake_prices array
            //We get the selected Items value
            //For example cake_prices["Round8".value]"
            cakeSizePrice = cake_prices[selectedCake[i].value];
            current_horse=selectedCake[i].value;
            //If we get a match then we break out of this loop
            //No reason to continue if we get a match

            break;
        }
    }
    //We return the cakeSizePrice
    return cakeSizePrice;
}

//This function finds the filling price based on the 
//drop down selection
function getFillingPrice()
{
    var cakeFillingPrice=0;
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the select id="filling"
     var selectedFilling = theForm.elements["filling"];
     
    //set cakeFilling Price equal to value user chose
    //For example filling_prices["Lemon".value] would be equal to 5
    cakeFillingPrice = filling_prices[selectedFilling.value];

    //finally we return cakeFillingPrice
    return cakeFillingPrice;
}

//candlesPrice() finds the candles price based on a check box selection
function candlesPrice()
{
    var candlePrice=0;
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the checkbox id="includecandles"
    var includeCandles = theForm.elements["includecandles"];

    //If they checked the box set candlePrice to 5
    if(horn.checked==true)
    {
        candlePrice=candlePrice + 6;
    }
    if(firehooves.checked==true)
    {
        candlePrice=candlePrice + 131072+262144;
    }
    if(aura.checked==true)
    {
        candlePrice=candlePrice + 512;
    }
    if(big.checked==true)
    {
        candlePrice=candlePrice + 4096+8192;
    }
    if(firehooves.checked==true)
    {
        candlePrice=candlePrice + 131072+262144; 
    }
   

    //finally we return the candlePrice
    return candlePrice;
}

//candlesPrice() finds the candles price based on a check box selection
function unicornOptions()
{
    var unicornOptions="";
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the checkbox id="fishtail"
    var fishtail = theForm.elements["fishtail"];

    if(tame.checked==true)
    {
        unicornOptions = unicornOptions + ",Tame:1"; 
    }

    if(saddle.checked==true)
    {
        unicornOptions = unicornOptions + ",Saddle:1"; 
    }    
    if(fishtail.checked==true)
    {
        unicornOptions = unicornOptions + ",Dna2:5";
    }
    
    //finally we return the candlePrice
    return unicornOptions;
}


function insciptionPrice()
{
    //This local variable will be used to decide whether or not to charge for the inscription
    //If the user checked the box this value will be 20
    //otherwise it will remain at 0
    var inscriptionPrice=0;
    //Get a refernce to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the checkbox id="includeinscription"
    var includeInscription = theForm.elements["includeinscription"];
    //If they checked the box set inscriptionPrice to 20
    if(includeInscription.checked==true){
        inscriptionPrice=0;
    }
    //finally we return the inscriptionPrice
    return inscriptionPrice;
}
        
function calculateTotal()
{

    var theForm = document.forms["cakeform"];
    //Get a reference to the checkbox id="fishtail"
    var includeinscription = theForm.elements["includeinscription"];

    //Here we get the total price by calling our function
    //Each function returns a number so by calling them we add the values they return together
    var cakePrice = getCakeSizePrice() + getFillingPrice() + candlesPrice() + insciptionPrice();
    var name=document.getElementById('theinscription').value;
    var theform = document.theform;
    //display the result
    //cakePrice += 15; // Set bits 1-4
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
 
    if(includeinscription.checked)
    {
        divobj.innerHTML = "Copy and Paste the following into Minecraft to summon your custom unicorn!</br>summon Unicorn ~0 ~1 ~0 {Dna1:"+cakePrice+unicornOptions()+",CustomName:\""+name+"\",CustomNameVisible:1}";
    } else {
        divobj.innerHTML = "Copy and Paste the following into Minecraft to summon your custom unicorn!</br>summon Unicorn ~0 ~1 ~0 {Dna1:"+cakePrice+unicornOptions()+"}";       
    }

    // Change Image
     var image = document.getElementById('myImage');

    if (name=="Magic" && includeinscription.checked) 
    {
        image.src = "img/magic.png"  

    } else {
       switch (current_horse) {

        case "Zebra":
            image.src = "img/zebra.png"
            break;

        case "Pegasus":
            image.src = "img/pegasus.png"
            break;

        case "Destrier":
            image.src = "img/destrier.png"
            break;

        case "Nightmare":
            image.src = "img/nightmare.png"
            break;

        case "Rainbow":
            image.src = "img/rainbow.png"
            break;

        case "Magical":
            image.src = "img/magical.png"
            break;
        }
    }   
} 

function hideTotal()
{
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='none';
}