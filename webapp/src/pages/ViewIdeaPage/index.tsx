import { useParams } from 'react-router-dom'

export const ViewIdeaPage = () => {
  const { id } = useParams() as { id: string }
  return (
    <div>
      <h1>{id}</h1>
      <p>Description of idea 1 ....</p>
      <div>
        <p>text paragraph 1 of idea 1...</p>
        <p>text paragraph 1 of idea 2...</p>
        <p>text paragraph 1 of idea 3...</p>
        <p>text paragraph 1 of idea 4...</p>
      </div>
    </div>
  )
}
