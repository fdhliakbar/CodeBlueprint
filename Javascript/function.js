function perkalian(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

console.log(perkalian(5, 6));


// Arrow Function, gunanya agar menulis kode lebih singkat
const perkalianWithoutArrow = function(firstNumber, secondNumber) { return firstNumber * secondNumber; };
const perkalianArrow = (firstNumber, secondNumber) => firstNumber * secondNumber;

console.log(perkalianArrow(10, 5));

// Local function, adalah fungsi yang hanya bisa diakses di dalam fungsi itu sendiri
function perkalianWithLocalFunction(firstNumber, secondNumber) {
    function multiply() {
        return firstNumber * secondNumber;
    }
    return multiply();
}
console.log(perkalianWithLocalFunction(2, 5));

// function can be used as a parameter, jadi fungsi bisa digunakan sebagai parameter
let temp = "Hari ini sangat panas suhunya " + perkalian(30, 2) + " derajat celcius";
console.log(temp);