import { signInWithGitHub } from "@/server-actions";

export function SignIn() {
  return (
    <form action={signInWithGitHub}>
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
