import {Path} from 'path-to-regexp'
import {Routes} from './contract'

export class PathResolver {

  constructor(private routes: Routes) {
  }

  get test(): string {
    return 'hello world'
  }

  traverse(routes: Routes = this.routes, parentPath: Path = '') {

    for (let i = 0; i < routes.length; i++) {
      const {path, children, component} = routes[i]
      const target = `${parentPath}${path}`
      //
      // check: is match?
      //
      if (children) {
        this.traverse(children, target)
      }
    }

    // (routes || this.routes).map(({path, component, children}) => {
    //   if (children) this.traverse(children)
    //
    // })
  }
}
