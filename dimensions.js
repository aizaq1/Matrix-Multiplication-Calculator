const m1colsError = document.querySelector(".m1colsError");
const m2rowsError = document.querySelector(".m2rowsError");

const m1rows = document.getElementById("m1rows");
const m1cols = document.getElementById("m1cols");
const m2rows = document.getElementById("m2rows");
const m2cols = document.getElementById("m2cols");

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
        m1colsError.innerHTML = "Must be the same!";
        m2rowsError.innerHTML = "Must be the same!";

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
    createRefreshButton(false);
    createResetButton();
    createCalculateButton(m1rows.value, m1cols.value, m2rows.value, m2cols.value);
}

function createValueBoxes(m1r, m1c, m2r, m2c){
    let matrix1 = new Array(m1r);
    for (let i = 0; i < m1r; i++)
        matrix1[i] = new Array(m1c);

    let matrix2 = new Array(m2r);
    for (let i = 0; i < m2r; i++)
        matrix2[i] = new Array(m2c);

    // Matrix 1
    valueBoxesArea.innerHTML += '<p class="valueBoxTitle">Matrix 1</p>'
    for (let i = 1; i <= m1r; i++) {
        for (let j = 1; j <= m1c; j++)
            valueBoxesArea.innerHTML += `<input type="number" class="valueBox" id="m1valueBox${i}${j}" value="0"></input>`;
        valueBoxesArea.innerHTML += "<div></div>";
    }
    console.log(matrix1);
    
    // Matrix 2
    valueBoxesArea.innerHTML += '<p class="valueBoxTitle">Matrix 2</p>';
    for (let i = 1; i <= m2r; i++) {
        for (let j = 1; j <= m2c; j++)
            valueBoxesArea.innerHTML += `<input type="number" class="valueBox" id="m2valueBox${i}${j}" value="0"></input>`;
        valueBoxesArea.innerHTML += "<div></div>";
    }    
    console.log(matrix2);

    rules.remove();
    form.remove();
}

function createRefreshButton(calculated){
    if (!calculated)
        valueBoxesArea.innerHTML += '<a href="dimensions.html"><button class="refreshButton">Back to Dimensions</button></a>';
    else
        valueBoxesArea.innerHTML += '<a href="dimensions.html"><button class="refreshButton">Calculate Another!</button></a>';
}

function createResetButton(){
    valueBoxesArea.innerHTML += '<button class="resetButton" type="reset">Reset</button>';
}

function createCalculateButton(){
    valueBoxesArea.innerHTML += '<button class="calculateButton" type="submit">Calculate!</button>';
    const calculateButton = document.querySelector(".calculateButton");
    calculateButton.addEventListener("click", calculateProduct);
}

function calculateProduct(m1r, m1c, m2r, m2c){
    console.log(m1r);
    for (let i = 1; i <= m1r; i++) {
        for (let j = 1; j <= m2c; j++){
            for (let k = 1; k <= m1c; k++)
                for (let l = 1; l <= m2r; l++)  
                    console.log(k+l * l+k);  
                    solutionArea.innerHTML += `<input type="number" value="${document.querySelector(`#m1ValueBox${k}${l}`).value * document.querySelector(`#m1ValueBox${l}${k}`).value}"></input>`;
            solutionArea.innerHTML += "<div></div>";
        }
    }

    createRefreshButton(true);


    // solutionArea.innerHTML += (document.querySelector(`#m1ValueBox${i}${l - 1}`).value
    //                         * document.querySelector(`#m2ValueBox${l - 1}${j}`).value);
    // console.log(document.querySelector(`#m1ValueBox${i}${l - 1}`));

}



