import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./CamperDetailsBookingForm.module.css";
import clsx from "clsx";
import { BookingRequestDto } from "@/types/booking";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { CreateBookingForCamper, createBookingForCamper } from "@/lib/api";
import toast from "react-hot-toast";

const initialValues: BookingRequestDto = {
  name: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2).required("Please enter your name."),
  email: Yup.string().email().required("Please enter your email."),
});

interface CamperDetailsBookingFormProps {
  camperId: string;
}

export default function CamperDetailsBookingForm({
  camperId,
}: CamperDetailsBookingFormProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: createBookingForCamper,
    onSuccess: ({ message }) => {
      toast(message);
    },
    onError: (e) => {
      const msg = "Error creating booking";
      console.log(msg, e);
      toast.error(msg);
    },
  });

  const handleSubmit = (
    formValues: BookingRequestDto,
    actions: FormikHelpers<BookingRequestDto>,
  ) => {
    const bookingAndId: CreateBookingForCamper = {
      camperId: camperId,
      bookingRequest: formValues,
    };

    mutate(bookingAndId, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  return (
    <div className={css.card}>
      <div className={css.title}>
        <h2 className={css.text}>Book your campervan now</h2>
        <p className={css.supportingText}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ isValid, dirty, errors, touched }) => {
          return (
            <Form className={css.form}>
              <div className={css.fields}>
                <div className={css.fieldAndError}>
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    className={clsx(css.input, {
                      [css.inputError]: touched.name && errors.name,
                    })}
                    placeholder="Name*"
                  />
                  <ErrorMessage
                    component="span"
                    name="name"
                    className={css.error}
                  />
                </div>

                <div className={css.fieldAndError}>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    className={clsx(css.input, {
                      [css.inputError]: touched.email && errors.email,
                    })}
                    placeholder="Email*"
                  />
                  <ErrorMessage
                    component="span"
                    name="email"
                    className={css.error}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={clsx("buttonSolid", css.submit)}
                disabled={!isValid || !dirty || isPending}
              >
                {isPending ? "Creating..." : "Send"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
