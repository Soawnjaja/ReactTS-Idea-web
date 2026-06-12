import { useParams } from 'react-router-dom'
import { getEditIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { LinkButton } from '../../Components/Button'
import format from 'date-fns/format'
import css from './index.module.scss'
import { Segment } from '../../Components/Segment'
import { useMe } from '../../lib/ctx'
export const ViewIdeaPage = () => {
  const { nick } = useParams() as { nick: string }

  const getIdeaResult = trpc.getIdea.useQuery({ nick })
  const me = useMe()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (!getIdeaResult.data?.idea) {
    return <div>Not found</div>
  }

  const idea = getIdeaResult.data.idea

  return (
    <Segment title={idea.name} description={idea.description}>
      {me?.id === idea.authorId && (
        <div className={css.editAction}>
          <LinkButton to={getEditIdeaRoute({ nick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
      <div className={css.createdAt}>Created at: {format(idea.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Author: {idea.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
    </Segment>
  )
}
