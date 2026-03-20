import type { FormikProps } from 'formik'

type TextAreaProps<T extends Record<string, string>> = {
  name: Extract<keyof T, string>
  label: string
  formik: FormikProps<T>
}

export const TextArea = <T extends Record<string, string>>({ name, label, formik }: TextAreaProps<T>) => {
  const value = formik.values[name]
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value)
        }}
        value={value}
        name={name}
        id={name}
      />
    </div>
  )
}
