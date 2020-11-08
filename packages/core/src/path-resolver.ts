import {compile, match} from 'path-to-regexp'
import {PathResolveResult, Route, Routes} from './contract'

export class PathResolver {
  routes: Routes = [];

  constructor(routes: Routes) {
    routes.forEach(r => {
      const route: Route = {...r}

      // Step 1. All root paths get a prefix '/'
      route.path = '/' + route.path
      route.redirectTo = init.redirectTo(route.redirectTo, '/')

      // Step 2. All children paths are obtained as follows:
      //         [full parent path] + '/' + [child path]
      route.children = init.children(route)

      this.routes.push(route)
    })
  }

  resolve(pathname: string): PathResolveResult | undefined {
    return this.find(pathname, this.routes)
  }

  find(pathname: string, routes: Routes | undefined): PathResolveResult | undefined {
    if (!routes)
      return;

    for (let i = 0; i < routes.length; i++) {
      const route = {...routes[i]}
      const matching = match(route.path)(pathname)
      let params;
      if (matching) {
        params = matching.params
        if (route.redirectTo) {
          route.redirectTo = compile(route.redirectTo)(params)
        }
        route.path = pathname
        return {route, params}
      }
      const found = this.find(pathname, route.children)
      if (found)
        return found
    }
  }

}

const init = {
  redirectTo: (redirectTo, parentPath) => {
    if (typeof redirectTo === 'string') {
      if (redirectTo === '')
        return parentPath
      if (redirectTo[0] === '/')
        return redirectTo
      else
        return parentPath + '/' + redirectTo
    }
  },
  children: function ({path: parentPath, children: routes}: Route): Routes | undefined {
    if (!routes)
      return;

    const children: Routes = []
    for (let i = 0; i < routes.length; i++) {
      const route = {...routes[i]}
      children.push(route)

      const {path} = route
      if (path === '') {
        route.path = parentPath
      } else {
        const prefix = parentPath === '/' ? '' : parentPath
        route.path = prefix + '/' + path
      }
      route.redirectTo = this.redirectTo(route.redirectTo, parentPath)
      route.children = this.children(route)
    }
    return children
  },
}
