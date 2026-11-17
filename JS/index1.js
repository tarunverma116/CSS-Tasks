const span = document.querySelector('span');
const classes = span.classList;

span.addEventListener('click', () => {
    const result = classes.toggle("c");
    console.log(`classList is now "${classes}"`);
});