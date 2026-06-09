import type { TrpcRouterOutput } from '@fullstackts/backend/src/router'
import { zUpdateIdeaTrpcInput } from '@fullstackts/backend/src/router/updateIdea/input'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../Components/Alert'
import { Button } from '../../Components/Button'
import { FormItems } from '../../Components/FormItems'
import { Input } from '../../Components/Input'
import { Segment } from '../../Components/Segment'

import { TextArea } from '../../Components/Textarea'
import { trpc } from '../../lib/trpc'
import { useForm } from '../../lib/form'
import { getViewIdeaRoute } from '../../lib/routes'

const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const navigate = useNavigate()
  const updateIdea = trpc.updateIdea.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: idea.name,
      nick: idea.nick,
      description: idea.description,
      text: idea.text,
    },
    validationSchema: zUpdateIdeaTrpcInput.omit({ id: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ id: idea.id, ...values })
      navigate(getViewIdeaRoute({ nick: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })
  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <TextArea name="text" label="Text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditIdeaPage = () => {
  const { nick } = useParams() as { nick: string }

  const getIdeaResult = trpc.getIdea.useQuery({
    nick,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getIdeaResult.data) {
    return <span>Idea not found</span>
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea
  const me = getMeResult.data?.me

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== idea.authorId) {
    return <span>An idea can only be edited by the author</span>
  }

  return <EditIdeaComponent idea={idea} />
}
