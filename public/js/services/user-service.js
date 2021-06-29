

var gLoggedInUser = null

export const userService = {
  login,
  getLoggedInUser
}

function login(nickname) {
  return axios.post('/login', { nickname })
    .then(res => res.data)
    .then(user => {
      gLoggedInUser = user
      return user
    })

}

function getLoggedInUser() {
  return gLoggedInUser
}