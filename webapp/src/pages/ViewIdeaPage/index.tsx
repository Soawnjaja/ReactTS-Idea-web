import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'
import { Segment } from '../../Components/Segment'

export const ViewIdeaPage = () => {
  const { nick } = useParams() as { nick: string }
  const ideaQuery = trpc.getIdea.useQuery({
    nick,
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
  if (!idea) {
    return <div>Not found</div>
  }
  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
    </Segment>
  )
}
