let [a,b]= [5,6];
console.log(a,b);
function test(){
    return [10,11];
}

[a,b] = test();

console.log(a,b);