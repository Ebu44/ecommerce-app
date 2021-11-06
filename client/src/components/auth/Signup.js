import React from "react";
import { useFormik } from "formik";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="container mx-auto p-64">
      <form
        className="flex flex-col justify-center border-2 mx-72 p-8 rounded-3xl"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          className="border-2 p-2 rounded-3xl"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          className="border-2 p-2 rounded-3xl"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          className="border-2 p-2 rounded-3xl"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="border-2 p-2 rounded-3xl"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button className="m-8 border-4 p-2 rounded-full" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
