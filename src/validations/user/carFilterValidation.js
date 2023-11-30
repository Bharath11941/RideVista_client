import * as yup from "yup";

export const dateLocationFilter = yup.object().shape({
  pickUpDate: yup
    .date()
    .required("Pick up date is required")
    .required("Required"),
  returnDate: yup
    .date()
    .required("Return date is required")
    .required("Required"),
});
