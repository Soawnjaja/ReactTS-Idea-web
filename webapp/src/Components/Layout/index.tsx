import { Link, Outlet } from 'react-router-dom'
import * as routes from '../../lib/routes'
import css from './index.module.scss'
import { trpc } from '../../lib/trpc'
export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery()
  const me = data?.me
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <b className={css.logo}> IDEAAPP</b>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={routes.getAllIdeasRoute()}>
              All Ideas
            </Link>
          </li>
          {isLoading || isFetching || isError ? null : me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={routes.getNewIdeaRoute()}>
                  Add Idea
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignOutRoute()}>
                  Log Out ({me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignUpRoute()}>
                  Sign Up
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignInRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <hr />

      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
