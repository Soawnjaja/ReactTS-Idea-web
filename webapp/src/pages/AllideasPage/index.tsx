import { trpc } from '../../lib/trpc'

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
          <h2>{idea.name}</h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}
