import appHeader from './cmps/app-header.js'
import { myRouter } from './routes.js'

const options = {
  el: '#app',
  router: myRouter,
  template: `
    <section>
      <app-header />
      <router-view />
      <footer><p> &copy; Guy Geva</p></footer>
    </section>
  `,
  components: {
    appHeader,
  }
}
const app = new Vue(options)
