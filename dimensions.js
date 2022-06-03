const m1rowsError = document.querySelector(".m1rowsError");
const m1colsError = document.querySelector(".m1colsError");
const m2rowsError = document.querySelector(".m2rowsError");
const m2colsError = document.querySelector(".m2colsError");

const m1rows = document.getElementById("m1rows");
const m1cols = document.getElementById("m1cols");
const m2rows = document.getElementById("m2rows");
const m2cols = document.getElementById("m2cols");
const myForm = document.querySelector("#rowColCountForm");

const valueBoxesArea = document.querySelector(".valueBoxes");

myForm.addEventListener("submit", checkValid);

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
        produceValueBoxes(m1rows.value, m1cols.value, m2rows.value, m2cols.value);            

}

function produceValueBoxes(m1rows, m1cols, m2rows, m2cols){
    // Matrix 1
    valueBoxesArea.innerHTML += '<p class="valueBoxTitle">Matrix 1</p>'
    for (let i = 1; i <= m1rows; i++) {
        for (let j = 1; j <= m1cols; j++)
            valueBoxesArea.innerHTML += `<input type="number" class="valueBox" id="m1valueBox${i}${j}" value="0"></input>`;
        valueBoxesArea.innerHTML += "<div></div>";
    }
    // Matrix 2
    valueBoxesArea.innerHTML += '<p class="valueBoxTitle">Matrix 2</p>'
    for (let i = 1; i <= m2rows; i++) {
        for (let j = 1; j <= m2cols; j++)
            valueBoxesArea.innerHTML += `<input type="number" class="valueBox" id="m2valueBox${i}${j}" value="0"></input>`;
        valueBoxesArea.innerHTML += "<div></div>";
    }    
}