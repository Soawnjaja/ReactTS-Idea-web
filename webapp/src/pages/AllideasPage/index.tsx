import { getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Link } from 'react-router-dom'

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
    <div>
      <h1>All Ideas</h1>
      {ideas.map((idea) => (
        <div key={idea.id}>
          <h2>
            <Link to={getViewIdeaRoute({ id: idea.id })}>{idea.name}</Link>
          </h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}
