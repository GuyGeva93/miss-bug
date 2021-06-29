import { bugService } from '../services/bug-service.js'
import { userService } from '../services/user-service.js'

export default {
  props: [],
  template: `
  <section class="bug-app">
    <section v-if="loggedInUser">
      <h2>Hello {{loggedInUser.nickname}}</h2>
    </section>
    <form v-else @submit.prevent="login">
      <input type="text" placeholder="nickname" v-model="nickname" required>
      <button>Login</button>
    </form>
    <section class="bug-app-container">
    <table class="bug-app-table">
      <thead>
        <tr>
          <th>Delete</th>
          <th>Title</th>
          <th>Description</th>
          <th>Severity</th>
          <th>Created at</th>
          <th>Creator</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bug in bugs" :key="bug._id">
          <button @click="removeBug(bug._id)">X</button>
          <td>{{bug.title}}</td>
          <td>{{bug.description}}</td>
          <td class="bug-app-severity">{{bug.severity}}</td>
          <td>{{createdAtFormat(bug._id)}}</td>
          <td>{{bug.creator.nickname}}</td>
        </tr>
      </tbody>
    </table>
    </section>
  </section>
  `,

  data() {
    return {
      bugs: [],
      nickname: 'Guy',
      loggedInUser: userService.getLoggedInUser()
    }
  },

  methods: {
    loadBugs() {
      bugService.query()
        .then(bugs => {
          this.bugs = bugs
        })
    },
    removeBug(bugId) {
      bugService.remove(bugId)
        .then(this.loadBugs)
    },
    createdAtFormat(bugId) {
      const timeToFormat = this.bugs.find(bug => bug._id === bugId)
      const formatted = new Date(timeToFormat.createdAt).toDateString()
      return formatted
    },
    login() {
      userService.login(this.nickname)
        .then(user => this.loggedInUser = user)
    }
  },

  created() {
    this.loadBugs()
  },

  destroyed() {
    ;
  },

  components: {
    bugService,
    userService
  },

}