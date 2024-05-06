var apiKey = "onltm0qSl3Aq7YRhc8Kxu1N4WqwjBMCzM7HgiSKCOI"
var baseUrl = "https://api.extract.pics/v0"
var desUrl = "https://www.google.com"

var input = document.getElementById("input");
input.addEventListener("onchange", function (value) {
    desUrl = value;
    console.log(desUrl)
})

var callApi = async function () {
    var desUrl = document.getElementById("input").value;
    console.log("Call API")
    const res = await fetch('https://api.extract.pics/v0/extractions/', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: desUrl }),
    })

    const json = await res.json()

    const id = json.data.id;

    let status = 'pending';

    while (status !== 'done' && status !== 'error') {

    const res = await fetch(`https://api.extract.pics/v0/extractions/${id}`, {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${apiKey}`,
        },
    })

    status = (await res.json()).data.status;
    const json = await res.json()
    console.log(json)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    }   

}

