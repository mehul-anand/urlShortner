import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as Yup from "yup";
import useFetchHook from "@/hooks/useFetchHook";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router";
import { UrlState } from "@/context";

function Login() {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const userLink = searchParams.get("shorten");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const {
    data,
    error,
    loading,
    hookFunc: loginFunc,
  } = useFetchHook(login, formData);

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${userLink ? `shorten=${userLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleLogin = async () => {
    // setIsloading(true)
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(7, "Need atleast 7 characters")
          .required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      // api call with custom hook
      await loginFunc();
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    } finally {
      //  setTimeout(setIsloading(false),2000)
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>with your email and password</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1 mb-2">
            <Input
              name="email"
              type="email"
              placeholder="Enter your e-mail"
              className="border-2"
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1 mt-2">
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="border-2"
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {loading ? <BeatLoader size={10} /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
