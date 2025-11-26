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
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex container h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="text-xl font-semibold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            DocChat
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Link href="/chat">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
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
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="default" size="sm">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};
