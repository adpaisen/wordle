const answer = "VALENTINE";
let row = 0;
let currentGuess = "";
const keyStatus = {}; // Tracks used letters

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");

/* Create Board */
for (let i=0;i<6;i++){
  const rowDiv=document.createElement("div");
  rowDiv.className="row";
  for (let j=0;j<9;j++){
    const tile=document.createElement("div");
    tile.className="tile";
    rowDiv.appendChild(tile);
  }
  board.appendChild(rowDiv);
}

/* Keyboard Letters */
const keys = [
  "Q","W","E","R","T","Y","U","I","O","P",
  "A","S","D","F","G","H","J","K","L",
  "ENTER","Z","X","C","V","B","N","M","BACK"
];

keys.forEach(k=>{
  const keyBtn=document.createElement("div");
  keyBtn.className="key";
  keyBtn.innerText=k;
  keyboard.appendChild(keyBtn);

  keyBtn.addEventListener("click",()=> handleKey(k));
});

/* Handle Key Press */
function handleKey(k){
  if(row>=6) return;

  if(k==="ENTER"){ submitGuess(); return; }
  if(k==="BACK"){ currentGuess=currentGuess.slice(0,-1); updateTiles(); return; }
  if(currentGuess.length<answer.length){ currentGuess+=k; updateTiles(); }
}

/* Update Board Tiles */
function updateTiles(){
  const tiles = board.children[row].children;
  for(let i=0;i<answer.length;i++){
    tiles[i].innerText=currentGuess[i] || "";
  }
}

/* Submit Guess */
function submitGuess(){
  if(currentGuess.length!==answer.length){
    message.innerText=`Guess must be ${answer.length} letters 💗`;
    return;
  }

  const tiles = board.children[row].children;
  for(let i=0;i<answer.length;i++){
    let status;
    if(currentGuess[i]===answer[i]) { 
      tiles[i].classList.add("correct"); 
      status="correct";
    }
    else if(answer.includes(currentGuess[i])) { 
      tiles[i].classList.add("present"); 
      status="present";
    }
    else { 
      tiles[i].classList.add("absent"); 
      status="absent";
    }

    // Update keyboard key color (preserve green)
    const keyDiv = Array.from(keyboard.children).find(k=>k.innerText===currentGuess[i]);
    if(keyDiv){
      if(keyStatus[currentGuess[i]]!=="correct"){
        keyDiv.classList.remove("correct","present","absent");
        keyDiv.classList.add(status);
        keyStatus[currentGuess[i]] = status;
      }
    }
  }

  if(currentGuess===answer){
    message.innerText="You got it 💘";
    setTimeout(()=>{ window.location.href="valentine_question.html"; },1000);
    return;
  }

  row++;
  currentGuess="";
  if(row>=6){
    message.innerText=`Out of tries 😭 The word was ${answer} 💗`;
  }
}

/* Floating Hearts */
function createHeart(){
  const heart=document.createElement("div");
  heart.className="heart";
  heart.innerText="💖";
  heart.style.left=Math.random()*100+"vw";
  heart.style.fontSize=(Math.random()*20+15)+"px";
  heart.style.animationDuration=(Math.random()*3+4)+"s";
  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(),6000);
}
setInterval(createHeart,500);

/* Allow typing on PC */
document.addEventListener("keydown",(e)=>{
  const key = e.key.toUpperCase();
  if(key==="ENTER"){ handleKey("ENTER"); }
  else if(key==="BACKSPACE"){ handleKey("BACK"); }
  else if(/^[A-Z]$/.test(key)){ handleKey(key); }
});