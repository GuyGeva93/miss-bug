import { bugService } from "../services/bug-service.js"

export default {
  template: `
   <section class="bug-edit">
      <div v-if="bug" class="update-bug">
        <div class="edit-prev">
          <p>title: <span>{{bug.title}}</span></p> 
          <p>description: <span>{{bug.description}}</span></p>
          <p>severity: <span>{{bug.severity}}</span></p>
        </div>
      <form @submit.prevent="updateBug">
        <label for="title">Title:</label>
        <input v-model="bug.title" id="title" type="text">
        <label for="description">Description:</label>
        <input v-model="bug.description" id="description" type="text">
        <label for="severity">Severity:</label>
        <select id="severity" v-model="bug.severity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button>SAVE</button>
      </form>
      </div>
    </section>
    `,

  data() {
    return {
      bug: null,
    }
  },

  methods: {
    loadBug() {
      const id = this.$route.params.bugId
      bugService.getById(id)
        .then(bug => {
          this.bug = bug
        })
    },

    updateBug() {
      const bugCopy = JSON.parse(JSON.stringify(this.bug))
      bugService.save(bugCopy).then(() => this.$router.push('/bug-app'))
    }
  },

  created() {
    this.loadBug()
  },

  watch: {
    '$route.params.bugId'() {
      this.loadBug();
    }
  }
}