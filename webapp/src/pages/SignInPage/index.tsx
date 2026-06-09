import { zSignInTrpcInput } from '@fullstackts/backend/src/router/signIn/input'
import Cookies from 'js-cookie'
import { Button } from '../../Components/Button'
import { FormItems } from '../../Components/FormItems'
import { Input } from '../../Components/Input'
import { Segment } from '../../Components/Segment'
import { trpc } from '../../lib/trpc'
import { useNavigate } from 'react-router-dom'
import * as routes from '../../lib/routes'
import { Alert } from '../../Components/Alert'
import { useForm } from '../../lib/form'

export const SignInPage = () => {
  const navigate = useNavigate()
  const signIn = trpc.signIn.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values)
      Cookies.set('token', token, { expires: 9999 })
      navigate(routes.getAllIdeasRoute())
    },
    resetOnSuccess: false,
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
