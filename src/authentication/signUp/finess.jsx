import "../../styles/authentication/signUp.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { schema } from "../../schema";

const Fitness = ({
  initialValues = { height: "", weight: "", fitness: [], diet: "" },
  setFormValues,
}) => {
  return (
    <div>
      <div className="form-step">
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => {
            setFormValues(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="fitness-form">
              <div className="bmi-field">
                <div className="height-field">
                  <label htmlFor="height">Height (cm)</label>
                  <Field type="number" name="height" className="custom-input" />
                  {errors.height && touched.height && (
                    <p className="error-msg">{errors.height}</p>
                  )}
                </div>

                <div className="weight-field">
                  <label htmlFor="weight">Weight (kg)</label>
                  <Field type="number" name="weight" className="custom-input" />
                  {errors.weight && touched.weight && (
                    <p className="error-msg">{errors.weight}</p>
                  )}
                </div>
              </div>

              <div className="form-field">
                <div className="">
                  <label htmlFor="fitnessGoal">Fitness Goal</label>
                  <div className="diet-options">
                    <div className="vegan-option">
                      <label>
                        <Field
                          type="checkbox"
                          name="fitness"
                          value="lose-weight"
                          className="diet-input"
                        />
                        Lose Weight
                      </label>
                    </div>

                    <div className="hp-option">
                      <label>
                        <Field
                          type="checkbox"
                          name="fitness"
                          value="build-muscle"
                          className="diet-input"
                        />
                        Build Muscle
                      </label>
                    </div>

                    <div className="np-option">
                      <label>
                        <Field
                          type="checkbox"
                          name="fitness"
                          value="get-flexible"
                          className="diet-input"
                        />
                        Get Flexible
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <div className="">
                  <label htmlFor="dietary">Dietary Preference</label>
                  <div className="diet-options">
                    <div className="vegan-option">
                      <label>
                        <Field
                          type="radio"
                          name="diet"
                          value="vegan"
                          className="diet-input"
                        />
                        Vegan
                      </label>
                    </div>

                    <div className="hp-option">
                      <label>
                        <Field
                          type="radio"
                          name="diet"
                          value="high-protein"
                          className="diet-input"
                        />
                        High Protein
                      </label>
                    </div>

                    <div className="np-option">
                      <label>
                        <Field
                          type="radio"
                          name="diet"
                          value="no-preference"
                          className="diet-input"
                        />
                        No Preference
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Fitness;
