import bugApp from './pages/bug-app.js'
import homePage from './pages/home-page.js'
// import aboutPage from './pages/about-page.js'
import editBug from './cmps/bug-edit.js'

const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/bug-app',
        component: bugApp,
    },
    {
        path: '/bug-edit/:bugId',
        component: editBug,
    },
    // {
    //     path: '/about',
    //     component: aboutPage,
    // },
]

export const myRouter = new VueRouter({ routes })