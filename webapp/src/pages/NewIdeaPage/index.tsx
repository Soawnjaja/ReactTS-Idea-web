import { useFormik } from 'formik'
import { Alert } from '../../Components/Alert'
import { FormItems } from '../../Components/FormItems'
import { Segment } from '../../Components/Segment'
import { Input } from '../../Components/Input'
import { TextArea } from '../../Components/Textarea'
import { withZodSchema } from 'formik-validator-zod'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@fullstackts/backend/src/router/createIdea/input'
import { useState } from 'react'
import { Button } from '../../Components/Button'

export const NewIdeaPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const createIdea = trpc.createIdea.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error) {
        setSubmittingError(error instanceof Error ? error.message : 'Unexpected error')
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
    },
  })

  return (
    <Segment title="New Idea">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} />
          <TextArea name="text" label="Text" formik={formik} maxWidth={500} />
          {!formik.isValid && !!formik.submitCount ? <div style={{ color: 'red' }}>Some fields are invalid</div> : null}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Idea created!</Alert>}
          <Button loading={formik.isSubmitting}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
