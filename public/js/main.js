import bugApp from "./pages/bug-app.js"

const options = {
  el: '#app',
  // router:
  template: `
    <section>
      <bug-app />
    </section>
  
  `,
  components: {
    bugApp,
  },
}

const app = new Vue(options)