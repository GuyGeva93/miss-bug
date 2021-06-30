import { bugService } from "../services/bug-service.js"
import { userService } from "../services/user-service.js"

export default {
  props: [],
  template: `
  <section class="user-details" v-if="isLogin">
    <section v-for="bug in bugs" :key="bug._id" class="user-deatils-bugs">
      <p>Hello {{bug.creator.fullname}}</p>
      <p>Your bugs count: {{countBugs}}</p>
    </section>
  </section>
  
  `,
  data() {
    return {
      bugs: null,
      user: this.isLogin(),
      // bugsCount: this.countBugs()
    }
  },

  methods: {
    loadBugs() {
      bugService.query()
        .then(bugs => this.bugs = bugs)
    },
    isLogin() {
      userService.getLoggedInUser()
        .then(user => this.user = user)

    },

  },

  computed: {
    countBugs() {
      console.log(this.user);
      const count = this.bugs.filter(bug => {
        return this.user.username === bug.creator.username
      })
      return count.length
    },
  },

  created() {
    this.loadBugs()
  },
  components: {
    bugService,
    userService
  },

}