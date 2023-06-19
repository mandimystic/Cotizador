

const form = document.querySelector("#coin-form");
const coin = document.querySelector("#coin");
const crypto = document.querySelector("#crypto");
const amount = document.querySelector("#amount");
const formBtn = document.querySelector("#form-btn");
const coinInfo = document.querySelector("#coin-info");


 
form.addEventListener ("submit", async e => {
  e.preventDefault ();

    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const amountValue = amount.value;

    try {
        coinInfo.innerHTML= `
        <div class="loader"></div>
        `
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();   

        console.log(response.DISPLAY);
        
        const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const higherPrice= response.DISPLAY [cryptoSelected][coinSelected].HIGH24HOUR;
        const lowerPrice = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const cambioPrice = response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;

        

        if (amountValue !== ""){
            const result = Number(amountValue) / response.RAW[cryptoSelected][coinSelected].PRICE; 
            coinInfo.innerHTML=`
            <p class="info">El precio es: <span class="price">${price}</span></p>
            <p class="info">El precio mas alto es: <span class="price">${higherPrice}</span></p>
            <p class="info">El precio mas bajo es: <span class="price">${lowerPrice}</span></p>
            <p class="info">Variacion 24H: <span class="price">10%</span>${cambioPrice}%</p>
            <p class="info">Puede comprar: <span class="price">1.444 ETH</span>${result.toFixed(4)} ${cryptoSelected}</p>
        `
        } else {
            coinInfo.innerHTML=`
            <p class="info">El precio es: <span class="price">${price}</span></p>
            <p class="info">El precio mas alto es: <span class="price">${higherPrice}</span></p>
            <p class="info">El precio mas bajo es: <span class="price">${lowerPrice}</span></p>
            <p class="info">Variacion 24H: <span class="price">10%</span>${cambioPrice}%</p>
        `
        }


        coinInfo.innerHTML=`
            <p class="info">El precio es: <span class="price">${price}</span></p>
            <p class="info">El precio mas alto es: <span class="price">${higherPrice}</span></p>
            <p class="info">El precio mas bajo es: <span class="price">${lowerPrice}</span></p>
            <p class="info">Variacion 24H: <span class="price">10%</span>${cambioPrice}</p>
            <p class="info">Puede comprar: <span class="price">1.444 ETH</span></p>
        `

    } catch (error) {
        console.log(error)
    }
});

