import _ from "lodash";
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
  onSubmit?: (form: LoginFormFields) => void
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [form, setForm] = useState<LoginFormFields>({
    username: { value: "", error: "" },
    password: { value: "", error: "" }
  });

  const onFieldChange = (e: ChangeEvent, { name, value }: InputOnChangeData) => {
    setForm(form => ({ ...form, [name]: { value, error: "" } }));
  };

  const checkField = (field: LoginFormFieldKey) => {
    if (!form[field].value) {
      setForm(_.set({ ...form }, [field, "error"], TEXT.REQUIRED_MESSAGE));
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (Object.keys(form).some((field) => checkField(field as LoginFormFieldKey))) {
      focusErrorField()
      return
    };
    props.onSubmit?.(form);
  };

  return <Form onSubmit={onSubmit} noValidate>
    <Form.Input label="Username"
      name="username"
      placeholder="Username"
      data-testid="username-input"
      type="text"
      required
      value={form.username.value}
      onBlur={() => checkField("username")}
      error={form.username.error || undefined}
      onChange={onFieldChange} />
    <Form.Input label="Password" type="password" required value={form.password.value} onChange={onFieldChange} />
    <Form.Button content="Login" />
  </Form>;
};

export default LoginForm;
