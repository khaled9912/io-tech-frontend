"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  subscribeEmail,
  selectEmailMessage,
  selectFormStatus,
  resetForm,
} from "../store/slices/formSlice";
import { useAppDispatch } from "@/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocale, useTranslations } from "next-intl";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const SubscriptionForm = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectFormStatus);
  const message = useSelector(selectEmailMessage);
  const isAr = useLocale() === "ar";
  const t = useTranslations("footer");
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm: formikReset }) => {
      try {
        setSubmitting(true);
        const resultAction: any = await dispatch(subscribeEmail(values.email));

        if (subscribeEmail.fulfilled.match(resultAction)) {
          toast.success(message || t("subscribed-successfully"));
          formikReset();
          dispatch(resetForm());
        } else {
          toast.error(message || t("something-went-wrong"));
        }
      } catch (error) {
        toast.error(t("subscription-failed"));
        console.error("Subscription error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="relative mt-4 w-full max-w-md"
      >
        <input
          type="email"
          name="email"
          placeholder={t("enter-your-email")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full rounded border bg-white p-2 pr-32 text-white"
        />
        <button
          type="submit"
          disabled={status === "loading" || formik.isSubmitting}
          className="absolute right-0 top-1  mx-2 rounded-r bg-primary p-1 text-white disabled:opacity-50"
        >
          {status === "loading" || formik.isSubmitting ?
           t("subscribing")
            : t("subscribe")}
        </button>
        <p>
          {formik.touched.email && formik.errors.email && (
            <div className="mt-1 text-red-500">{formik.errors.email}</div>
          )}
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default SubscriptionForm;
