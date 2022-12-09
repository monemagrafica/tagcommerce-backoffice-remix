import { useField, useControlField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  label: string;
  type: string;
};

export const InputForm = ({ name, label, type }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  const [value, setValue] = useControlField<string>(name);
  console.log(value);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...getInputProps({ type: type, id: name })}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {error && <span className="my-error-class">{error}</span>}
    </div>
  );
};
