/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function findRate(currencyId, endId) {
    // First get the zip code from the HTML textbox
    var sCode = document.getElementById(currencyId).value;
    var eCode = document.getElementById(endId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                // The request was successful!
                displayRate(this.responseText, sCode, eCode);
            }
            else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        }
        else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "http://api.fixer.io/latest?base=" + sCode;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}
/**
 * Displays the zip code place given the JSON data
 * @param {string} data JSON data representing place for given zip code
 */
function displayRate(data, startCode, endCode) {
    var rate = JSON.parse(data);
    if (startCode == endCode) {
        document.getElementById("rate").className = "alert alert-warning";
        document.getElementById("rate").innerHTML = "Rate: 1";
        document.getElementById("rateResult").className = "alert alert-warning";
        document.getElementById("rateResult").innerHTML = "Final Amount: " + document.getElementById("amount").value;
    }
    else {
        document.getElementById("rate").className = "alert alert-success";
        document.getElementById("rate").innerHTML = "Rate: " + rate.rates[endCode];
        document.getElementById("rateResult").className = "alert alert-success";
        document.getElementById("rateResult").innerHTML = "Final Amount: " + Math.round((document.getElementById("amount").value * rate.rates[endCode]) * 100) / 100;
    }
}
