function display(val) {
	let display = document.getElementById("result").value;
	if (display.indexOf("-") == 0)
		display = display.substring(1);
	if ((val == "+" || val == "-" || val == "*" || val == "/") &&
		display.search(/[+\-*/]\.?\d/) != -1) {
		solve();
		display = document.getElementById("result").value;
	}
	if (display.indexOf("-") == 0)
		display = display.substring(1);

	if ((val == "+" || val == "-" || val == "*" || val == "/") &&
		(display.search(/[+\-*/]/) != -1 || display.search(/\d/) == -1))
		return;
	if (val == "." && (display.indexOf(".") != -1 && display.search(/[+\-*/]/) == -1 ||
		display.search(/\.?\d*[+\-*/]\d*\./) != -1))
		return;

	document.getElementById("result").value += val;
}

document.addEventListener('keydown', (event) => {
	const key = event.key;
	if (key >= '0' && key <= '9') {
		display(key);
	} else if (isOperator(key)) {
		display(key);
	} else if (key === 'Enter') {
		solve();
	} else if (key === '.') {
		display('.');
	} else if (key === 'Backspace') {
		backSpace();
	} else if (key === 'Escape') {
		clearScreen();
	}
});

/*
btn CE
btn C
btn BS
btn division
btn seven
btn eight
btn nine
btn multiplication
btn four
btn five
btn six
btn subtraction
btn one
btn two
btn three
btn addition
btn sign
btn zero
btn dot
btn equal
*/

function add(number1, number2) {
	return number1 + number2;
}

function substract(number1, number2) {
	return number1 - number2;
}

function divide(number1, number2) {
	return number1 / number2;
}

function multiply(number1, number2) {
	return number1 * number2;
}

function solve() {
	let x = document.getElementById("result").value;
	let y = eval(x);
	y = parseFloat(y?.toFixed(12));// floating point math fix
	document.getElementById("result").value = y;
	return y;
}

function clearScreen() {
	document.getElementById("result").value = "";
}

function backSpace() {
	document.getElementById("result").value = document.getElementById("result").value.slice(0, -1);
}
