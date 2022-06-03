const m1colsError = document.querySelector(".m1colsError");
const m2rowsError = document.querySelector(".m2rowsError");

const m1rows = document.getElementById("m1rows");
const m1cols = document.getElementById("m1cols");
const m2rows = document.getElementById("m2rows");
const m2cols = document.getElementById("m2cols");

const rules = document.querySelector(".rules");
const form = document.querySelector("#rowColCountForm");

const valueBoxesForm = document.querySelector(".valueBoxesForm");
const buttonArea = document.querySelector(".buttonArea");
const solutionArea = document.querySelector(".solution");

form.addEventListener("submit", checkValid);

function checkValid(err){
    valueBoxesForm.innerHTML = "";
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
    createRefreshButton();
    createResetButton();
    createCalculateButton(m1rows.value, m1cols.value, m2rows.value, m2cols.value);
}

function createValueBoxes(m1rows, m1cols, m2rows, m2cols){
    // Matrix 1
    valueBoxesForm.innerHTML += '<p class="valueBoxTitle">Matrix 1</p>'
    for (let i = 1; i <= m1rows; i++) {
        for (let j = 1; j <= m1cols; j++)
            valueBoxesForm.innerHTML += `<input type="number" class="valueBox" id="m1valueBox${i}${j}" value="0"></input>`;
        valueBoxesForm.innerHTML += "<div></div>";
    }
    // Matrix 2
    valueBoxesForm.innerHTML += '<p class="valueBoxTitle">Matrix 2</p>';
    for (let i = 1; i <= m2rows; i++) {
        for (let j = 1; j <= m2cols; j++)
            valueBoxesForm.innerHTML += `<input type="number" class="valueBox" id="m2valueBox${i}${j}" value="0"></input>`;
        valueBoxesForm.innerHTML += "<div></div>";
    }    

    rules.remove();
    form.remove();
}

function createRefreshButton(){
    valueBoxesForm.innerHTML += '<a href="dimensions.html"><button class="refreshButton">Back to Dimensions</button></a>';
}

function createResetButton(){
    valueBoxesForm.innerHTML += '<button class="resetButton" type="reset">Reset</button>';
}

function createCalculateButton(){
    valueBoxesForm.innerHTML += '<button class="calculateButton" type="submit">Calculate!</button>';
    const calculateButton = document.querySelector(".calculateButton");
    calculateButton.addEventListener("click", calculateProduct);
}

function calculateProduct(m1rows, m1cols, m2rows, m2cols){
    // valueBoxesForm.remove();


    // solutionArea.innerHTML += (document.querySelector(`#m1ValueBox${i}${l - 1}`).value
    //                         * document.querySelector(`#m2ValueBox${l - 1}${j}`).value);
    // console.log(document.querySelector(`#m1ValueBox${i}${l - 1}`));

}



