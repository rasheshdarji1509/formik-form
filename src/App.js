import * as Yup from "yup";
import logo from "./logo.svg";
import "./index.css";
import { useFormik } from "formik";
import FormInput from "./Form";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(25, "Name cannot exceed 25 characters")
    .required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password cannot exceed 12 characters")
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: Yup.string()
    .min(6, "Confirm Password must be at least 6 characters")
    .max(12, "Confirm Password cannot exceed 12 characters")
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  age: Yup.number()
    .required("Please enter your age")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than or equal to 120"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions"),
  gender: Yup.string().required("Please select your gender"),
  dateOfBirth: Yup.date().required("Please enter your date of birth"),
  dateRange: Yup.string().required("Please select a date range"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  age: "",
  terms: false,
  gender: "", 
  dateOfBirth: "", 
  dateRange: "", 
};

function App() {
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues, 
      validationSchema: signUpSchema, 
      onSubmit: (values, action) => {
        console.log(values); 
        action.resetForm();
      },
    });

  return (
    <div className=" flex gap-10  justify-start items-start p-2">
      <form
        className="form flex-1 max-w-[600px] mx-auto border border-gray-300 rounded-md p-4 w-full"
        onSubmit={handleSubmit} 
      >
        <div className="input-div">
          <label htmlFor="name" className="block font-medium mb-3">
            Name
          </label>
          <input
            placeholder="name"
            name="name"
            onChange={handleChange} 
            className="p-2 border border-gray-300 rounded-md w-full mb-1"
            value={values.name}
            onBlur={handleBlur} 
            autoComplete="off"
            type="text"
            id="name"
          />
          {errors.name && touched.name && (
            <p className="mb-2" style={{ color: "red" }}>
              {errors.name} 
            </p>
          )}
        </div>

        <div className="input-div">
          <label htmlFor="email" className="block font-medium mb-3">
            Email
          </label>
          <input
            placeholder="email"
            className="p-2 border border-gray-300 rounded-md w-full mb-1"
            name="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            autoComplete="off"
            type="email"
            id="email"
          />
          {errors.email && touched.email && (
            <p className="mb-2" style={{ color: "red" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div className="input-div">
          <label htmlFor="password" className="block font-medium mb-3">
            Password
          </label>
          <input
            placeholder="password"
            className="p-2 border border-gray-300 rounded-md w-full mb-1"
            name="password"
            autoComplete="off"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            type="password"
            id="password"
          />
          {errors.password && touched.password && (
            <p className="mb-2" style={{ color: "red" }}>
              {errors.password}
            </p>
          )}
        </div>

        <div className="input-div">
          <label htmlFor="confirmPassword" className="block font-medium mb-3">
            Confirm Password
          </label>
          <input
            placeholder="confirmPassword"
            name="confirmPassword"
            autoComplete="off"
            className="p-2 border border-gray-300 rounded-md w-full mb-1"
            onChange={handleChange}
            value={values.confirmPassword}
            onBlur={handleBlur}
            type="password"
            id="confirmPassword"
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="mb-2" style={{ color: "red" }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="input-div">
          <label htmlFor="age" className="block font-medium mb-3">
            Age
          </label>
          <input
            placeholder="age"
            name="age"
            className="p-2 border border-gray-300 rounded-md w-full mb-1"
            onChange={handleChange}
            value={values.age}
            onBlur={handleBlur}
            type="number"
            id="age"
          />
          {errors.age && touched.age && (
            <p className="mb-2" style={{ color: "red" }}>
              {errors.age}
            </p>
          )}
        </div>

        <div className="input-div mb-3">
          <label className="block font-medium mb-3">Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.gender === "male"}
              />
              Male
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.gender === "female"}
              />
              Female
            </label>
          </div>
          {errors.gender && touched.gender && (
            <p className="mb-2" style={{ color: "red" }}>
              {errors.gender}
            </p>
          )}
        </div>

        <div className="input-div">
          <label htmlFor="dateOfBirth" className="block font-medium mb-3">
            Date of Birth
          </label>
          <input
            name="dateOfBirth"
            className="p-2 border border-gray-300 rounded-md w-full mb-1"
            onChange={handleChange}
            value={values.dateOfBirth}
            onBlur={handleBlur}
            type="date"
            id="dateOfBirth"
          />
          {errors.dateOfBirth && touched.dateOfBirth && (
            <p className="mb-2" style={{ color: "red" }}>
              {errors.dateOfBirth}
            </p>
          )}
        </div>

        <div className="input-div">
          <label htmlFor="dateRange" className="block font-medium mb-3">
            Date Range
          </label>
          <input
            name="dateRange"
            className="p-2 border border-gray-300 rounded-md w-full mb-1"
            onChange={handleChange}
            value={values.dateRange}
            onBlur={handleBlur}
            type="text"
            placeholder="e.g. 2024-01-01 to 2024-12-31"
            id="dateRange"
          />
          {errors.dateRange && touched.dateRange && (
            <p className="mb-2" style={{ color: "red" }}>
              {errors.dateRange}
            </p>
          )}
        </div>

        <div className="input-div mt-2">
          <div className="flex items-center flex-row-reverse justify-center gap-2">
            <label className="font-medium">
              I accept the terms and conditions
            </label>
            <input
              type="checkbox"
              name="terms"
              className="p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
              checked={values.terms}
              onBlur={handleBlur}
            />
          </div>
          {errors.terms && touched.terms && (
            <p className="mb-2 text-center" style={{ color: "red" }}>
              {errors.terms}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-3">
          <button
            type="submit"
            className="mx-auto rounded-md"
            style={{ padding: "5px", background: "black", color: "white" }}
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mx-auto py-20 flex-1">
      <FormInput/>
      </div>
    </div>
  );
}

export default App;
