//Closure-currying
function a(x){
    return function b(y){
        return function c(z){
            return x + y + z;
    }
}
}
console.log(a(5)(6)(8));