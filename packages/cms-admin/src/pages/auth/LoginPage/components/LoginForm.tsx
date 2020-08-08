import { set } from "lodash";
import React, { ChangeEvent, useState } from "react";
import { Form, InputOnChangeData } from "semantic-ui-react";
import { TEXT } from "src/constants/contents";
import focusErrorField from "src/utils/focusErrorField";

interface Field {
  value: string;
  error: string;
}

type LoginFormFieldKey = "username" | "password"
type LoginFormFields = Record<LoginFormFieldKey, Field>

interface LoginFormProps {
  onSubmit?: (form: LoginFormFields) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [form, setForm] = useState<LoginFormFields>({
    username: { value: "", error: "" },
    password: { value: "", error: "" }
  });

  const onFieldChange = (e: ChangeEvent, { name, value }: InputOnChangeData) => {
    setForm(form => ({ ...form, [name]: { value, error: "" } }));
  };

  const checkAndUpdateField = (field: LoginFormFieldKey) => {
    if (form[field].value) return true;
    setForm(set({ ...form }, [field, "error"], TEXT.REQUIRED_MESSAGE));
    return false;
  };

  const onSubmit = () => {
    let hasError = false;
    Object.keys(form).forEach((field) => {
      const isValid = checkAndUpdateField(field as LoginFormFieldKey);
      if (!isValid) hasError = true;
    });
    if (hasError) return focusErrorField();
    props.onSubmit?.(form);
  };

  const renderInputField = (type: string, key: LoginFormFieldKey, label: string) => (
    <Form.Input label={label}
      name={key}
      placeholder={label}
      data-testid={`${key}-input`}
      type={type}
      required
      value={form[key].value}
      error={form[key].error || undefined}
      onBlur={() => checkAndUpdateField(key)}
      onChange={onFieldChange} />
  );

  return <Form onSubmit={onSubmit} noValidate>
    {renderInputField("text", "username", "Username")}
    {renderInputField("password", "password", "Password")}
    <Form.Button content="Login" />
  </Form>;
};

export default LoginForm;
