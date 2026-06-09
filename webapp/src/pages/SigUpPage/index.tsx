import { zSignUpTrpcInput } from '@fullstackts/backend/src/router/signUp/input'
import Cookies from 'js-cookie'
import { z } from 'zod'
import { Alert } from '../../Components/Alert'
import { Button } from '../../Components/Button'
import { FormItems } from '../../Components/FormItems'
import { Input } from '../../Components/Input'
import { Segment } from '../../Components/Segment'
import { trpc } from '../../lib/trpc'
import { useNavigate } from 'react-router-dom'
import * as routes from '../../lib/routes'
import { useForm } from '../../lib/form'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()
  const signUp = trpc.signUp.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['passwordAgain'],
          })
        }
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
      navigate(routes.getAllIdeasRoute())
    },
    resetOnSuccess: false,
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
