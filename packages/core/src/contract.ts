export type Routes = Route[];

export interface Route<TComponent = any, TActionContext = any, TActionResult = any> {
  path: string;      // See: https://github.com/pillarjs/path-to-regexp#readme
  redirectTo?: string;
  component?: TComponent;
  action?: (ctx: TActionContext) => TActionResult;
  children?: Routes;

  name?: string;
}

export interface PathResolveResult {
  route: Route;
  params: PathParams
}

export type PathParams = {} | { [key: string]: string; }
