import cn from 'classnames'
import type { FormikProps } from 'formik'
import css from './index.module.scss'

type NewIdeaFormValues = {
  name: string
  nick: string
  description: string
  text: string
}
type InputProps = {
  name: keyof NewIdeaFormValues
  label: string
  formik: FormikProps<NewIdeaFormValues>
}
export const Input = ({ name, label, formik }: InputProps) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const invalid = !!touched && !!error
  const disabled = formik.isSubmitting

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <br />
      <input
        className={cn({
          [css.input]: true,
          [css.invalid]: invalid,
        })}
        type="text"
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          void formik.setFieldTouched(name)
        }}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {invalid ? <div style={{ color: 'red' }}>{error}</div> : null}
    </div>
  )
}
