import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { act, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isSuccess: registerIsSuccess,
      isLoading: registerIsLoading,
    },
  ] = useRegisterUserMutation();
  const [
    loggedInUser,
    {
      data: loggedInData,
      error: loggedInError,
      isSuccess: loggedInIsSuccess,
      isLoading: loggedInIsLoading,
    },
  ] = useLoginUserMutation();

  const changeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupData({ ...signupData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };
  const handleSubmit = async (type) => {
    const data = type === "signup" ? signupData : loginData;
    const action = type === "signup" ? registerUser : loggedInUser;
    console.log(action);

    await action(data);
  };
  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup success");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup failed");
    }
    if (loggedInIsSuccess && loggedInData) {
      toast.success(loggedInData.message || "Login success");
      navigate("/");
    }
    if (loggedInError) {
      toast.error(loggedInError.data.message || "Login failed");
    }
  }, [
    loggedInIsLoading,
    registerIsLoading,
    loggedInData,
    registerData,
    loggedInError,
    registerError,
  ]);

  return (
    <div className="flex mt-24 items-center w-full justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Register your account here !</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Abcd"
                  value={signupData.name}
                  onChange={(e) => changeHandler(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => changeHandler(e, "signup")}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Abcd@gmail.com"
                  value={signupData.email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => changeHandler(e, "signup")}
                  name="password"
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={signupData.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleSubmit("signup")}
              >
                {registerIsLoading ? (
                  <div>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin">
                      Please wait
                    </Loader2>
                  </div>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Already registered. Login here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => changeHandler(e, "login")}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="abcd@gmail.com"
                  value={loginData.email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password"> Password</Label>
                <Input
                  onChange={(e) => changeHandler(e, "login")}
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loggedInIsLoading}
                onClick={() => handleSubmit("login")}
              >
                {loggedInIsLoading ? (
                  <div>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin">
                      Please wait
                    </Loader2>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
