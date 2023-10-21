import * as yup from "yup";

export const carValidationSchema = yup.object().shape({
  carName: yup
    .string()
    .test("notOnlySpaces", "Car name is required", (value) => {
      return value.trim() !== "";
    })
    .required("Car name is required"),
  price: yup
    .number("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
  location: yup
    .string()
    .test("notOnlySpaces", "Car location is required", (value) => {
      return value.trim() !== "";
    })
    .required("Car location is required"),
  fuelType: yup.string().required("Fuel type is required"),
  transitionType: yup.string().required("Transition type is required"),
  modelType: yup.string().required("Model is required"),
});
