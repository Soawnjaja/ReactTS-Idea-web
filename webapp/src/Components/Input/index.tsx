import type { FormikProps } from 'formik'

type InputProps<T extends Record<string, string>> = {
  name: Extract<keyof T, string>
  label: string
  formik: FormikProps<T>
}
export const Input = <T extends Record<string, string>>({ name, label, formik }: InputProps<T>) => {
  const value = formik.values[name]
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
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
