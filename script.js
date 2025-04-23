var btc = document.getElementById("bitcoin");
var eth = document.getElementById("ethereum");
var doge = document.getElementById("dogecoin");

const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ZtZGhCtxAYrvh62njRzdD1AE'}
  };
  var settings = {
  
    "async": true ,
    "scrossdomain": true,
    "url":'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd',
    method:"GET",
    "headers": {}
  }
    $.ajax(settings).done(function (response){
        btc.innerHTML = response.bitcoin.usd;
        eth.innerHTML = response.ethereum.usd;
        doge.innerHTML = response.dogecoin.usd;
    })