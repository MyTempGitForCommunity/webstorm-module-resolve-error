import {describe, expect} from '@jest/globals'
import {PathResolver, Route, Routes} from '@dwfe/path-resolver'

const routes: Routes = [
  {
    path: '', component: '/', children: [
      {path: '', component: '/'},
      {
        path: 'books', component: '/books', children: [
          {path: ':year/:genre', component: '/books/:year/:genre'},
          {path: '(.*)', component: '/books/(.*)'}
        ]
      }
    ]
  },
  {
    path: 'team/:id', component: '/team/:id', children: [
      {
        path: '', component: '/team/:id', children: [
          {path: 'user/:name', component: '/team/:id/user/:name'}
        ]
      },
      {path: 'users', component: '/team/:id/users'},
      {path: 'user/:name', component: '/team/:id/user/:name'}
    ]
  },
]

describe(`tests`, () => {

  describe(`init`, () => {
    const pathResolver = new PathResolver(routes)
    test(`clone routes and change`, () => {
      traverse(routes, (route: Route) => {
        expect(route.path).not.toEqual(route.component)
      })
    })
    test(`paths construction`, () => {
      traverse(pathResolver.routes, (route: Route) => {
        expect(route.path).toEqual(route.component)
      })
    })
  })

})

const traverse = (routes: Routes, fn) => {
  if (!routes)
    return;

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    fn(route)
    traverse(route.children, fn)
  }
}
