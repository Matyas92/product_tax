
//Putting the DOM here as the form and the set_body where will be uploaded the datas
//Final is a tbody in html which writes the all prices with taxes and the diff between all taxes and NET prices 
const form  = document.getElementById('input');
set_body = document.querySelector(".set_body")
set_final = document.querySelector(".final")

//Creating two arrays, nums will be pushed into
const prices = []
const taxes = []

//Creating a function for the tax
function addTax (html){
    //Convert arr string to an array

    const arr = html.split(" ")      //For example 1 book at 12.49 --> ["1","book","at","12.49"]

    //Exempted product in case when no added sales taxes atributed to it
      const exemptedProducts = ["book","pills","chocolates","chocolate"]

      //If there is an array, looping it and find with some 
    const findSame = (arr,exc) => {
      return arr.some(item=> exc.includes(item))
    }
            //If contains imported--> more sales tax added
            const priceImport = (findSame(arr,"imported") 
            ?
             0.05
             : 
             0)
    // Same function looking for if it includes exemptedProducts
            const calcAllTax = (findSame(arr,exemptedProducts) 
            ? 
            arr[arr.length-1] * (priceImport + 1.00)
            :
            arr[arr.length-1] * (priceImport + 1.10))
            
            //In the Salex Taxes part-> subtract taxed price (it is greater) with normal NET price 
            const diffTaxAndSimple = calcAllTax - arr[arr.length-1]

            //Array -> string  ["1","book","at","12.49"] - >   1 book at 12.49 but with the sales tax added
            const slicedArr = arr.slice(0,arr.length-1).join(" ") + ` ${(Math.ceil(calcAllTax * 20) / 20).toFixed(2)}` // *20/20.tofixed round to 0.05 np/100
            //tax differences and all the taxes prices in two array
            taxes.push(Number(diffTaxAndSimple))
            prices.push(Number(calcAllTax))

            return slicedArr
        }

