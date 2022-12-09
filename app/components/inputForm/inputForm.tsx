import { useField } from "remix-validated-form";

type MyInputProps = {
  name: string;
  label: string;
  type: string;
};

export const InputForm = ({ name, label, type }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...getInputProps({ type: type, id: name })} />
      {error && <span className="my-error-class">{error}</span>}
    </div>
  );
};
