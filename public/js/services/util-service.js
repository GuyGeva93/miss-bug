
export const utilService = {
  // saveToStorage,
  // loadFromStorage,
  // deleteFromStorage
  saveToSessionStorage,
  loadFromSessionStorage,
  deleteFromSessionStorage
}

function saveToSessionStorage(key, data) {
  var json = JSON.stringify(data);
  sessionStorage.setItem(key, json);
}

function loadFromSessionStorage(key) {
  var json = sessionStorage.getItem(key);
  var data = JSON.parse(json);
  return data;
}
function deleteFromSessionStorage(key) {
  sessionStorage.removeItem(key);
}


// function saveToStorage(key, data) {
//   var json = JSON.stringify(data);
//   localStorage.setItem(key, json);
// }
// function loadFromStorage(key) {
//   var json = localStorage.getItem(key);
//   var data = JSON.parse(json);
//   return data;
// }

// function deleteFromStorage(key) {
//   localStorage.removeItem(key);
// }