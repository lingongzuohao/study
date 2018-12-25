import Vue from 'vue'
import Router from 'vue-router'
import Menu from './assets/js/menu'

Vue.use(Router)

let routes = []

Menu.forEach(item => {
  let fileUrl = item.path === '/' ? 'index' : item.path.slice(1)
  let children = []

  let route = {
    path: item.path,
    name: item.name,
    component: () => import(`./views/${fileUrl}.vue`),
  }

  // if(item.children instanceof Array && item.children.length > 0) {
  //   item.children.forEach(child => {
  //     children.push({
  //       path: child.path,
  //       name: child.name,
  //       component: () => import(`./views/${child.meta.path}.vue`)
  //     })
  //   })

  //   route.children = children
  // }

  routes.push(route)
})

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    {
      path: '*',
      redirect: '/'
    }
  ]
})
