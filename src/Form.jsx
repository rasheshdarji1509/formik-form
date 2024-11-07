import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormInput = () => {
  const [inputType, setInputType] = useState("text");
  const [label, setLabel] = useState("Text");
  const [placeholder, setPlaceholder] = useState("Enter text");
  const [pattern, setPattern] = useState("");

  const passwordValidation =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
  const emailValidation = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const numberValidation = /^\d+$/;

  const handleInputChange = (e) => {
    const selectedType = e.target.value;
    setInputType(selectedType);

    switch (selectedType) {
      case "email":
        setLabel("Email");
        setPlaceholder("Enter email");
        setPattern(emailValidation);
        break;
      case "password":
        setLabel("Password");
        setPlaceholder("Enter password");
        setPattern(passwordValidation);
        break;
      case "number":
        setLabel("Number");
        setPlaceholder("Enter number");
        setPattern(numberValidation);
        break;
      default:
        setLabel("Text");
        setPlaceholder("Enter text");
        setPattern("");
    }
  };

  const handleSubmit = (values, { resetForm, setErrors }) => {
    const submittedValues = {
      [inputType]: values.input,
    };

    console.log("Form Submitted:", submittedValues);

    resetForm();
    setErrors({}); 
  };

  const getPasswordFeedback = (value) => {
    const feedback = [];

    if (value.length < 8)
      feedback.push("Password must be at least 8 characters long");
    if (value.length > 12)
      feedback.push("Password must not exceed 12 characters");
    if (!/[A-Z]/.test(value))
      feedback.push("Password must contain at least one uppercase letter");
    if (!/\d/.test(value))
      feedback.push("Password must contain at least one number");
    if (!/[@$!%*?&]/.test(value))
      feedback.push("Password must contain at least one special character");

    return feedback;
  };

  const validationSchema = Yup.object().shape({
    input: Yup.string()
      .required("This field is required")
      .matches(pattern, "Invalid format"),
  });

  return (
    <div>
      <select
        onChange={handleInputChange}
        defaultValue="text"
        className="ml-auto border border-gray-300 rounded-md p-3 outline-none flex justify-end"
      >
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="password">Password</option>
        <option value="number">Number</option>
      </select>

      <Formik
        initialValues={{ input: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        className="mt-5"
      >
        {({ setFieldValue, values, errors, touched, resetForm, setErrors }) => (
          <Form className="mt-10 mx-auto p-3 border border-gray-200 rounded-md max-w-[400px]">
            <div className="flex gap-3 items-center flex-col">
              <div className="flex gap-3 items-center">
                <label className="font-medium text-lg">{label}</label>
                <Field
                  type={inputType}
                  name="input"
                  placeholder={placeholder}
                  className="border p-2 rounded-md"
                  onChange={(e) => {
                    setFieldValue("input", e.target.value);
                  }}
                />
              </div>
              <ErrorMessage
                name="input"
                component="span"
                style={{ color: "red" }}
              />
            </div>

            {inputType === "password" && (
              <div>
                <h4>Password Requirements:</h4>
                <ul>
                  {getPasswordFeedback(values.input).map((msg, index) => (
                    <li key={index} style={{ color: "red" }}>
                      {msg}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-center mt-2">
              {inputType === "email" && (
                <span style={{ color: "gray" }} className="text-center">
                  Please enter a valid email address
                </span>
              )}

              {inputType === "number" && (
                <span style={{ color: "gray" }} className="text-center">
                  Please enter a valid number
                </span>
              )}
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className="py-2 px-4 rounded-md bg-red-600 text-white"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormInput;
