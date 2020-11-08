import {Route, Routes} from './contract'

export class PathResolver {
  routes: Routes = [];

  constructor(routes: Routes) {
    routes.forEach(r => {
      const route = {...r}

      // Step 1. All root paths get a prefix '/'
      route.path = '/' + route.path

      // Step 2. All children paths are obtained as follows:
      //         [full parent path] + '/' + [child path]
      route.children = initChildren(route)

      this.routes.push(route)
    })
  }


  traverse(parent: Route, routes: Routes) {

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i]
      const {children} = route

      //
      // check: is match?
      //
      if (children) {
        this.traverse(route, children)
      }
    }
  }
}

const initChildren = ({path: parentPath, children: routes}: Route): Routes | undefined => {
  if (!routes)
    return;

  const children: Routes = []
  for (let i = 0; i < routes.length; i++) {
    children.push({...routes[i]})
    const route = children[i]
    if (route.path === '') {
      route.path = parentPath
    } else {
      const prefix = parentPath === '/' ? '' : parentPath
      route.path = prefix + '/' + route.path
    }
    route.children = initChildren(route)
  }
  return children
}
