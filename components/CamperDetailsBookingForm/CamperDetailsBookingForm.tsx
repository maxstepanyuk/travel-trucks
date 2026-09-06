import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./CamperDetailsBookingForm.module.css";
import clsx from "clsx";

export default function CamperDetailsBookingForm() {
  return (
    <div className={css.card}>
      <div className={css.title}>
        <h2 className={css.text}>Book your campervan now</h2>
        <p className={css.supportingText}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <Formik onSubmit={() => {}} initialValues={{}}>
        <Form className={css.form}>
          <div className={css.fields}>
            <div className={css.fieldAndError}>
              <Field
                id="name"
                type="text"
                name="name"
                className={css.input}
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
                className={css.input}
                placeholder="Email*"
              />
              <ErrorMessage
                component="span"
                name="email"
                className={css.error}
              />
            </div>
          </div>
          <button type="submit" className={clsx("buttonSolid", css.submit)}>Send</button>
        </Form>
      </Formik>
    </div>
  );
}
