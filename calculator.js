document.body.style.zoom="80%"

const dimensionErrorArea = document.querySelector(".dimensionErrorArea");

const m1rows = document.querySelector("#m1rows");
const m1cols = document.querySelector("#m1cols");
const m2rows = document.querySelector("#m2rows");
const m2cols = document.querySelector("#m2cols");

const rules = document.querySelector(".rules");
const form = document.querySelector("#rowColCountForm");

const valueBoxesFormArea = document.querySelector(".valueBoxesFormArea");
const solutionArea = document.querySelector(".solution");
const buttonArea = document.querySelector(".buttonArea");

form.addEventListener("submit", checkValid);

function checkValid(err) {
  err.preventDefault();

  if (m1cols.value != m2rows.value) throwDimensionsError();
  else runCalculator();
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

function runCalculator() {
  rules.remove();
  form.remove();
  addValueBoxesForm();
  createValueBoxes(m1rows.value, m1cols.value, m2rows.value, m2cols.value);
  createResetButton();
  createBackButton(false);
  createRandomizeMatricesButton();
  createCalculateButton();
}

function addValueBoxesForm() {
  valueBoxesFormArea.innerHTML += '<form id="valueBoxesForm"></form>';
}

function createValueBoxes(m1r, m1c, m2r, m2c) {
  // Matrix 1
  document.querySelector("#valueBoxesForm").innerHTML +=
    '<p class="valueBoxTitle">Matrix 1</p>';
  document.querySelector("#valueBoxesForm").innerHTML +=
    '<div class="matrix1Inputs"></div>';

  let matrix1Html = "";

  for (let i = 0; i < m1r; i++) {
    for (let j = 0; j < m1c; j++) {
      matrix1Html += `<input type="number" class="valueBox" id="m1valueBox${i}${j}" value="0"></input>`;
    }
    matrix1Html += "<br />";
  }

  document.querySelector("#valueBoxesForm").innerHTML +=
    "<div class='center-container'>" +
    "<div>" +
    matrix1Html +
    "</div>" +
    "</div>";

  // Matrix 2
  document.querySelector("#valueBoxesForm").innerHTML +=
    '<p class="valueBoxTitle">Matrix 2</p>';
  document.querySelector("#valueBoxesForm").innerHTML +=
    '<div class="matrix2Inputs"></div>';

  let matrix2Html = "";

  for (let i = 0; i < m2r; i++) {
    for (let j = 0; j < m2c; j++) {
      matrix2Html += `<input type="number" class="valueBox" id="m2valueBox${i}${j}" value="0"></input>`;
    }
    matrix2Html += "<br>";
  }

  document.querySelector("#valueBoxesForm").innerHTML +=
  "<div class='center-container'>" +
  "<div>" +
  matrix2Html +
  "</div>" +
  "</div>";
}

function createBackButton(calculated) {
  if (!calculated) {
    buttonArea.innerHTML += '<div class="backButtonFalseContainer"></div>';
    document.querySelector(".backButtonFalseContainer").innerHTML +=
      '<a href="index.html"><button class="backButtonFalse" type="button">Back to Dimensions</button></a>';
  }
  else {
    buttonArea.innerHTML += '<div class="backButtonTrueContainer"></div>';
    document.querySelector(".backButtonFalseContainer").remove();
    document.querySelector(".backButtonTrueContainer").innerHTML += "<br>";
    document.querySelector(".backButtonTrueContainer").innerHTML +=
      '<a href="index.html"><button class="backButtonTrue" type="button">Calculate Another!</button></a>';
  }
}

function removeBackButton(calculated) {
  if (calculated) document.querySelector(".backButtonFalse").remove();
  else document.querySelector(".backButtonTrue").remove();
}

function createResetButton() {
  document.querySelector("#valueBoxesForm").innerHTML += '<div class="inputFormButtonContainer"></div>';
  document.querySelector(".inputFormButtonContainer").innerHTML +=
    '<button class="resetButtonSecond" type="reset">Reset</button>';
}

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
  document.querySelector(".backButtonFalseContainer").innerHTML += "<div></div>";
  document.querySelector(".backButtonFalseContainer").innerHTML +=
    '<button class="calculateButton" type="button">Calculate Product!</button>';
  const calculateButton = document.querySelector(".calculateButton");
  calculateButton.addEventListener("click", calculateProduct);
}

function removeCalculateButton() {
  document.querySelector(".calculateButton").remove();
}

function removeValueBoxesFormArea() {
  document.querySelector("#valueBoxesForm").remove();
}

function randomizeMatrices() {
  // console.log(document.querySelector("#m1valueBox00"));

  // Randomize Matrix 1
  for (let i = 0; i < Number(m1rows.value); i++)
    for (let j = 0; j < Number(m1cols.value); j++)
      document.querySelector(`#m1valueBox${i}${j}`).value =
        produceRandomNumber(50);

  // Randomize Matrix 2
  for (let i = 0; i < Number(m2rows.value); i++)
    for (let j = 0; j < Number(m2cols.value); j++)
      document.querySelector(`#m2valueBox${i}${j}`).value =
        produceRandomNumber(50);
}

function calculateProduct(err) {
  err.preventDefault();

  // Initialize both matrices
  let matrix1 = createAndInitializeMatrix(m1rows.value, m1cols.value);
  let matrix2 = createAndInitializeMatrix(m2rows.value, m2cols.value);

  // Update the two matrices with the inputted values
  matrix1 = updateMatrix(matrix1, 1);
  matrix2 = updateMatrix(matrix2, 2);

  // Initialize product matrix of correct size
  let product = new Array(matrix1.length);

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

  // Clean-up
  removeValueBoxesFormArea();
  removeCalculateButton();
  removeBackButton(true);
  createBackButton(true);
}

function createAndInitializeMatrix(mr, mc) {
  let matrix = new Array(Number(mr));

  for (let i = 0; i < Number(mr); i++) matrix[i] = new Array(Number(mc));
  for (let i = 0; i < Number(mr); i++)
    for (let j = 0; j < Number(mc); j++) matrix[i][j] = 0;

  return matrix;
}

function updateMatrix(matrix, matrixNumber) {
  newMatrix = createAndInitializeMatrix(matrix.length, matrix[0].length);

  for (let i = 0; i < matrix.length; i++)
    for (let j = 0; j < matrix[i].length; j++)
      newMatrix[i][j] = Number(
        document.querySelector(`#m${matrixNumber}valueBox${i}${j}`).value
      );

  return newMatrix;
}

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
