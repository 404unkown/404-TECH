// Matrix background
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const letters = "01";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);
function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#0ff";
  ctx.font = fontSize+"px monospace";
  drops.forEach((y,i)=>{
    const text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text, i*fontSize, y*fontSize);
    if(y*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  });
}
setInterval(drawMatrix,50);

// Music toggle
const audio = document.getElementById("bgAudio");
const toggle = document.getElementById("musicToggle");
let playing = false;
toggle.addEventListener("click",()=>{
  playing = !playing;
  if(playing){ audio.play(); toggle.textContent="🔈"; }
  else { audio.pause(); toggle.textContent="🔊"; }
});
