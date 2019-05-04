var data = {
    belonged_acc_no: null,
    item_name: null,
    item_type: null
}

var url = "https://share-it-backend-dev.herokuapp.com/registeritem";


function generateItemQR(itemID) {
    var qr = new QRious({
        element: document.getElementById('qr'),
        value: itemID,
        size: '250',
        background: 'white',
        foreground: 'black'
    });
    return qr
}

function registerItem() {
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(response => {
            console.log(response);
            if (response.res == 'false') {
                document.getElementById("error-message").innerHTML = "Please Enter a Valid User ID";
            } else {
                var tempID = response[0].item_qrcode.toString();
                generateItemQR(tempID);
            }
        }) //console.log(response[0].iid))
        .catch(error => {
            document.getElementById("error-message").innerHTML = "Please Enter a Valid User ID";
        }); //console.error('Error:', error)

}

var buttonNext = document.getElementById("next-button");
var buttonRegister = document.getElementById("register-button");

buttonNext.addEventListener('click', function () {
    data.belonged_acc_no = document.getElementById("userID").value
    document.getElementById("container-1").style.display = "none";
    document.getElementById("container-2").style.visibility = "visible";
});

buttonRegister.addEventListener('click', function () {
    data.item_name = document.getElementById("itemName").value;
    data.item_type = document.getElementById("itemType").value;
    document.getElementById("container-2").style.display = "none";
    // document.getElementById("qr-h1")
    registerItem();
});

// buttonRegister.addEventListener('click', registerItem);