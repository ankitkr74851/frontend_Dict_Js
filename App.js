const input = document.querySelector('input')
const btn = document.querySelector('.wordbutton')
const histroybtn = document.querySelector('.Historybtn')
const dictionaryArea = document.querySelector('.dictionary-app')
const histroyArray=[]




//https://api.dictionaryapi.dev/api/v2/entries/en/<word>



async function dictionaryFn(word){
   histroyArray.push(word)
    const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word)
    .then (res => res.json())
if(!histroyArray.includes(word))
    histroyArray.push(word)
    console.log(histroyArray)
    return res[0]
}


      btn.addEventListener('click' ,fetchandCreateCard )
     histroybtn.addEventListener('click',showhistory)
 async function fetchandCreateCard(){
     const data = await dictionaryFn(input.value)

 console.log(data)
  console.log(histroyArray)
       let partsOfSpeechArray = []

       for(let i=0; i<data.meanings.lenghth-1 ; i++){

          partsOfSpeechArray.push(data.meanings[i].partsOfSpeech)
     }

   // const dictionary = document.getElementById("dictionary");


    dictionaryArea.innerHTML = `
    <div class="card">
    <div class="property">
       <span> Word:</span>
       <span>${data.word}</span>
    </div>

    <div class="property">
      <span> 
      <audio controls src="${data.phonetics[0].audio}"></audio>

      </span>
   </div>

   <div class="property">
      <span> Definition</span>
      <span> ${data.meanings[0].definitions[0].definition}</span>
   </div>
   
   <div class="property">
      <span> Example</span>
      <span> ${data.meanings[1].definitions[0].example}</span>
   </div>


   <div class="property">
   <span>${partsOfSpeechArray.map(e => e).join(' , ')}</span>
   </div>
  </div>

    `       
}
let resultsdiv=document.querySelector('.History-result')
function showhistory(){
   let para=document.createElement('p');
   if(histroyArray.length==0){
      para.innerHTML='plese search something'
      resultsdiv.appendChild(para);
   }
   else{
      histroyArray.map((value)=>{
         para.innerHTML=value;
         resultsdiv.appendChild(para);
      })
   }
}

