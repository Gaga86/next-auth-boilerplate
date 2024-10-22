import { logout } from "@/app/_actions/auth";
import { Button } from "@/app/_components/ui/button"

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={logout}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  )
}