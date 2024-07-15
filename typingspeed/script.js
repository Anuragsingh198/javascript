const input = document.getElementById('inputText');
const typing = document.getElementById('typing');
const time = document.getElementById('Time');
const wpm = document.getElementById('wpm');
const mistake = document.getElementById('mistake');
const againbutton = document.getElementById('againButton');
const typingContent = document.getElementById('typingContent');
const misdisplay = document.getElementById('misdisplay');
let usertext = "";

// let updatedText ="";
let startTime;
let textToDisplay = "";

function startTimer() {
    startTime = new Date();
    let rem = 60;
    const timedisplay = document.getElementById('timedisplay');
    const timer = setInterval(() => {
        const curr = Math.floor((new Date() - startTime) / 1000);
        console.log("it is current time", curr);
        const r = rem - curr;
        timedisplay.innerHTML = r;

        if (r <= 0) {
            clearInterval(timer);
            timedisplay.innerHTML = 0;
        }
    }, 1000);
    console.log("it is timer:", timer);
}

const text = "To be honest, we worked very hard as individuals and as a team, a lot has gone on behind the scenes for us to be here today and win this game. It is not what we did today, it is what we have been doing for the last 3-4 years. That’s the result that has come for us today We have played lots of high-pressure games in the past as well and have been on the wrong side as well. But the guys understand what needs to be done. Today was the perfect example of when the back is against the wall, what is required. We stuck together as a team";

input.addEventListener('input', (e) => {
    console.log(e.target.value);
    usertext = e.target.value;
    updateText(usertext);
    speedtext(startTime, usertext);
});

function updateText(usertext) { // Correct function name
    let updateText = "";
    for (let i = 0; i < textToDisplay.length; i++) {
        if (i < usertext.length) {
            if (usertext[i] === textToDisplay[i]) {
                updateText += `<span class="correct">${usertext[i]}</span>`;
            } else {
                updateText += `<span class="wrong">${usertext[i]}</span>`;
            }
        } else {
            updateText += textToDisplay[i];
        }
    }
    typingContent.innerHTML = updateText;
}

function speedtext(startTime, usertext) {
    const time = (new Date() - startTime) / 1000; 
    const wordsTyped = usertext.trim().split(/\s+/).length; 

    const speed = (wordsTyped / time) * 60;
    const wpmdis = document.getElementById('wpmdis');
    let mis = 0;
    let i = 0;
    const temptext = textToDisplay.trim().split(/\s+/); 
    while (i < wordsTyped && i < temptext.length) {
        if (temptext[i] !== usertext.trim().split(/\s+/)[i]) mis++; 
        i++;
    }
    misdisplay.innerHTML = mis;
    console.log(mis);
    wpmdis.innerHTML = speed.toFixed(2); 
}

againbutton.addEventListener("click", (e) => {
    const index = Math.floor(Math.random() * text.length);
    console.log(index);
    textToDisplay = text.substring(index);
    console.log(textToDisplay); 
    typingContent.innerHTML = textToDisplay; 
    startTimer();
    usertext = ""; 
    input.value = "";
    misdisplay.innerHTML = 0; 
    const wpmdis = document.getElementById('wpmdis');
    wpmdis.innerHTML = 0; 
});
