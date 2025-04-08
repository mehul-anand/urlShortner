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
import { signUp } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router";
import { UrlState } from "@/context";

function Signup() {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    profile_pic: null,
  });
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const userLink = searchParams.get("shorten");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    data,
    error,
    loading,
    hookFunc: signupFunc,
  } = useFetchHook(signUp, formData);

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${userLink ? `shorten=${userLink}` : ""}`);
      fetchUser();
    }
  }, [loading, error]);

  const handleSignup = async () => {
    // setIsloading(true)
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name:Yup.string().required("Name is required"),
        email: Yup.string()
          .email("invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(7, "Need atleast 7 characters")
          .required("Password is required"),
        profile_pic:Yup.mixed().required("Profile pic is required")
      });
      await schema.validate(formData, { abortEarly: false });
      // api call with custom hook
      await signupFunc();
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
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create a new account if you haven&rsquo;t yet
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1 mb-2">
            <Input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="border-2"
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>
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
          <div className="space-y-1 mt-2">
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              className="border-2"
              onChange={handleInputChange}
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup}>
            {loading ? <BeatLoader size={10} /> : "Create Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
