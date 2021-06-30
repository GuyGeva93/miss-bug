export default {
  props: ['bug', 'user'],
  template: `
  <section class="bug-preview" v-if="user && bug">
    <article>
      <p>Title: {{bug.title}}</p>
      <p>Description: {{bug.description}}</p>
      <p>Severity: {{bug.severity}}</p>
      <p>Creator: {{bug.creator.fullname}}</p>
    </article>
    <aside v-if="isNicknameMatch">
      <button @click="deletedBug(bug._id)">✖</button>
      <router-link :to="'/bug-edit/' +bug._id" >Edit</router-link>
    </aside>
  </section>
  `,
  computed: {
    isNicknameMatch() {
      return (this.bug.creator.username === this.user.username)
    }
  },
  methods: {
    deletedBug(bugId) {
      this.$emit('deletedBug', bugId)
    },
  },


}

