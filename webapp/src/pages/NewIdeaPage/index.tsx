import { Alert } from '../../Components/Alert'
import { FormItems } from '../../Components/FormItems'
import { Segment } from '../../Components/Segment'
import { Input } from '../../Components/Input'
import { TextArea } from '../../Components/Textarea'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@fullstackts/backend/src/router/createIdea/input'
import { Button } from '../../Components/Button'
import { useForm } from '../../lib/form'

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateIdeaTrpcInput,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Idea created!',
  })

  return (
    <Segment title="New Idea">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} />
          <TextArea name="text" label="Text" formik={formik} maxWidth={500} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
