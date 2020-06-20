
// classes

// about insurance 
class Insurance{

    constructor(make, year, level){
        this.make = make;
        this.year = year;
        this.level = level;
    
    }
    
    // calculate price for current quotation
    calculateQuotation(insurance){
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
    getDifferenceYear(year){
        return new Date().getFullYear() - year;
    }

    // adds based on protection
    calculateLevel(price, level){
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
}

// about html
class HTMLDesign {

        // displays 20 years in select
        displayYears(){

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
           displayErrors(message){
            
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
            showResults1(price, insurance){
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
                <p>Level: ${insurance.level}</p>
                <p class = 'total'>    Total   : $ ${price} </p>
                `;
            
                const spinner = document.querySelector("#loading img");
                spinner.style.display = 'block';
            
                setTimeout(function(){
                    spinner.style.display = 'none';
                    result.appendChild(div);
            
                }, 3000);
            
                }
            
            
            

}
