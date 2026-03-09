import { Link, Outlet } from 'react-router-dom'
import { getAllIdeasRoute } from '../../lib/routes'

export const Layout = () => {
  return (
    <div>
      <p>
        <b>ID</b>
      </p>
      <ul>
        <li>
          <Link to={getAllIdeasRoute()}>All Ideas</Link>
        </li>
      </ul>
      <hr />

      <div>
        {/* прокинет сюда то что обернуто этим лейаутом */}
        <Outlet />
      </div>
    </div>
  )
}
