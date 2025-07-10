import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/features/addTrainer.scss";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import { Link as RouterLink, Link } from "react-router-dom";
import FirstLetters from "../utils/FirstLetters";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import CustomButton from "../components/CustomButton";

const AddTrainers = () => {
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();

  const initialValues = {
    name: "",
    email: "",
    experience: "",
    specialities: "",
    description: "",
    phone: "",
    timeAvailable: "",
    date: "",
  };
  const trainerSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Please enter your name"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter your email"),
    experience: Yup.number()
      .min(1, "Experience must be a number and at least 1")
      .max(50, "Please enter a valid experience in years")
      .required("Please enter your experience in years"),
    specialities: Yup.string()
      .min(3, "Specialities must be at least 3 characters")
      .required("Please enter your specialities"),
    description: Yup.string()
      .min(10, "About must be at least 10 characters")
      .required("Please enter a brief description about yourself"),
    certification: Yup.string()
      .min(3, "Certification must be at least 3 characters")
      .required("Please enter your certification details"),
    timeAvailable: Yup.string().required("Please enter your available time"),
    date: Yup.date().required("Please enter the date you joined"),
  });

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444" animation="wave">
      <div className="add-trainers-container">
        <div className="trainers-nav">
          <div className="trainer-header">
            <Link to="/trainers">
              <FaArrowLeft className="back-icon" />
            </Link>
            <p className="header-text">Trainer</p>
          </div>

          <div className="name-initials">
            {uLoadingData ? (
              <>
                <Skeleton circle width={40} height={40} />
                <Skeleton width={120} height={15} style={{ marginTop: 10 }} />
              </>
            ) : (
              <>
                <FirstLetters
                  name={uProfileData?.fullName}
                  className="initials"
                />
                <p>{uProfileData?.fullName}</p>
              </>
            )}
          </div>
        </div>

        <div className="add-trainers-content">
          <Formik
            initialValues={initialValues}
            validationSchema={trainerSchema}
            onSubmit={""}
          >
            {({ errors, touched }) => (
              <Form className="add-trainer-form">
                <div className="add-trainer-details">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field name="name" type="text" className="custom-input" />
                    {errors.name && touched.name && (
                      <p className="error-msg">{errors.name}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" className="custom-input" />
                    {errors.email && touched.email && (
                      <p className="error-msg">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="add-trainer-details">
                  <div className="form-group">
                    <label htmlFor="experience">Years of Experience</label>
                    <Field
                      name="experience"
                      type="number"
                      className="custom-input"
                    />
                    {errors.experience && touched.experience && (
                      <p className="error-msg">{errors.experience}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="certification">Certification</label>
                    <Field
                      name="certification"
                      type="text"
                      className="custom-input"
                    />
                    {errors.certification && touched.certification && (
                      <p className="error-msg">{errors.certification}</p>
                    )}
                  </div>
                </div>

                <div className="add-trainer-details">
                  <div className="form-group">
                    <label htmlFor="specialities">Specialities</label>
                    <Field
                      name="specialities"
                      as="textarea"
                      className="custom-area"
                    />
                    {errors.specialities && touched.specialities && (
                      <p className="error-msg">{errors.specialities}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">About</label>
                    <Field
                      name="description"
                      as="textarea"
                      className="custom-area"
                    />
                    {errors.description && touched.description && (
                      <p className="error-msg">{errors.description}</p>
                    )}
                  </div>
                </div>

                <div className="add-trainer-details">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <Field name="date" type="date" className="custom-input" />

                    {errors.date && touched.date && (
                      <p className="error-msg">{errors.date}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeAvailable">Time Available</label>

                    <Field
                      name="timeAvailable"
                      type="text"
                      placeholder='e.g. "9:00 AM - 5:00 PM"'
                      className="custom-input"
                    />
                    {errors.timeAvailable && touched.timeAvailable && (
                      <p className="error-msg">{errors.timeAvailable}</p>
                    )}
                  </div>
                </div>

                <div className="add-trainer-button">
                  <CustomButton type="submit" size="large">
                    {" "}
                    Submit{" "}
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default AddTrainers;
