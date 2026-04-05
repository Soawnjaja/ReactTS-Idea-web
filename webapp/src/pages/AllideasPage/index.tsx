import { getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Link } from 'react-router-dom'
import { Segment } from '../../Components/Segment'
import css from './index.module.scss'

export const AllIdeasPage = () => {
  const { data, isLoading, error } = trpc.getIdeas.useQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error {error.message}</div>
  }

  const ideas = data?.ideas ?? []
  return (
    <Segment title="All ideas">
      <div className={css.ideas}>
        {ideas.map((idea) => (
          <div className={css.idea} key={idea.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.ideaLink} to={getViewIdeaRoute({ nick: idea.nick })}>
                  {idea.name}
                </Link>
              }
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
