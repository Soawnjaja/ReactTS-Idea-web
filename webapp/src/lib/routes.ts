type RouteFlags = Record<string, boolean>
type RouteParams<T extends RouteFlags> = Record<keyof T, string>

export function getRouteParams<T extends RouteFlags>(object: T): RouteParams<T> {
  const result = {} as RouteParams<T>

  for (const key of Object.keys(object) as Array<keyof T>) {
    result[key] = `:${String(key)}`
  }

  return result
}
export const getAllIdeasRoute = () => '/'

export const viewIdeaRouteParams = getRouteParams({ id: true })
export type viewIdeaRouteParamsType = typeof viewIdeaRouteParams
export const getViewIdeaRoute = ({ id }: viewIdeaRouteParamsType) => `ideas/${id}`

export const getNewIdeaRoute = () => 'ideas/new'
