import { render } from "@testing-library/react";
import { AuthButton } from "@/components/auth-button";

describe("AuthButton", () => {
  test("renders AuthButton with children", () => {
    const { getByRole } = render(
      <AuthButton>Login to your account</AuthButton>
    );
    expect(
      getByRole("button", { name: "Login to your account" })
    ).toBeDefined();
  });
});
