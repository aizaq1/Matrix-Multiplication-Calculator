document.body.style.zoom="80%"

const dimensionErrorArea = document.querySelector(".dimensionErrorArea");

const m1rows = document.querySelector("#m1rows");
const m1cols = document.querySelector("#m1cols");
const m2rows = document.querySelector("#m2rows");
const m2cols = document.querySelector("#m2cols");

const rules = document.querySelector(".rules");
const dimensionsForm = document.querySelector("#dimensionsForm");

const inputBoxesFormArea = document.querySelector(".inputBoxesFormArea");
const solutionArea = document.querySelector(".solutionArea");
const buttonArea = document.querySelector(".buttonArea");

dimensionsForm.addEventListener("submit", checkDimensionsValidity);


// Since the number of columns in the first matrix and the number of rows in 
// the second matrix of a matrix product calculation must be the same, this 
// should be checked for.
function checkDimensionsValidity(e) {
  e.preventDefault();

  if (m1cols.value != m2rows.value) 
    throwDimensionsError();
  else 
    runCalculator();
}

function throwDimensionsError() {
  dimensionErrorArea.innerHTML =
    "Columns of Matrix 1 and Rows of Matrix 2 must be the same!";
  dimensionErrorArea.classList.add("error");
  m1cols.classList.add("errorBorder");
  m2rows.classList.add("errorBorder");

  setTimeout(() => {
    dimensionErrorArea.innerHTML = "";
    dimensionErrorArea.classList.remove("error");
    m1cols.classList.remove("errorBorder");
    m2rows.classList.remove("errorBorder");
  }, 5000);
}

// A series of functions called in order to appropriately manipulate the DOM 
// to display the correct fields.
function runCalculator() {
  rules.remove();
  dimensionsForm.remove();
  addInputBoxesForm();
  createInputBoxes(m1rows.value, m1cols.value, m2rows.value, m2cols.value);
  createResetButton();
  createBackButton(false);
  createRandomizeMatricesButton();
  createCalculateButton();
}

// Injects an HTML container for the input box form
function addInputBoxesForm() {
  inputBoxesFormArea.innerHTML += '<form id="inputBoxesForm"></form>';
}

// Adds input boxes into the container created from the above function based
// on the dimensions submitted by the user.
function createInputBoxes(m1r, m1c, m2r, m2c) {
  // Matrix 1
  document.querySelector("#inputBoxesForm").innerHTML +=
    '<p class="inputBoxTitle">Matrix 1</p>';
  document.querySelector("#inputBoxesForm").innerHTML +=
    '<div class="matrix1Inputs"></div>';

  let matrix1Html = "";

  for (let i = 0; i < m1r; i++) {
    for (let j = 0; j < m1c; j++) {
      matrix1Html += `<input type="number" class="inputBox" id="m1inputBox${i}${j}" value="0"></input>`;
    }
    matrix1Html += "<br />";
  }

  document.querySelector("#inputBoxesForm").innerHTML +=
    "<div class='center-container'>" +
    "<div>" +
    matrix1Html +
    "</div>" +
    "</div>";

  // Matrix 2
  document.querySelector("#inputBoxesForm").innerHTML +=
    '<p class="inputBoxTitle">Matrix 2</p>';
  document.querySelector("#inputBoxesForm").innerHTML +=
    '<div class="matrix2Inputs"></div>';

  let matrix2Html = "";

  for (let i = 0; i < m2r; i++) {
    for (let j = 0; j < m2c; j++) {
      matrix2Html += `<input type="number" class="inputBox" id="m2inputBox${i}${j}" value="0"></input>`;
    }
    matrix2Html += "<br>";
  }

  document.querySelector("#inputBoxesForm").innerHTML +=
  "<div class='center-container'>" +
  "<div>" +
  matrix2Html +
  "</div>" +
  "</div>";
}

// Depending on whether or not the solution has been calculated, the button
// to return to the main menu is different. This function takes a single Boolean 
// parameter (calculated) and creates the corresponding appropriate button.
function createBackButton(calculated) {
  if (!calculated) {
    buttonArea.innerHTML += '<div class="mainMenuButtonContainer"></div>';
    document.querySelector(".mainMenuButtonContainer").innerHTML +=
      '<a href="index.html"><button class="mainMenuButton" type="button">Back to Dimensions</button></a>';
  }
  else {
    buttonArea.innerHTML += '<div class="calculateAnotherButtonContainer"></div>';
    document.querySelector(".mainMenuButtonContainer").remove();
    document.querySelector(".calculateAnotherButtonContainer").innerHTML += "<br>";
    document.querySelector(".calculateAnotherButtonContainer").innerHTML +=
      '<a href="index.html"><button class="calculateAnotherButton" type="button">Calculate Another!</button></a>';
  }
}

// Depending on the Boolean calculated, the corresponding back button is removed 
function removeBackButton(calculated) {
  if (calculated) 
    document.querySelector(".mainMenuButton").remove();
  else 
    document.querySelector(".calculateAnotherButton").remove();
}

// Creates a reset button for the input form
function createResetButton() {
  document.querySelector("#inputBoxesForm").innerHTML += '<div class="inputFormButtonContainer"></div>';
  document.querySelector(".inputFormButtonContainer").innerHTML +=
    '<button class="resetInputsButton" type="reset">Reset</button>';
}

// Creates a matrix of the same sizes as matrix 1 and matrix 2 but with randomized values
function createRandomizeMatricesButton() {
  document.querySelector(".inputFormButtonContainer").innerHTML  += "<div></div>";
  document.querySelector(".inputFormButtonContainer").innerHTML  +=
    '<button class="randomizeMatricesButton" type="button">Randomize Matrices</button>';
  const randomizeMatricesButton = document.querySelector(
    ".randomizeMatricesButton"
  );
  randomizeMatricesButton.addEventListener("click", randomizeMatrices);
}

function removeRandomizeMatricesButton() {
  document.querySelector(".randomizeMatricesButton").remove();
}

function createCalculateButton() {
  document.querySelector(".mainMenuButtonContainer").innerHTML += "<div></div>";
  document.querySelector(".mainMenuButtonContainer").innerHTML +=
    '<button class="calculateButton" type="button">Calculate Product!</button>';
  const calculateButton = document.querySelector(".calculateButton");
  calculateButton.addEventListener("click", calculateProduct);
}

function removeCalculateButton() {
  document.querySelector(".calculateButton").remove();
}

// Removal of the container for the input form
function removeInputBoxesFormArea() {
  document.querySelector("#inputBoxesForm").remove();
}

// Randomized floating point values for each input box are generated from 0 
// up to the parameter of produceRandomNumber. Current max: 50
function randomizeMatrices() {
  // Randomize Matrix 1
  for (let i = 0; i < Number(m1rows.value); i++)
    for (let j = 0; j < Number(m1cols.value); j++)
      document.querySelector(`#m1inputBox${i}${j}`).value =
        produceRandomNumber(50);

  // Randomize Matrix 2
  for (let i = 0; i < Number(m2rows.value); i++)
    for (let j = 0; j < Number(m2cols.value); j++)
      document.querySelector(`#m2inputBox${i}${j}`).value =
        produceRandomNumber(50);
}

function calculateProduct(e) {
  e.preventDefault();

  // Initialize both matrices with default 0s
  let matrix1 = createAndInitializeMatrix(m1rows.value, m1cols.value);
  let matrix2 = createAndInitializeMatrix(m2rows.value, m2cols.value);

  // Update the two matrices with the inputted values
  matrix1 = updateMatrix(matrix1, 1);
  matrix2 = updateMatrix(matrix2, 2);

  // Initialize product matrix of correct size (rows = number of rows 
  // in matrix 1, columns = number of columns in matrix 2)
  let product = new Array(matrix1.length);

  // Algorihm to compute product matrix values
  for (let i = 0; i < matrix1.length; ++i) {
    // Make the product array 2D
    product[i] = new Array(matrix2[0].length);
    for (let j = 0; j < matrix2[i].length; ++j) {
      product[i][j] = 0;
      for (let k = 0; k < matrix1[i].length; ++k)
        product[i][j] += matrix1[i][k] * matrix2[k][j];
    }
  }

  displayMatrix(product);

  // Series of functions are called to clean up the DOM and display only the solution
  removeInputBoxesFormArea();
  removeCalculateButton();
  removeBackButton(true);
  createBackButton(true);
}

// Creates a matrix of size mr by mc and initializes all values with 0
function createAndInitializeMatrix(mr, mc) {
  let matrix = new Array(Number(mr));

  for (let i = 0; i < Number(mr); i++) matrix[i] = new Array(Number(mc));
  for (let i = 0; i < Number(mr); i++)
    for (let j = 0; j < Number(mc); j++) matrix[i][j] = 0;

  return matrix;
}

// Updates matrix [matrixNumber] with the inputted values of the corresponding matrix
function updateMatrix(matrix, matrixNumber) {
  newMatrix = createAndInitializeMatrix(matrix.length, matrix[0].length);

  for (let i = 0; i < matrix.length; i++)
    for (let j = 0; j < matrix[i].length; j++)
      newMatrix[i][j] = Number(
        document.querySelector(`#m${matrixNumber}inputBox${i}${j}`).value
      );

  return newMatrix;
}

// Injects HTML code to the DOM to display the matrices
function displayMatrix(matrix) {
  solutionArea.innerHTML += '<p class="solutionTitle">Solution</p>';
  let solutionHTML = "";
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      solutionHTML += `<p class="solutionBox">${Number(
        matrix[i][j]
      ).toFixed(2)}</p>`;
    }
    solutionHTML += '<br>';
  }
  solutionArea.innerHTML += 
  '<div class="solutionBoxesContainer">' +
  '<div>' +
  solutionHTML +
  '</div>' +
  '</div>';
}

function produceRandomNumber(max) {
  return Number((Math.random() * max).toFixed(3));
}
