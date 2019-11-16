import decode from "audio-decode";
import toWav from "audiobuffer-to-wav";

const audioIn = document.getElementById("audioIn");
const convertBt = document.getElementById("convertBt");
const originalPlayer = document.getElementById('originalPlayer')
const converted = document.getElementById('converted')
const convertedPlayer = document.getElementById('convertedPlayer')

let file;

function load() {
  file = this.files[0];
  console.log(file);
  const src = URL.createObjectURL(file);
  originalPlayer.src = src;
  originalPlayer.style.display = "block";
  convertBt.disabled = false;
}
function getFilenameWithoutExtension(name) {
  let nameArr = name.split(".");
  nameArr.pop();
  return nameArr.join(".");
}
function convert() {
  const fileName = getFilenameWithoutExtension(file.name);
  decode(file).then(audioBuffer => {
    console.log(audioBuffer);
    let arrayBufferWav = toWav(audioBuffer);
    console.log(arrayBufferWav);
    let convertFile = new File([arrayBufferWav], fileName + ".wav", {
      type: "audio/wav"
    });
		console.log(convertFile);
		const src = URL.createObjectURL(convertFile)
		console.log(src)
		convertedPlayer.src = src;
		converted.style.display = 'block';

  });
}
audioIn.addEventListener("change", load);
convertBt.addEventListener("click", convert);
