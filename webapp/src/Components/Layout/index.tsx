import { Link, Outlet } from 'react-router-dom'
import { getAllIdeasRoute } from '../../lib/routes'
import css from './index.module.scss'
export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <b className={css.logo}> IDEAAPP</b>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllIdeasRoute()}>
              All Ideas
            </Link>
          </li>
        </ul>
      </div>
      <hr />

      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
