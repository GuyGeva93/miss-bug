export default {
  template: `
   <header class="app-header">
      <div class="logo">
        <h1>MissBug</h1>
      </div>
      <nav class=nav-bar>
        <router-link to='/'>Home</router-link> |
        <router-link to='/profile'>My profile</router-link> |
        <router-link to="/bug-app">Bugs</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
  </header>
  `,
}