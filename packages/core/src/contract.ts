export type Routes = Route[];

export interface Route<TComponent = any, TActionContext = any, TActionResult = any> {
  path: string;
  redirectTo?: string;
  component?: TComponent;
  action?: (ctx: TActionContext) => TActionResult;
  children?: Routes;

  name?: string;
}
