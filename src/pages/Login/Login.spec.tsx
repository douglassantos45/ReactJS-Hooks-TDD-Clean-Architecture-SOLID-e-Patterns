import { render } from "@testing-library/react";
import { Login } from "./index";

describe("Name of the group", () => {
  test("should ", () => {
    const { getByText } = render(<Login />);

    expect(getByText("Hello world"));
  });
});
