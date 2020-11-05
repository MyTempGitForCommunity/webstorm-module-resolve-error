import {Path} from 'path-to-regexp'

export type Routes = Route[];

export interface Route<TComponent = any, TActionContext = any, TActionResult = any> {
  path: Path;
  component?: TComponent;
  action?: (ctx: TActionContext) => TActionResult;
  redirectTo?: Path;
  children?: Routes;
}
