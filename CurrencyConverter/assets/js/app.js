const getExchangeBtn = document.querySelector("#getExchange")
const fromInput = document.querySelector("#fromInput")
const toInput = document.querySelector("#toInput")
const amountInput = document.querySelector("#amountInput")
const resultText = document.querySelector("#resultText")

async function getExchangeResult(){
   const result = await (await fetch(`https://open.er-api.com/v6/latest`)).json()
   const rates = result.rates
   for(const [key,value] of Object.entries(rates)){
      let options = document.createElement("option")
      options.innerHTML = key
      fromInput.appendChild(options)
      options = document.createElement("option")
      options.innerHTML = key
      toInput.appendChild(options)
   }
   getExchangeBtn.addEventListener("click",getResult)
}

getExchangeResult()

async function getResult(){
   if(!(amountInput.value == null || amountInput.value <=0 || (amountInput.value).toString().startsWith("0"))){
      const result = await (await fetch(`https://open.er-api.com/v6/latest/${fromInput.value}`)).json()
      const rates = result.rates
      let exchangeResult = 0
      Object.entries(rates).forEach((e)=>{
         if(toInput.value === e[0]){
            exchangeResult = (e[1] * amountInput.value).toFixed(3)
         }
      })
      resultText.style.color = "black"
      resultText.textContent = `${amountInput.value} ${fromInput.value} = ${exchangeResult} ${toInput.value}`
   }
   else{
      resultText.style.color = "#ec3420"
      resultText.textContent = "Please enter a valid number"
   }
}