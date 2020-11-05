import {describe, expect} from '@jest/globals'
import {PathResolver, Routes} from '@dwfe/path-resolver'

const routes: Routes = [
  {path: '', component: '/[index]', children: [
      {path: '', component: '/[index 2]'},
      {path: '/books', component: '/books[index]', children: [
          {path: '/:id', component: '/books/:id'},
          {path: '', component: '/books[index 2]'}
        ]}
    ]
  },
  {path: '/', component: '/[index 3]'},
]

describe(`traverse`, () => {
  test(`test`, () => {
    const pathResolver = new PathResolver(routes)
    pathResolver.traverse()
    expect(pathResolver.test).toEqual('hello world')
  })
})
