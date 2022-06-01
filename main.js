const m1rows = document.getElementById("m1rows");
const m1cols = document.getElementById("m1cols");
const m2rows = document.getElementById("m2rows");
const m2cols = document.getElementById("m2cols");
const myForm = document.querySelector("#rowColCountForm");

myForm.addEventListener('submit', onSubmit);

function onSubmit(e){
    e.preventDefault();

    if (m1cols.value != m2rows.value){
        alert("Error.");
    }
}

