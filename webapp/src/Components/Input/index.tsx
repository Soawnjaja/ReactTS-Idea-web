import cn from 'classnames'
import type { FormikProps } from 'formik'
import css from './index.module.scss'

type InputProps<T extends Record<string, string>> = {
  name: Extract<keyof T, string>
  label: string
  formik: FormikProps<T>
  type?: 'text' | 'password'
}
export const Input = <T extends Record<string, string>>({ name, label, formik, type = 'text' }: InputProps<T>) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const invalid = !!touched && !!error
  const disabled = formik.isSubmitting
  const inputName = String(name)

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={inputName}>
        {label}
      </label>
      <br />
      <input
        className={cn({
          [css.input]: true,
          [css.invalid]: invalid,
        })}
        type={type}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          void formik.setFieldTouched(name)
        }}
        value={value}
        name={inputName}
        id={inputName}
        disabled={formik.isSubmitting}
      />
      {invalid ? <div style={{ color: 'red' }}>{error}</div> : null}
    </div>
  )
}
