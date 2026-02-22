import { TrpcProvider } from './lib/trpc'

export const AllIdeasPage = () => {
  const ideas = [
    { id: 'ideanick1', name: 'Idea1', description: 'Description idea1 ...' },
    { id: 'ideanick2', name: 'Idea2', description: 'Description idea2 ...' },
    { id: 'ideanick3', name: 'Idea3', description: 'Description idea3 ...' },
    { id: 'ideanick4', name: 'Idea4', description: 'Description idea4 ...' },
    { id: 'ideanick5', name: 'Idea5', description: 'Description idea5 ...' },
  ]
  return (
    <div>
      {ideas.map((idea) => {
        return (
          <div key={idea.id}>
            <h1>IDEAS</h1>
            <div>
              <h2>{idea.name}</h2>
              <p>{idea.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  )
}
