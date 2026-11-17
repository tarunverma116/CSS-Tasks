function curryConverter(fn) {
    function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }

        return (...nextArgs) => curried(...args, ...nextArgs);
    }

    return curried;
}

function add(a, b, c) {
    return a + b + c;
}

const res = curryConverter(add);

console.log(res(2)(3)(4));   
console.log(res(2, 3)(4));   
console.log(res(2)(3, 4));   
console.log(res(2, 3, 4));  