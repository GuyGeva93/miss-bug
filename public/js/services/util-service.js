
export const utilService = {
  saveToStorage,
  loadFromStorage,
  deleteFromStorage
}

function saveToStorage(key, data) {
  var json = JSON.stringify(data);
  localStorage.setItem(key, json);
}

function loadFromStorage(key) {
  var json = localStorage.getItem(key);
  var data = JSON.parse(json);
  return data;
}

function deleteFromStorage(key) {
  localStorage.removeItem(key);
}