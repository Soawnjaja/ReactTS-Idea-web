import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'
import { Segment } from '../../Components/Segment'

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
    <Segment title={idea.name} description={idea.description}>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
    </Segment>
  )
}
