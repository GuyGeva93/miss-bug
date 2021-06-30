import bugPreview from '../cmps/bug-preview.js'
import addBug from "../cmps/add-bug.js"
import { bugService } from '../services/bug-service.js'
import { userService } from '../services/user-service.js'

export default {
  template: `
   <section class="bug-app-comp">
      <div class="add-user">
        <add-bug @addBug="addBug" />
      </div>
      <div class="bug-app">
        <div v-for="bug in bugs">
          <bug-preview :bug="bug" :user="user" @deleteBug="deleteBug" />
        </div>
      </div>
   </section>
    `,
  data() {
    return {
      bugs: null,
      user: null
    }
  },

  methods: {
    loadBugs() {
      bugService.query()
        .then(bugs => this.bugs = bugs)
    },

    deleteBug(bugId) {
      bugService.remove(bugId)
        .then(() => this.loadBugs())
    },

    addBug(newBug) {
      bugService.save(newBug)
        .then(() => this.loadBugs())
        .catch(err => console.log('Issue:', err))
    },
  },
  created() {
    this.loadBugs()
    userService.getLoggedInUser()
      .then(user => this.user = user)
  },
  components: {
    bugPreview,
    addBug,
  }
}