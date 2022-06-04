const m1colsError = document.querySelector(".m1colsError");
const m2rowsError = document.querySelector(".m2rowsError");

const m1rows = document.querySelector("#m1rows");
const m1cols = document.querySelector("#m1cols");
const m2rows = document.querySelector("#m2rows");
const m2cols = document.querySelector("#m2cols");

const rules = document.querySelector(".rules");
const form = document.querySelector("#rowColCountForm");

const valueBoxesArea = document.querySelector(".valueBoxesArea");
const buttonArea = document.querySelector(".buttonArea");
const solutionArea = document.querySelector(".solution");

form.addEventListener("submit", checkValid);

function checkValid(err){
    valueBoxesArea.innerHTML = "";
    err.preventDefault();
    
    if (m1cols.value != m2rows.value){
        m1colsError.classList.add("error");
        m2rowsError.classList.add("error");
        m1colsError.innerHTML = "Must be the same dimension!";
        m2rowsError.innerHTML = "Must be the same dimension!";

        setTimeout(() => {
            m1colsError.remove();
            m2rowsError.remove();
        }, 5000);
    }     
    else 
        runCalculator();       
}

function runCalculator(){
    createValueBoxes(m1rows.value, m1cols.value, m2rows.value, m2cols.value);     
    createBackButton(false);
    createResetButton();
    createRandomizeMatricesButton();
    createCalculateButton(m1rows.value, m1cols.value, m2rows.value, m2cols.value);
}

function createValueBoxes(m1r, m1c, m2r, m2c){
    // Matrix 1
    valueBoxesArea.innerHTML += '<p class="valueBoxTitle">Matrix 1</p>'
    for (let i = 0; i < m1r; i++) {
        for (let j = 0; j < m1c; j++)
            valueBoxesArea.innerHTML += `<input type="number" class="valueBox" id="m1valueBox${i}${j}" value="0"></input>`;
        valueBoxesArea.innerHTML += "<div></div>";
    }

    // Matrix 2
    valueBoxesArea.innerHTML += '<p class="valueBoxTitle">Matrix 2</p>';
    for (let i = 0; i < m2r; i++) {
        for (let j = 0; j < m2c; j++)
            valueBoxesArea.innerHTML += `<input type="number" class="valueBox" id="m2valueBox${i}${j}" value="0"></input>`;
        valueBoxesArea.innerHTML += "<div></div>";
    }    
    
    rules.remove();
    form.remove();
}

function createBackButton(calculated){
    if (!calculated)
        valueBoxesArea.innerHTML += '<a href="dimensions.html"><button class="refreshButton">Back to Dimensions</button></a>';
    else
        valueBoxesArea.innerHTML += '<a href="dimensions.html"><button class="refreshButton">Calculate Another!</button></a>';
}

function createResetButton(){
    valueBoxesArea.innerHTML += '<button class="resetButton" type="reset">Reset</button>';
}

function createRandomizeMatricesButton(){
    valueBoxesArea.innerHTML += '<button class="randomizeMatricesButton" type="button">Randomize Matrices</button>';
    const randomizeMatricesButton = document.querySelector(".randomizeMatricesButton");
    randomizeMatricesButton.addEventListener("click", randomizeMatrices);
}

function removeRandomizeMatricesButton(){
    document.querySelector(".randomizeMatricesButton").remove();
}

function createCalculateButton(){
    valueBoxesArea.innerHTML += '<button class="calculateButton" type="button">Calculate the Product!</button>';
    const calculateButton = document.querySelector(".calculateButton");
    calculateButton.addEventListener("click", calculateProduct);
}

function removeCalculateButton(){
    document.querySelector(".calculateButton").remove();
}

function randomizeMatrices(){
    removeRandomizeMatricesButton();

    // console.log(document.querySelector("#m1valueBox00"));

    // // Randomize Matrix 1
    // for (let i = 0; i < Number(m1rows.value); i++)
    //     for (let j = 0; j < Number(m1cols.value); j++)
    //         console.log(document.querySelector(`#m1valueBox${i}${j}`).value);

    // // Randomize Matrix 2
    // for (let i = 0; i < Number(m2rows.value); i++)
    //     for (let j = 0; j < Number(m2cols.value); j++)
    //         console.log(document.querySelector(`#m2valueBox${i}${j}`).value);        
}

function calculateProduct(m1r, m1c, m2r, m2c){
    removeCalculateButton();
    // createBackButton(true);

    // console.log(createAndInitializeMatrix(m1r, m1c));
    // console.log(createAndInitializeMatrix(m2r, m2c));

    // console.log(m1r);
    // for (let i = 1; i <= m1r; i++) {
    //     for (let j = 1; j <= m2c; j++){
    //         for (let k = 1; k <= m1c; k++)
    //             for (let l = 1; l <= m2r; l++)  
    //                 console.log(k+l * l+k);  
    //                 solutionArea.innerHTML += `<input type="number" value="${document.querySelector(`#m1valueBox${k}${l}`).value * document.querySelector(`#m1valueBox${l}${k}`).value}"></input>`;
    //         solutionArea.innerHTML += "<div></div>";
    //     }
    // }

    // solutionArea.innerHTML += (document.querySelector(`#m1valueBox${i}${l - 1}`).value
    //                         * document.querySelector(`#m2valueBox${l - 1}${j}`).value);
    // console.log(document.querySelector(`#m1valueBox${i}${l - 1}`));
}

function createAndInitializeMatrix(mr, mc){
    let matrix = new Array(Number(mr));
    for (let i = 0; i < Number(mr); i++)
        matrix[i] = new Array(Number(mc));

    for (let i = 0; i < Number(mr); i++)
        for (let j = 0; j < Number(mc); j++)
            matrix[i][j] = 0;

    return matrix;
}

function updateMatrix(matrix, matrixNumber){
    console.log(matrix.length);
    for (let i = 0; i < matrix.length; i++)
        for (let j = 0; j < matrix[i].length; j++)
            matrix[i][j] = document.querySelector(`#m${matrixNumber}valueBox${i}${j}`);
}


