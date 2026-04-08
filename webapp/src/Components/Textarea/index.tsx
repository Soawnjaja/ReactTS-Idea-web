import cn from 'classnames'
import type { FormikProps } from 'formik'
import css from './index.module.scss'
type TextAreaProps<T extends Record<string, string>> = {
  name: Extract<keyof T, string>
  label: string
  formik: FormikProps<T>
  maxWidth?: number
}

export const TextArea = <T extends Record<string, string>>({ name, label, formik, maxWidth }: TextAreaProps<T>) => {
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
      <textarea
        className={cn({
          [css.input]: true,
          [css.invalid]: invalid,
        })}
        style={{ maxWidth }}
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
      {invalid && <div className={css.error}>{error}</div>}
    </div>
  )
}
