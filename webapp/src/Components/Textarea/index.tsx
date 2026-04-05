import type { FormikProps } from 'formik'

type TextAreaProps<T extends Record<string, string>> = {
  name: Extract<keyof T, string>
  label: string
  formik: FormikProps<T>
}

export const TextArea = <T extends Record<string, string>>({ name, label, formik }: TextAreaProps<T>) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
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
      {!!touched && !!error ? <div style={{ color: 'red' }}>{error}</div> : null}
    </div>
  )
}
