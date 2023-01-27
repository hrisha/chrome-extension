let myLeads = [];
let input = document.querySelector(".input");
let saveText = document.querySelector(".save");
let saveTab = document.querySelector(".tab");
let deleteAll = document.querySelector(".del");
let ul = document.querySelector(".ul");
let local = JSON.parse(localStorage.getItem("myLeads"));

if (local) {
  myLeads = local;
  RenderList(myLeads);
}

function CreateEntry(link) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  li.appendChild(a);
  ul.appendChild(li);
  a.innerHTML = link;
  a.href = link;
  a.target = "_blank";
}
function RenderList(leads) {
  leads.forEach((e) => {
    CreateEntry(e);
  });
}

saveText.onclick = function () {
  CreateEntry(input.value);
  myLeads.push(input.value);
  input.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
};

deleteAll.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  ul.innerHTML = "";
});

saveTab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    CreateEntry(tabs[0].url);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  });
});
