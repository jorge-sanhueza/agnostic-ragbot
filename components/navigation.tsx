import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex container h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#D42B22] rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="text-xl font-semibold text-zinc-700">Chat</span>
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/chat">
              <Button
                variant="ghost"
                className="text-zinc-600 hover:text-zinc-700 hover:bg-zinc-100"
              >
                Chat
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
              <SignOutButton>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400"
                >
                  Salir
                </Button>
              </SignOutButton>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="text-zinc-600 hover:text-zinc-700 hover:bg-zinc-100"
                >
                  Ingresar
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#D42B22] hover:bg-[#b3241d] text-white border border-transparent hover:border-[#D42B22] focus:ring-2 focus:ring-[#D42B22] focus:ring-opacity-50 shadow-sm"
                >
                  Empezar
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};
