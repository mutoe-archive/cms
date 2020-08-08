import { render } from "@testing-library/react";
import React from "react";
import focusErrorField from "src/utils/focusErrorField";

describe("# focus error field util", () => {
  const Wrapper: React.FC = () => (<div className="error field">
    <input type="text" data-testid="input" />
  </div>);

  it("should focus on first error field input", () => {
    const { getByTestId } = render(<Wrapper />);
    focusErrorField();

    expect(document.activeElement).toEqual(getByTestId("input"));
  });
});
