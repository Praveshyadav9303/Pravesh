const {createScript, viewScript} = require('./web3connect.js')
//const{Email3} = require('./index.js');
var CryptoJS = require("crypto-js");
const { create, CID } = require("ipfs-http-client");
const projectId = '2FNjE1lCSxe3pPGK3H8FH1gMdT4';   // <---------- your Infura Project ID

const projectSecret = '9466554632345d063b3ecfeb140d1b3e';  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfsclient = async () =>{

    const ipfs = await create({
        host : "ipfs.infura.io",
        port: 5001,
        protocol:"https",
        headers: {
            authorization: auth,
        },
    });

    return ipfs;
} 


let file = document.getElementById('file-input');
file.onchange = fileSelected;


let Submit2 = document.getElementById('createScript');
Submit2.onclick = scriptCreate;

const sub3 = document.getElementById("displayScript");
sub3.onclick = readScript;


function readScript(e){
   e.preventDefault()
   viewScript();
   var x = document.getElementById("div1");
   if (x.style.display === "none") {
     x.style.display = "block";
   } else {
     x.style.display = "none";
   }
  //window.location = "display.html";
}

 
function fileSelected(e) {
    if (e.target.files.length < 1) {
      console.log('nothing selected')
      return
    }
    selectedFile = e.target.files[0]
  }


async function scriptCreate(e){
    e.preventDefault()
    let ipfs = await ipfsclient();
 let result = await ipfs.add(selectedFile);
console.log(result.path);
const preName = document.getElementById('pname1').value;
const Email3 = localStorage.getItem("xyz");
//console.log(Email3)
    const urikey = document.getElementById('key').value;
    let emailKey = "mnf";
    EncryptEmail1 = CryptoJS.AES.encrypt(Email3, emailKey).toString();
    console.log("Encrypted Email", EncryptEmail1);

    var bytes = CryptoJS.AES.decrypt( EncryptEmail1, emailKey);
    var originalEmail = bytes.toString(CryptoJS.enc.Utf8);

   console.log("Decrypted Email",originalEmail);

  var encryptcid = CryptoJS.AES.encrypt(result.path, urikey).toString();
  // return ciphertext;
  console.log("Encrypted CID:",encryptcid);

  var bytes = CryptoJS.AES.decrypt(encryptcid, urikey);
  var originalCid = bytes.toString(CryptoJS.enc.Utf8);

  console.log("Decrypted CID:",originalCid); 

  await createScript(EncryptEmail1,preName, encryptcid);
  var x = document.getElementById("div2");
   if (x.style.display === "none") {
     x.style.display = "block";
   } else {
     x.style.display = "none";
   }

}




