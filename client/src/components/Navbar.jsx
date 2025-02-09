import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "../DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Navbar() {
  let { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess, isError }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    logoutUser();
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User Logged Out ");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-10 duration-300 pt-2 ">
      {/* Desktop */}
      <div className=" max-w-7xl mx-auto hidden md:flex md:gap-4 justify-between items-center">
        <div className="flex items-center">
          <School size={"30px"} />
          <Link to="/">
            <h1 className="hidden md:block text-2xl font-extrabold ">
              E-learning
            </h1>
          </Link>
        </div>
        {/* User icon and dark mode */}
        <div className="flex gap-2">
          {user ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Button variant="outline">Open</Button> */}
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profilePhoto || "https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to={"my-learning"}>My Learning</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={"profile"}>Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {user.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate("/admin/dashboard")}
                        className="bg-purple-400 m-2 flex items-center justify-center font-semibold"
                      >
                        Dashboard
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="text-2xl font-extrabold">E-Learning</h1>
        <MobileNavbar />
      </div>
    </div>
  );
}

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor";

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-gray-200 hover:bg-gray-200"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>E-Learning </SheetTitle>
            <DarkMode />
          </SheetHeader>
          <Separator className="mr-2" />
          <nav className="flex flex-col space-y-4">
            <span>My Learning</span>
            <span>Edit Profile</span>
            <p>Log out</p>
          </nav>
          {role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className="w-full mt-4">
                  Dashboard
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
