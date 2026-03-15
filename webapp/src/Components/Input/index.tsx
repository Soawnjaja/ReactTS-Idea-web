type InputProps<T extends Record<string, string>> = {
  name: Extract<keyof T, string>
  label: string
  state: T
  setState: React.Dispatch<React.SetStateAction<T>>
}

export const Input = <T extends Record<string, string>>({ name, label, state, setState }: InputProps<T>) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
        onChange={(e) => {
          setState((prev) => ({ ...prev, [name]: e.target.value }))
        }}
        value={state[name]}
        name={name}
        id={name}
      />
    </div>
  )
}
