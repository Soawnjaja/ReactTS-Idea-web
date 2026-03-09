import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
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
      <h1>{idea.name}</h1>
      <p>{idea.description}</p>
      <div dangerouslySetInnerHTML={{ __html: idea.text }} />
    </div>
  )
}
