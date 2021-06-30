import { userService } from "../services/user-service.js"

export default {
  template: `
    <section class="home-page">
        <h1> miss-Bug </h1>
        <section v-if="loggedInUser">
        <h2>Hello {{loggedInUser.nickname}}</h2>
        <button @click="logout">Logout</button>
        </section>
        <form v-else @submit.prevent="login">
            <p>Enter nickname:</p>
        <input type="text" placeholder="nickname" v-model="nickname" />
        <button>Login</button>
        </form>
    </section>
    `,
  data() {
    return {
      nickname: '',
      loggedInUser: null
    }
  },
  methods: {
    login() {
      userService.login(this.nickname)
        .then(user => {
          this.loggedInUser = user
          this.$router.push('/bug-app')
        })
    },

    logout() {
      userService.logout()
        .then(() => this.loggedInUser = null)
    }
  },
  created() {
    userService.getLoggedInUser()
      .then(user => this.loggedInUser = user)
  }
}