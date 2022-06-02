const m1rowsError = document.querySelector(".m1rowsError");
const m1colsError = document.querySelector(".m1colsError");
const m2rowsError = document.querySelector(".m2rowsError");
const m2colsError = document.querySelector(".m2colsError");

const m1rows = document.getElementById("m1rows");
const m1cols = document.getElementById("m1cols");
const m2rows = document.getElementById("m2rows");
const m2cols = document.getElementById("m2cols");
const myForm = document.querySelector("#rowColCountForm");

myForm.addEventListener("submit", checkValid);

function checkValid(err){
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
        myForm.submit();
}