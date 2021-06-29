import { bugService } from '../services/bug-service.js'

export default {
  props: [],
  template: `
  <section class="bug-app">
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
          <td>{{bug.severity}}</td>
          <td>{{bug.createdAt}}</td>
          <td>{{bug.creator.nickname}}</td>
        </tr>
      </tbody>
    </table>

  </section>
  `,

  data() {
    return {
      bugs: []
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
    }
  },

  computed: {
    name() {
      return this.data
    }
  },

  created() {
    this.loadBugs()
  },

  destroyed() {
    ;
  },

  components: {
    bugService
  },

}