import { UrlState } from "@/context";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import * as yup from "yup";
import useFetchHook from "@/hooks/useFetchHook";
import { QRCode } from "react-qrcode-logo";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

function CreateLink() {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("shorten");
  const [errors, setErrors] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });
  const qrRef = useRef();

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup.string().url().required("Url is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    hookFunc: createUrlFunc,
  } = useFetchHook(createUrl, { ...formValues, user_id: user.id });

  const createClickFunc = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = qrRef.current.canvasRef.current;
      const blob = await new Promise((res) => canvas.toBlob(res));
      await createUrlFunc(blob);
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((element) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if(error===null && data){
      navigate(`/link/${data[0].id}`)
    }
  }, [error,data]);

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) {
          setSearchParams({});
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>Create Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center sm:mb-4 mb-2">
            Create your short URL
          </DialogTitle>
          <div className="self-center">
            {formValues.longUrl && (
              <QRCode value={formValues?.longUrl} size={100} ref={qrRef} />
            )}
          </div>
          <Input
            id="title"
            placeholder="Enter the URL title"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <Error message={errors.title} />}
          <Input
            id="longUrl"
            placeholder="Enter your URL"
            value={formValues.longUrl}
            onChange={handleChange}
          />
          {errors.longUrl && <Error message={errors.longUrl} />}
          <div className="flex items-center gap-2">
            <Card className="p-2">domain</Card>
            <p>/</p>
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
            />
          </div>
          {error && <Error message={error.message} />}
        </DialogHeader>
        <DialogFooter>
          <Button disabled={loading} onClick={createClickFunc}>
            {loading ? <BeatLoader size={10} color="#846eee" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateLink;
