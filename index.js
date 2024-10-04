import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {getDatabase,
    ref,
    push,
    onValue,
    remove} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:"https://leads-tracker-e3781-default-rtdb.asia-southeast1.firebasedatabase.app/"

}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const refeernceindb=ref(database, "leads")
//JS Code
let stop = document.querySelector("#myform");
let savebtn = document.querySelector("#input-btn");
let inputLeads = document.getElementById("text-el");
const ulEl = document.getElementById("ul-el");
const deleted = document.getElementById("del");
// const tabBtn = document.getElementById("save-tab-btn");

function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted without refresh");
}
stop.addEventListener("submit", function (event) {
  event.preventDefault();
});

// onvalue  is a firebase function that sits & listens to the database that change in database in case of data added,changed,removed

onValue(refeernceindb,function(snapshot){
    const existssnapshot=snapshot.exists()
    if(existssnapshot){
        const snapshotvalue=snapshot.val()
        const value=Object.values(snapshotvalue)
        renderLead(value)
    }
   
})


// save button
savebtn.addEventListener("click", function (res) {
  push(refeernceindb,inputLeads.value);
  inputLeads.value = "";
});

function renderLead(leads) {
  let listItems = "";
  //iterator to mylead
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a target="_blank" href="${leads[i]} "> ${leads[i]} </li>`;
    // ulEl.innerHTML+=`<li>${myLeads[i]}</li>`
    // let li=document.createElement("li")
    // li.innerText=myLeads[i];
    // ulEl.append(li)
  }
  ulEl.innerHTML = listItems;
}
deleted.addEventListener("dblclick", function () {
remove(refeernceindb);
ulEl.innerHTML=""

});
