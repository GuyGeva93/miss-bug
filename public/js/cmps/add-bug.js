
export default {
  template: `
   <section>
      <form @submit.prevent="addBug">
        <label for="title">Title: 
        <input v-model="newBug.title" id="title" type="text">
        </label>
        <label for="description">Description: 
        <input v-model="newBug.description" id="description" type="text">
        </label>
        <label for="severity">Severity: 
          <select id="severity" v-model="newBug.severity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button>Add bug</button>
      </form>
    </section>
    `,
  data() {
    return {
      newBug: {
        title: '',
        description: '',
        severity: ''
      },
    }
  },

  methods: {
    addBug() {
      const bugCopy = JSON.parse(JSON.stringify(this.newBug))
      bugCopy.createdAt = Date.now()
      this.$emit('addBug', bugCopy)
    }
  },
}