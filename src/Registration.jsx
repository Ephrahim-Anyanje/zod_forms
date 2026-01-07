import React from "react";
//handles form state and validation
import { useForm } from "react-hook-form";
//integrates Zod schema validation with react-hook-form
import { zodResolver } from "@hookform/resolvers/zod";
//Zod library for schema definition and validation
import { z } from "zod";

// Zod schema (JavaScript)
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email"),
  age: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Age must be 0 or above")
  ),
  isActive: z.boolean().optional(),
});
// RegistrationForm component
export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      age: "",
      isActive: false,
    },
  });
  // Form submission handler
  const onSubmit = (data) => {
    console.log("Form data:", data);
    alert(JSON.stringify(data, null, 2));
    reset();
  };
  // JSX for the form
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
      <div>
        <label>Name</label>
        <input {...register("name")} />
        <p style={{ color: "red" }}>{errors.name?.message}</p>
      </div>

      <div>
        <label>Phone</label>
        <input {...register("phone")} />
        <p style={{ color: "red" }}>{errors.phone?.message}</p>
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        <p style={{ color: "red" }}>{errors.email?.message}</p>
      </div>

      <div>
        <label>Age</label>
        <input type="number" {...register("age")} />
        <p style={{ color: "red" }}>{errors.age?.message}</p>
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("isActive")} />
          Is Active
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
