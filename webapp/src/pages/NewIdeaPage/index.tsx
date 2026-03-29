import { useFormik } from 'formik'
import { Segment } from '../../Components/Segment'
import { Input } from '../../Components/Input'
import { TextArea } from '../../Components/Textarea'

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
    validate: (values) => {
      const errors: Partial<typeof values> = {}
      if (!values.name) {
        errors.name = 'Name is required'
      }
      if (!values.nick) {
        errors.nick = 'Nick is required'
      } else if (!values.nick.match(/^[a-z0-9-]+$/)) {
        errors.nick = 'Nick may contain only lowercase letters, numbers and dashes'
      }
      if (!values.description) {
        errors.description = 'Description is required'
      }
      if (!values.text) {
        errors.text = 'Text is required'
      } else if (values.text.length < 100) {
        errors.text = 'Text should be at least 100 characters long'
      }
      return errors
    },
  })

  return (
    <Segment title="New Idea">
      <form onSubmit={() => formik.handleSubmit()}>
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <TextArea name="text" label="Text" formik={formik} />
        {!formik.isValid ? <div style={{ color: 'red' }}>Some fields are invalid</div> : null}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
