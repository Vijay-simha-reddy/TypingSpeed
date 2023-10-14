let timerEle = document.getElementById("timer");
let quoteRand = document.getElementById("quoteDisplay");
let quoteInputEle = document.getElementById("quoteInput");
let resultEle = document.getElementById("result");
let spin = document.getElementById("spinner");

let submitBtnEle = document.getElementById("submitBtn");
let restBtnEle = document.getElementById("resetBtn");
let timerValue = parseInt(timerEle.textContent);
let start = setInterval(function() {
    timerValue += 1;
    timerEle.textContent = timerValue;
}, 1000);

function startedTiming(start) {
    let option = {
        method: "GET"
    };
    url = "https://apis.ccbp.in/random-quote";
    spin.classList.remove("d-none");

    fetch(url, option)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let x = JSON.stringify(jsonData);
            const data = JSON.parse(x);
            let y = data.content;
            quoteRand.textContent = y;
            spin.classList.add("d-none");
        });
    submitBtnEle.addEventListener("click", function() {
        let first = quoteRand.textContent;
        let second = quoteInputEle.value;
        if (first === second) {
            clearInterval(start);
            resultEle.textContent = "You typed in " + timerValue + " seconds";
        } else {
            resultEle.textContent = "You typed incorrect sentence";
        }
    });
}
startedTiming(start);
restBtnEle.addEventListener("click", function() {
    clearInterval(start);
    quoteInputEle.value = "";
    resultEle.textContent = "";
    timerValue = -1;
    start = setInterval(function() {
        timerValue += 1;
        timerEle.textContent = timerValue;
    }, 1000);
    startedTiming(start);
});