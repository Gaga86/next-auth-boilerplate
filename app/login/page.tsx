import React, { createElement } from 'react';
import { LoginForm } from "@/app/_components/auth/login-form";
import { Button } from "@/app/_components/ui/button"
import { Separator } from "@/app/_components/ui/separator"
import { signIn } from "@/auth"
import { Apple, Facebook, Github, Gmail, Linkedin, MailRu, TikTok, Twitter, Instagram, VKontakte } from "@/app/_components/ui/icons"

export default function SignIn() {

  const providers = [
    { display: 'Apple', icon: Apple },
    { display: 'Facebook', icon: Facebook },
    { display: 'GitHub', icon: Github },
    { display: 'Google', icon: Gmail },
    { display: 'LinkedIn', icon: Linkedin },
    { display: 'MailRu', icon: MailRu },
    { display: 'TikTok', icon: TikTok },
    { display: 'Twitter', icon: Twitter },
    { display: 'Instagram', icon: Instagram },
    { display: 'Vk', icon: VKontakte },
  ]

  const mappedProviders = providers.map(({ display, icon }) => {
    return {
      name: display.toLowerCase(),
      display,
      icon
    }
  })

  return (
    <div className="max-w-md mx-auto space-y-6 p-6 bg-background rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-muted-foreground">Choose your preferred sign-in method</p>
      </div>

      <div className="flex flex-col space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
        {mappedProviders.map(({ name, display, icon }) => (
          <form
            key={name}
            action={async () => {
              "use server"
              await signIn(name)
            }}
          >
            <Button variant="outline" className="w-full">
              {icon && <div className="mr-2 h-4 w-4">{createElement(icon)}</div>}
              {display}
            </Button>
          </form>
        ))}
      </div>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted-foreground">
          Or
        </span>
      </div>

      <LoginForm />
    </div>
  )
}