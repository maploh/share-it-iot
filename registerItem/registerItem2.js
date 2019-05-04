DWTQR("scanUser");

dwStartScan();

var dataRegister = {
    belonged_acc_no: localStorage.getItem("userID"),
    item_name: localStorage.getItem("itemName"), //localStorage.getItem("itemName"),
    item_type: localStorage.getItem("itemType") //localStorage.getItem("itemType")
}

var urlRegisterItem = "https://share-it-backend-dev.herokuapp.com/registeritem";



function dwQRReader(data) {
    localStorage.setItem("userID", data.substring(0, 10));
    // dataRegister.belonged_acc_no = localStorage.getItem("userID");
    dataRegister.item_name = localStorage.getItem("itemName");
    dataRegister.item_type = localStorage.getItem("itemType");
    registerItem();
}

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
    fetch(urlRegisterItem, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(dataRegister), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(response => {
            if (response.res == 'false') {
                window.location.href = "enterValidID.html";
            } else {
                document.getElementById("scanUser").style.display = "none";
                console.log(response);
                var tempID = response[0].item_qrcode.toString();
                generateItemQR(tempID);
            }
        })
        .catch(error => {
            dwStartScan();
        }); 

}

// itemRegister
