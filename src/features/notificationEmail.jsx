import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useUserProfileQuery } from "../redux/services/userProfileApi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Formik, Form, Field } from "formik";
import FirstLetters from "../utils/FirstLetters";
import "../styles/features/notificationEmail.scss";
import CustomButton from "../components/CustomButton";
import BlueLogo from "../assets/images/bigLogo.png";
// import { toast } from "react-toastify";

const NotificationEmail = () => {
  const { data: uProfileData, isLoading: uLoadingData } = useUserProfileQuery();

  const initialValues = {
    subject: "",
    body: "",
    notificationName: "",
  };

  //   const handleSendEmail = () => {};

  return (
    <SkeletonTheme baseColor="#2C2C2C" highlightColor="#444">
      <div className="email-container">
        <div className="trainers-nav">
          <div className="trainer-header">
            <Link to="/notification">
              <FaArrowLeft className="back-icon" />
            </Link>
            <p className="header-text">Notification System</p>
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

        <div className="email-wrapper">
          <div>
            <p className="email-heading">Notification</p>
          </div>
          <Formik initialValues={initialValues} onSubmit={"handleSendEmail"}>
            <div className="email-form">
              <Form>
                <div className="email-flex">
                  <div className="email-space">
                    <img src={BlueLogo} alt="Blue Logo" />
                    <div className="email-body">
                      <div className="email-left-field">
                        <Field
                          name="subject"
                          type="text"
                          placeholder="Email Subject"
                          className="custom-email-text"
                        />
                      </div>

                      <div className="email-left-field">
                        <Field
                          name="speciality"
                          as="textarea"
                          className="custom-email-area"
                          placeholder="Body"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="email-details">
                    <div>
                      <p className="email-title-text">Title</p>

                      <div className="email-right-field">
                        <label htmlFor="notificationName">
                          Notification Name
                        </label>
                        <Field
                          id="notificationName"
                          name="notificationName"
                          type="text"
                          className="custom-input"
                        />
                      </div>

                      <div className="email-send-to">
                        <p className="email-title-text">Send to</p>
                        <label htmlFor="user"> User</label>
                        <Field
                          name="sendTo"
                          as="select"
                          className="email-dropdown"
                        >
                          <option value="All">All</option>
                        </Field>
                      </div>
                    </div>

                    <div className="email-button">
                      <CustomButton size="large" type="submit">Send Email</CustomButton>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </Formik>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default NotificationEmail;
