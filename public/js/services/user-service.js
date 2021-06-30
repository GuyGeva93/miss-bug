import { utilService } from "./util-service.js"


var gLoggedInUser = utilService.loadFromStorage('USER')

export const userService = {
  login,
  logout,
  getLoggedInUser
}

function login(nickname) {
  return axios.post('/login', { nickname })
    .then(res => res.data)
    .then(user => {
      gLoggedInUser = user
      utilService.saveToStorage('USER', user)
      return user
    })

}

function logout() {
  return axios.post('/logout')
    .then(res => res.data)
    .then(() => {
      gLoggedInUser = null
      utilService.deleteFromStorage('USER')
    })
}

function getLoggedInUser() {
  return Promise.resolve(gLoggedInUser)
}