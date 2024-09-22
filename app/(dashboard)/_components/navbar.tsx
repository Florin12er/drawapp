"use client";
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/mode-toggle";
import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
  const { organization } = useOrganization();
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-x-4 p-5 border-b border-zinc-300">
      <div className="hidden lg:flex lg:flex-1 relative">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
                backgroundColor: theme === "dark" ? "#1F2937" : "#E5E7EB",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border:
                  theme === "dark" ? "1px solid #374151" : "1px solid #E5E7EB",
                justifyContent: "space-between",
                color: theme === "dark" ? "#E5E7EB" : "#1F2937",
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#374151" : "#E5E7EB",
                  color: theme === "dark" ? "#E5E7EB" : "#1F2937",
                },
              },
            },
          }}
        />
      </div>

      {organization && (
        <div className="flex">
          <InviteButton />
        </div>
      )}
      <div className="flex justify-center">
        <UserButton />
      </div>

      <ModeToggle />
    </div>
  );
};
