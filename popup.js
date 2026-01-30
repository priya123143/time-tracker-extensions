chrome.storage.local.get(null, (data) => {
  let list = document.getElementById("list");

  for (let site in data) {
    let li = document.createElement("li");
    li.textContent = site + " : " + data[site] + " sec";
    list.appendChild(li);
  }
});