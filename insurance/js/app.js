// varaibles
const form = document.getElementById('request-quote');

const Html = new HTMLDesign();



// event listeners
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded', function(){
        // select option years
        Html.displayYears();
    });
    
    form.addEventListener('submit', function(e){
        e.preventDefault();
   
// read values from form
    const make = document.getElementById('make').value;
    const year = document.getElementById('year').value;
    // read the radio buttons
    const level = document.querySelector('input[name = "level"]:checked').value;

    if( make === '' || year === '' || level === '' ){
    Html.displayErrors('All the fields are mandatory');                
    } else{
// clear previous quotes
        const prevResult = document.querySelector('#result div');
        if(prevResult != null){
            prevResult.remove();
        }

        const insurance = new Insurance(make, year, level);
        const price = insurance.calculateQuotation(insurance);
       
        // print result from html
        Html.showResults1(price, insurance);
        
    }
        
});
}

// objects

// about insurance 
function Insurance(make, year, level){
    this.make = make;
    this.year = year;
    this.level = level;
}

// calculate price for current quotation
Insurance.prototype.calculateQuotation= function(insurance){
    let price;

    const base = 2000;
    const make = insurance.make;
/*  
    1- amarican 15%
    2- asian- 5%
    3- european - 35%
*/
    switch(make){
        case '1':
        price = base * 1.15;
        break;
        case '2':
        price = base * 1.05;
        break;
        case '3':
        price = base * 1.35;
        break;

    }

    // get year
    const year = insurance.year;
    
    // years difference
    const difference = this.getDifferenceYear(year);
    //each year cost of internet is 3% cheaper
    price = price - ((difference * 3) * price ) / 100;
    
    // check level of protection

    const level = insurance.level;

    price = this.calculateLevel(price, level);
    return price;
    
}
// returns different years
Insurance.prototype.getDifferenceYear = function(year){
    return new Date().getFullYear() - year;
}

// adds based on protection
Insurance.prototype.calculateLevel = function(price, level){
    /*
    basic increase by 30%
    complete by 50%
    */
   if(level === 'basic'){
       price = price * 1.30;
   } else{
       price = price * 1.50;
   } 
   return price;
}
// about html
function HTMLDesign() {}

    // displays 20 years in select
    HTMLDesign.prototype.displayYears = function(){

// max min years
const max = new Date().getFullYear(),
min = max - 20;

// generate list years
const selectYear = document.getElementById('year');

for(let i = max; i >= min; i--){
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
}

}
// prints error
HTMLDesign.prototype.displayErrors = function(message){

    // create div
    const div = document.createElement('div');
    div.classList = 'error';

    div.innerHTML = `
    <p>${message}</p>`;

    form.insertBefore(div, document.querySelector('.form-group'));

    // remove the error
    setTimeout(function(){
        document.querySelector('.error').remove();
    }, 3000)
};

// prints result into html
HTMLDesign.prototype.showResults1 = function(price, insurance){
    const result = document.getElementById('result');

    const div = document.createElement('div');

    let make = insurance.make;

    switch(make){
        case '1':
            make = 'American'
            break;
        case '2':
            make = 'Asian'
            break;
        case '3':
            make = 'European'
            break;
    }
  
    
    div.innerHTML = `
    <p class = "header">Summary</p>
    <p>Make: ${make}</p>
    <p>Year: ${insurance.year}</p>
    <p>level: ${insurance.level}</p>
     <p class = 'total'>    Total   : $ ${price} </p>
    `;

    const spinner = document.querySelector("#loading img");
    spinner.style.display = 'block';

    setTimeout(function(){
        spinner.style.display = 'none';
        result.appendChild(div);

    }, 3000);

    }



 
