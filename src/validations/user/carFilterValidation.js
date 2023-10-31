import * as yup from "yup";

export const dateLocationFilter = yup.object().shape({
  pickUpLocation: yup
    .string()
    .required("Pick up location is required")
    .min(3, "Provide valid location")
    .max(20)
    .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
    .test("notOnlySpaces", "Pick up location is required", (value) => {
      return value.trim() !== "";
    }),
  returnLocation: yup
    .string()
    .test("notOnlySpaces", "Car name is required", (value) => {
      return value.trim() !== "";
    })
    .min(3, "Provide valid location")
    .required("Return location is required")
    .max(20)
    .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed"),
  pickUpDate: yup
    .date()
    .required("Pick up date is required")
    .required("Required"),
  returnDate: yup
    .date()
    .required("Return date is required")
    .required("Required"),
});
