let obj = {
    name : "abcd",
    location : {
        street : "xyz",
        city : "pqr"
    }
};

obj.location.state??="UP";

console.log(obj); 