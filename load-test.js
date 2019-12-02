/**
 * THIS MODULE RUNS YOUR SIMPLE STRESS TESTING JOBS WITH MINIMAL RESOURCE OVERHEAD. 
 * IT IS OPEN SOURCE, AND SO FEEL FREE TO FORK IT AND EXTEND IT AS YOU WISH.
 * 
 * Author: Romalice Ishimwe
 */

 /** MAIN PROGRAM */

 runLoadTest('https://ussdgateway-test.oltranz.com/', 'get', null, 1000, 1000);

 /** !END - MAIN PROGRAM */

 /** ----------------------------- */

 /** PROGRAM IMPLEMENTATION */
const axios = require('axios');
function runLoadTest(url, method, payload, total_requests, number_of_requests_per_second){
    let counter = 0;  // Init the iteration counter
    let interval = number_of_requests_per_second / 1000 // Interval between each request.
    
    let results ={
        total_requests: total_requests,
        requests_per_second: number_of_requests_per_second,
        interval_between_requests: interval,
        succeeded: 0,
        failed: 0
    }

    // Start the http call cycle
    let makeCall = setInterval(()=>{
        if(counter == total_requests){
            // Exit the cycle
            clearInterval(makeCall);
            console.log(results);                                                                       
        }
        
        call(url, method, payload, status =>{
            if(status){
                results.succeeded ++;
            }else{
                results.failed ++;
            }
        });
        counter++;
    }, interval);
  }


function call(url, method, payload, status){
    if(method.toLowerCase() == 'post'){
        axios.post(url, payload).then(response=>{
            status(true);
        }).catch(error=>{
            status(false);
        });
    }else{
        axios.get(url).then(response=>{
            status(true);
        }).catch(error=>{
            console.log(error.toString());
            status(false);
        });
    }
}

 /** !END - PROGRAM IMPLEMENTATION */