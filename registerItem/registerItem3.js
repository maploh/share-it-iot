
const proceedButton = document.getElementById("proceed-button");
const inputItemName = document.getElementById("input-item-name");
const inputItemType = document.getElementById("input-item-type");

proceedButton.addEventListener("click", function(){
        localStorage.setItem("itemName", inputItemName.value);
        localStorage.setItem("itemType", inputItemType.value);
        window.location.href = "/registerItem/userQRRegister.html";
});