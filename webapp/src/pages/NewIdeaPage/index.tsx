import { useFormik } from 'formik'
import { Segment } from '../../Components/Segment'
import { Input } from '../../Components/Input'
import { TextArea } from '../../Components/Textarea'
import { z } from 'zod'
import { withZodSchema } from 'formik-validator-zod'

export const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    onSubmit: (values) => {
      console.info('Submitted', values)
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(1),
        nick: z
          .string()
          .min(1)
          .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
        description: z.string().min(1),
        text: z.string().min(100, 'Text should be at least 100 characters long'),
      })
    ),
  })

  return (
    <Segment title="New Idea">
      <form onSubmit={formik.handleSubmit}>
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <TextArea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount ? <div style={{ color: 'red' }}>Some fields are invalid</div> : null}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
