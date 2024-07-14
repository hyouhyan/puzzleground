let startTime; // 測定開始時間
let timeoutId;

const time = document.getElementById("time");

function startTimer() {
    startTime = Date.now();
    timer();
}

function stopTimer() {
    clearTimeout(timeoutId);
}

function timer() {
    const d = new Date(Date.now() - startTime);
    const s = String(d.getSeconds()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    time.textContent = `${m}:${s}`;
    timeoutId = setTimeout(() => {
        timer();
    }, 1000);
}