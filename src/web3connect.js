
const Web3 = require ('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const CAddress ='0x13A0e0361C80Acf74E71a732a27d29238E9a8003';

console.log("this id my priavte key",process.env.PRIVATE_KEY)

const privateKey = privateKey_env;
let web3;
let accounts;
let Owner;
let instance;
 const Connect = async() => {
const provider = new HDWalletProvider(privateKey,`https://rpc-mumbai.maticvigil.com/`);
web3 = new Web3(provider);
let abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"NoOfScript","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"string","name":"_previewName","type":"string"},{"internalType":"string","name":"_url","type":"string"}],"name":"createPreView","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"createUserProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"deleteUserProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"login","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"string","name":"","type":"string"}],"name":"preview","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_scriptName","type":"string"},{"internalType":"string","name":"_encryptedURL","type":"string"}],"name":"registerScript","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"scriptDetails","outputs":[{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"scriptName","type":"string"},{"internalType":"string","name":"encryptedURL","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"viewScriptDetails","outputs":[{"components":[{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"scriptName","type":"string"},{"internalType":"string","name":"encryptedURL","type":"string"}],"internalType":"struct myNextFilm.script[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}];
//web3 = new Web3('http://localhost:9545');
instance = new web3.eth.Contract(
abi,
CAddress,
);
accounts = await web3.eth.getAccounts()
Owner = accounts[0];
console.log(Owner);
}
Connect();
 const createPreViewforUser = async(_Email, _previewName, _url) => {
   EncryptEmail = await web3.utils.soliditySha3(_Email)
accounts = await web3.eth.getAccounts()
await instance.methods.createPreView(EncryptEmail, _previewName, _url).send({
from: accounts[0],
//gas: 8500000
})
.then(()=>{
    
    document.getElementById('email').innerHTML =EncryptEmail ;
    document.getElementById('pname').innerHTML =_previewName;
    document.getElementById('cid1').innerHTML =_url ; 

console.log("Encrypted Email",EncryptEmail, "Preview Name",_previewName ," CID ",_url);
alert("Data Uploaded SuccessFully");
});
}

//createPreViewforUser('asha@gmail.com', 'Asha','bafybeign6apue5m7u4eetm6vroozkcfl3354s77ro4efftgc2zsrem2kdm');
const ReadPreView = async(_Email, _previewName) => {
   
    EncryptEmail = await web3.utils.soliditySha3(_Email)
    //accounts = await web3.eth.getAccounts()
    await instance.methods.preview(EncryptEmail, _previewName).call()
    .then((CID)=>{

    console.log("---------------------------");
    console.log("Encrypted Email",EncryptEmail, "Preview Name",_previewName);
    console.log("---------------------------");
    console.log(CID);

    // document.getElementById('myImg').innerHTML =CID ; 
    //document.getElementById("myImg").src = `https://ipfs.io/ipfs/${CID}`;
    alert("Data Fetched from Blockchain",location.replace(`https://ipfs.io/ipfs/${CID}`));
     return CID;
    });
    }

    const createScript = async(_Email, _previewName, _url) => {
    
        accounts = await web3.eth.getAccounts()
        await instance.methods.registerScript(_Email, _previewName, _url).send({
        from: accounts[0],
        //gas: 8500000
        })
        .then(()=>{
            
            document.getElementById('email').innerHTML =_Email ;
            document.getElementById('pname').innerHTML =_previewName;
            document.getElementById('cid1').innerHTML =_url ; 
        
        console.log("Encrypted Email",_Email, "Preview Name",_previewName ," Encrypted CID ",_url);
        alert("Creating Script SuccessFully");
        });
        }

        const viewScript = async() => {
            //accounts = await web3.eth.getAccounts()
              await instance.methods.viewScriptDetails().call()
            .then((value)=>{ 
            console.log("---------------------------viewScript",value); 
             for (i = 0; i < value.length; i++) {
          let myTable1 = document.getElementById('myTable').getElementsByTagName('tbody')[0];
          let row = myTable1.insertRow();
           
            let EncryptEmail = value[i].email;
            let ScriptName = value[i].scriptName;
            let EncryptedCID = value[i].encryptedURL;

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

                cell1.innerHTML = EncryptEmail;
				cell2.innerHTML = ScriptName;
				cell3.innerHTML = EncryptedCID;

                }
            });
        }



const register = async(Email, Pass ) => {
    EncryptEmail = await web3.utils.soliditySha3(Email)
    EncryptPass = await web3.utils.soliditySha3(Pass)
    accounts = await web3.eth.getAccounts()
    await instance.methods.createUserProfile(EncryptEmail,EncryptPass ).send({
    from: accounts[0],
    //gas: 8500000
    })
    .then(()=>{
    console.log("---------------------------");

    console.log("User",accounts[0],"Encrypted Email",EncryptEmail, "Encrypt Password", EncryptPass);
    console.log("---------------------------");
    });
    }

    const userlog = async(Email,Pass) => {
        localStorage.setItem("xyz",Email);
        //console.log(localStorage.getItem("xyz"));
        EncryptEmail = await web3.utils.soliditySha3(Email)
        EncryptPass = await web3.utils.soliditySha3(Pass)
        accounts = await web3.eth.getAccounts()
        await instance.methods.login(EncryptEmail,EncryptPass ).call({from:accounts[0]})
        .then((status)=>{
          
        if (status == true) {
            window.location = "load.html";
            alert("Successfully Logged In");
        }
	      else {
            alert ("Login was unsuccessful, please Register First");
        }
      });		

        }

    //register("asha@gmail.com","asg566");
module.exports={createPreViewforUser,ReadPreView,register,userlog,createScript,viewScript};

//ReadPreView('abc@gmail.com','XYZ'



