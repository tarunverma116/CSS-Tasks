let a;
console.log(a??0);

let arr = [1, 2, 3, 4,5];
console.log(arr);

arr.foo="FOO";
console.log(arr);

arr.join = function(separator) {
    let str = "";
    for (let i = 0; i < this.length; i++) {
        str += this[i];
        if (i < this.length - 1) {
            str += separator;
        }
    }
    return str;
};

console.log(arr.join(" - "));   