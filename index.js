import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://add-to-cart-todo-app-default-rtdb.firebaseio.com/",
};

// ref is reference
//  it takes two things what database you are taking
//what the ref should be called
//push to push the database to firebase

//onValue - 1 ref where we want to fetch data from

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

console.log(app);
const inputFieldEL = document.getElementById("input-field");
const addButtonEL = document.getElementById("add-button");
const shoppinglistEl = document.getElementById("shopping-List");

addButtonEL.addEventListener("click", function () {
  let inputValue = inputFieldEL.value;
  push(shoppingListInDB, inputValue);
  clearInputFieldEl();

});

onValue(shoppingListInDB, function (snapshot) {
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());
 
        clearShoppingListEl()
        for(let i = 0; i < itemsArray.length; i++){
          let currentItem = itemsArray[i]
         let currentItemId = currentItem[0]
         let currentItemValue = currentItem[1]
        
       appendItemToShoppingListEL(currentItem)
        }
    } else{
        shoppinglistEl.innerHTML = "No items here....." 
    }
 
 
});

function clearShoppingListEl(){
    shoppinglistEl.innerHTML=""
}
function clearInputFieldEl() {
  inputFieldEL.value = null;
}

function appendItemToShoppingListEL(item) {
  //shoppinglistEl.innerHTML += `<li>${itemValue}</li>`;
  let itemID = item[0]
  let itemValue = item[1]
let newEl = document.createElement("li")
newEl.textContent= itemValue

newEl.addEventListener("click",function(){
    console.log(itemID)
   let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`)
    remove(exactLocationOfItemInDB)
   
})
shoppinglistEl.append(newEl)



}
