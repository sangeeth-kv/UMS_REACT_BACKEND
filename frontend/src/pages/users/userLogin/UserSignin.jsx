import React, { useState } from "react";
import FormInputField from "../../../components/InputField/FormInputField";
import { Eye, EyeOff, Form } from "lucide-react";
import AuthFormButton from "../../../components/Buttons/AuthFormButton";
import AuthNavLink from "../../../components/NavLink/AuthNavLink";

function UserSignin() {
  const [show, setShow] = useState(false);
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center 
                      bg-blue-50 text-blue-900 
                      dark:bg-gray-900 dark:text-white"
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
          Sign in
        </h3>
        <FormInputField title="Email" type="email" />
        <FormInputField
          title="Password"
          type={show ? "text" : "password"}
          icon={
            <span
              onClick={() => setShow((show) => !show)}
              className="cursor-pointer"
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          }
        />

        <AuthFormButton title="Login" />
        <AuthNavLink
          title="Don't have an account ?"
          link="/signup"
          navTitle="click here."
        />
      </div>
    </div>
  );
}

export default UserSignin;
