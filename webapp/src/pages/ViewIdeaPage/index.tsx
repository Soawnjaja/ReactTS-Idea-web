import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewIdeaPage = () => {
  const { id } = useParams() as { id: string }
  const ideaQuery = trpc.getIdea.useQuery({
    id,
  })
  if (ideaQuery.isLoading || ideaQuery.isFetching) {
    return <span>Loading...</span>
  }
  if (ideaQuery.isError) {
    return <span>Error: {ideaQuery.error.message}</span>
  }
  if (!ideaQuery.data) {
    return <div>Not found</div>
  }
  const { idea } = ideaQuery.data

  return (
    <div>
      <h1 className={css.title}>{idea.name}</h1>
      <p className={css.description}>{idea.description}</p>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
    </div>
  )
}
