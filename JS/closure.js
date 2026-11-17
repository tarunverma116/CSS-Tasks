//Closure
function outer(){
    let count = 0 ;
    function inner(){
        count++;
        console.log(a);
    }
    return {increment};
}

const counter = outer();
counter.increment(); 
counter.increment();
counter.increment(); 
counter.increment(); 
counter.increment(); 
