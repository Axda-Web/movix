import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from "@storybook/test";
import { Outfit as FontOutfit } from "next/font/google";
import { AuthButton } from "../components/auth-button";

const fontOutfit = FontOutfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "AuthButton",
  component: AuthButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: { control: "text" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //   args: { onClick: fn() },
} satisfies Meta<typeof AuthButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Login: Story = {
  args: {
    children: "Login to your account",
  },
};

export const CreateAccount: Story = {
  args: {
    children: "Create an account",
  },
};
