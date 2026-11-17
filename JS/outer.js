function outer() {
    let counter = 0;
    function increment() {
        counter++;
        console.log(counter);
    }
    return increment;
}

const count = outer();
count.increment(); // Output: 1
count.increment(); // Output: 2
count.increment(); // Output: 3
count.increment(); // Output: 4
count.increment(); // Output: 5