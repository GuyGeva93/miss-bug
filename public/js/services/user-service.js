import { utilService } from "./util-service.js"


var gLoggedInUser = utilService.loadFromSessionStorage('USER')
// var gLoggedInUser = utilService.loadFromStorage()

export const userService = {
  login,
  logout,
  getLoggedInUser
}

function login(credentials) {
  return axios.post('/api/user/login', { credentials })
    .then(res => res.data)
    .then(user => {
      gLoggedInUser = user
      utilService.saveToSessionStorage('USER', user)
      // utilService.saveToStorage('USER', user)
      return user
    })

}

function logout() {
  return axios.post('/api/user/logout')
    .then(res => res.data)
    .then(() => {
      gLoggedInUser = null
      utilService.deleteFromSessionStorage('USER')
      // utilService.deleteFromStorage('USER')
    })
}

function getLoggedInUser() {
  return Promise.resolve(gLoggedInUser)
}