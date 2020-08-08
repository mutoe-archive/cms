import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { TEXT } from "src/constants/contents";
import LoginForm from "./LoginForm";

describe("# LoginForm", () => {
  it("should display required error message when blur username field given empty value and clear error when change", async () => {
    const { container, getByPlaceholderText } = render(<LoginForm />);
    const usernameInput = getByPlaceholderText("Username");

    fireEvent.blur(usernameInput);
    expect(container).toHaveTextContent(TEXT.REQUIRED_MESSAGE);

    fireEvent.change(usernameInput, { target: { value: "foo" } });
    expect(container).not.toHaveTextContent(TEXT.REQUIRED_MESSAGE);
  });

  it("should display error message when submit form given empty form", () => {
    const { container, getByText } = render(<LoginForm />);
    const submitButton = getByText("Login");

    fireEvent.click(submitButton);
    expect(container).toHaveTextContent(TEXT.REQUIRED_MESSAGE);
  });

  it("should display all error field and focus empty field when submit form given empty form", () => {
    const { container, getByText, getByPlaceholderText } = render(<LoginForm />);
    const submitButton = getByText("Login");
    const usernameInput = getByPlaceholderText("Username");

    fireEvent.click(submitButton);
    expect(container.querySelectorAll(".error.field")).toHaveLength(2);
    return waitFor(() => expect(document.activeElement).toEqual(usernameInput));
  });

  it("should call onSubmit prop when passed a valid form", () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginForm onSubmit={onSubmit} />);
    fireEvent.change(getByPlaceholderText("Username"), { target: { value: "foo" } });
    fireEvent.change(getByPlaceholderText("Password"), { target: { value: "bar" } });
    fireEvent.click(getByText("Login"));

    expect(onSubmit).toBeCalledTimes(1);
  });
});
