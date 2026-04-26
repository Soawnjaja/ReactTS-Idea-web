import { zSignInTrpcInput } from '@fullstackts/backend/src/router/signIn/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { Alert } from '../../Components/Alert'
import { Button } from '../../Components/Button'
import { FormItems } from '../../Components/FormItems'
import { Input } from '../../Components/Input'
import { Segment } from '../../Components/Segment'
import { trpc } from '../../lib/trpc'
import { useNavigate } from 'react-router-dom'
import * as routes from '../../lib/routes'
export const SignInPage = () => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signIn = trpc.signIn.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        const { token } = await signIn.mutateAsync(values)
        Cookies.set('token', token, { expires: 9999 })
        navigate(routes.getAllIdeasRoute())
      } catch (err: unknown) {
        if (err instanceof Error) {
          setSubmittingError(err.message)
          return
        }

        setSubmittingError('Unexpected error')
      }
    },
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
