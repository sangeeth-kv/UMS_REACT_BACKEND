import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInputField from "../../../components/InputField/FormInputField";
import { Eye, EyeOff } from "lucide-react";
import AuthFormButton from "../../../components/Buttons/AuthFormButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../validation/schemas/signinSchema";
import signinUser from "../../../services/usreSignin";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser, updateUser } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";

function AdminLogin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInSchema) });

  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (clicked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <Spinner />
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      if (clicked) return;
      setClicked(true);

      const response = await signinUser(data);

      if (response.success) {
        dispatch(setAccessToken(response.data.accessToken));
        dispatch(setUser(response.data.user));
        dispatch(updateUser({ isProfileCompleted: response.data.profile }));
        toast.success(response.message);
        navigate("/admin/dashboard", { replace: true });
      } else {
        if (response.errors) {
          response.errors.forEach((err) => {
            setError(err.path, { message: err.message });
          });
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong!",error.message);
    } finally {
      setClicked(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 tracking-wide">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormInputField
            title="Admin Email"
            type="text"
            register={register("email")}
            error={errors.email?.message}
          />

          <FormInputField
            title="Password"
            type={show ? "text" : "password"}
            register={register("password")}
            error={errors.password?.message}
            icon={
              <span
                onClick={() => setShow((prev) => !prev)}
                className="cursor-pointer text-gray-400 hover:text-white"
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            }
          />

          <AuthFormButton title="Login as Admin" disabled={clicked} />
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
