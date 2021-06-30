export default {
  props: ['bug', 'user'],
  template: `
  <section class="bug-preview" v-if="user && bug">
    <article>
      <p>Title: {{bug.title}}</p>
      <p>Description: {{bug.description}}</p>
      <p>Severity: {{bug.severity}}</p>
      <p>Creator: {{bug.creator.nickname}}</p>
    </article>
    <aside v-if="isNicknameMatch">
      <button @click="deletedBug(bug._id)">✖</button>
      <router-link :to="'/bug-edit/' +bug._id" >Edit</router-link>
    </aside>
  </section>
  `,
  computed: {
    isNicknameMatch() {
      return (this.bug.creator.nickname === this.user.nickname)
    }
  },
  methods: {
    deletedBug(bugId) {
      this.$emit('deletedBug', bugId)
    },
  },

}