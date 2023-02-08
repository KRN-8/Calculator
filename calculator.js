// Page access vars
const screen = document.getElementById("result");

// Calculator logic vars
const operators = ["+", "-", "*", "/"];
let varAcc, varNum;
let operator, dot;
clearAll();

function input(inpChar) {
	if (varNum === null && operator === null && !operators.includes(inpChar))
		clearAll();

	if (inpChar == "." && dot === null)
		varNum += dot = inpChar;

	if (inpChar == 0 && dot !== null)
		varNum += inpChar;
	else if (0 <= inpChar && inpChar <= 9)
		varNum = parseFloat(varNum + inpChar);

	if (operators.includes(inpChar)) {
		solve();
		if (inpChar == "*" || inpChar == "/")
			operator = inpChar;
		else operator = "";
		varNum = 0;
		if (inpChar == "-")
			negate();
	}
	display();
}

function solve() {
	if (varAcc === null)
		varAcc = 0;
	if (varNum === null)
		varNum = 0;
	switch (operator) {
		default:
		case "":
			varAcc += parseFloat(varNum);
			break;
		case "*":
			varAcc *= varNum;
			break;
		case "/":
			varAcc /= varNum;
			break;
	}
	operator = varNum = dot = null;
	varAcc = parseFloat(varAcc?.toFixed(6));// floating point math fix
	display();
}
function display() {
	if (operator == "" && !varNum.toString().startsWith("-"))
		screen.value = varAcc + "+" + varNum;
	else screen.value = (varAcc ?? "") + (operator ?? "") + (varNum ?? "");
}
function clearAll() {
	varAcc = operator = dot = null;
	varNum = 0;
	display();
}

function negate() {
	if (varNum === 0)
		varNum = "-0";
	else if (varNum == "-0")
		varNum = 0;

	else if (operator === null)
		varAcc *= -1;
	else
		varNum *= -1;
	display();
}

function backSpace() {
	if (varNum !== null)
		varNum = varNum.toString().slice(0, -1);
	if (varNum == "")
		varNum = 0;
	display();
}
// Keyboard support
document.addEventListener("keydown", (event) => {
	const key = event.key;
	if ("0" <= key && key <= "9" || operators.includes(key))
		input(key);
	if (key === "." || key === ",")
		input(".");
	if (key === "Enter")
		solve();
	if (key === "Escape" || key === "Delete")
		clearAll();
	if (key === "Backspace")
		backSpace();
});
