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

  
 
