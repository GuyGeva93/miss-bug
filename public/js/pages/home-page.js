import { userService } from "../services/user-service.js"

export default {
  template: `
    <section class="home-page">
        <h1> miss-Bug </h1>
        <section v-if="loggedInUser">
        <h2>Hello {{loggedInUser.fullname}}</h2>
        <button @click="logout">Logout</button>
        </section>
        
        <form v-else @submit.prevent="login">
            <p>Login</p>
        <input type="text" placeholder="username" v-model="credentials.username" />
        <input type="password" placeholder="password" v-model="credentials.password" />
        <button>Login</button>
        </form>
        <form @submit.prevent="signup">
        <p>Signup</p>
        <input type="text" placeholder="username" />
        <!-- v-model="newUser.username" -->
        <input type="password" placeholder="password" />
        <!-- v-model="newUser.password" -->
        <button>Signup</button>
        </form>
    </section>
    `,
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      loggedInUser: null,
      newUser: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      userService.login(this.credentials)
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
  },
  components: {
    userService,
  },
}