import {describe, expect} from '@jest/globals'
import {PathResolver, Route, Routes} from '@dwfe/path-resolver'

const routes: Routes = [
  {
    path: '', component: '/', children: [
      {path: '', component: '/'},
      {
        path: 'books', component: '/books', children: [
          {
            path: ':year/:genre', component: '/books/:year/:genre',
            redirectTo: '/auto', name: '/auto'
          },
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
      {path: 'user/:name', component: '/team/:id/user/:name'},
      {
        path: 'hr', component: '/team/:id/hr',
        redirectTo: 'user/:name', name: '/team/:id/user/:name'
      }
    ]
  },
  {
    path: 'auto', component: '/auto', children: [
      {path: '', component: '/auto'},
      {path: ':color', component: '/auto/:color'},
      {
        path: 'check-redirect', component: '/auto/check-redirect',
        redirectTo: '', name: '/auto'
      }
    ]
  }
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
    test(`redirectTo`, () => {
      traverse(pathResolver.routes, (route: Route) => {
        const redirectTo = route.redirectTo
        if (typeof redirectTo === 'string') {
          if (redirectTo === '')
            expect(redirectTo).not.toEqual(route.name)
          else if (redirectTo[0] === '/')
            expect(redirectTo).toEqual(route.name)
          else
            expect(route.redirectTo).not.toEqual(route.name)
        }
      })
    })
  })

})

const traverse = (routes: Routes, fn) => {
  if (!routes)
    return;

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    fn(route,)
    traverse(route.children, fn)
  }
}
