import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { schema } from "../../schema";
import { FullSubscriptionIcon } from "../../svg";
import "../../styles/authentication/signUp.scss";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import getCardIssuer from "../../schema/cardIssuer";
// import Select from "react-select";
// import countryList from "react-select-country-list";
// const countries = useMemo(() => countryList().getData(), []);

const Payment = (
  initialValues = { cvv: "", cardNumber: "", expiryDate: "", name: "" },
  setFormValues
) => {
  const [cardType, setCardType] = useState(null);

  const renderCardLogo = () => {
    switch (cardType) {
      case "visa":
        return <FaCcVisa className="card-icon" />;
      case "mastercard":
        return <FaCcMastercard className="card-icon" />;
      case "amex":
        return <FaCcAmex className="card-icon" />;
      case "discover":
        return <FaCcDiscover className="card-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="payment-section">
      <div className="payment-header">
        <div className="">
          <p className="payment-title">Subscribe to {"Regular Plan"}</p>
          <p>
            <span className="payment-amount">$12</span>
            {"/month"}
          </p>
        </div>
        <FullSubscriptionIcon className="subscription-icon" />
      </div>

      <div>
        <div className="payment-details">
          <p className="payment-title">Regular Subscription Plan</p>
          <p>{"$12"}</p>
        </div>
        <p>Billed Monthly</p>
      </div>

      <hr />

      <div className="subtotal">
        <p>Subtotal</p>
        <p>{"$12"}</p>
      </div>

      <hr className="line" />

      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => {
            setFormValues(values);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="payment-form">
              <div className="form-field">
                <label htmlFor="cardNumber">Card Number</label>
                <Field
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="custom-input"
                  autoComplete="cc-number"
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 16);

                    const formattedValue = value.replace(
                      /(\d{4})(?=\d)/g,
                      "$1 "
                    );

                    setCardType(getCardIssuer(value)); // Detect issuer
                    setFieldValue("cardNumber", formattedValue);
                  }}
                />
                <div className="card-issuer">{renderCardLogo()}</div>
                {errors.cardNumber && touched.cardNumber && (
                  <p className="error-msg">{errors.cardNumber}</p>
                )}
              </div>

              <div className="expiry-cvv-fields">
                <div className="expiry-field">
                  <label htmlFor="expiryDate">Expiration Date</label>
                  <Field
                    type="text"
                    name="expiryDate"
                    className="custom-input"
                    placeholder="MM / YY"
                    autoComplete="cc-exp"
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length > 2) {
                        value = `${value.slice(0, 2)}/${value.slice(2, 6)}`;
                      }
                      setFieldValue("expiryDate", value);
                    }}
                  />

                  {errors.expiryDate && touched.expiryDate && (
                    <p className="error-msg">{errors.expiryDate}</p>
                  )}
                </div>

                <div className="cvv-field">
                  <label htmlFor="cvv">Security Code</label>
                  <Field
                    type="number"
                    name="cvv"
                    className="custom-input"
                    placeholder="cvc"
                    autoComplete="cc-csc"
                  />
                  {errors.cvv && touched.cvv && (
                    <p className="error-msg">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="card0wner-name">Cardholder Name</label>
                <Field
                  type="text"
                  name="name"
                  className="custom-input"
                  placeholder="Full name on Card"
                />
                {errors.name && touched.name && (
                  <p className="error-msg">{errors.name}</p>
                )}
              </div>

              {/* <div className="form-field">
                      <label htmlFor="billing-address">Billing Address</label>
                      <Select
                        id="billingCountry"
                        name="billingCountry"
                        options={countries}
                        className="billing-select"
                        classNamePrefix="an-simple-select"
                        isSearchable
                        placeholder="Select your country"
                        value={
                          countries.find(
                            (c) => c.value === values.billingCountry
                          ) || null
                        }
                        onChange={(option) =>
                          setFieldValue("billingCountry", option?.value)
                        }
                      />

                      {errors.billingCountry && touched.billingCountry && (
                        <p className="error-msg">{errors.billingCountry}</p>
                      )}

                      <Field
                        type="text"
                        name="zipCode"
                        className="custom-input"
                        placeholder="Zip Code"
                      />
                      {errors.zipCode && touched.zipCode && (
                        <p className="error-msg">{errors.zipCode}</p>
                      )}
                    </div> */}

              <div className="terms-conditions">
                <label>
                  <Field
                    type="checkbox"
                    name="terms"
                    className="terms-checkbox"
                  />
                </label>
                <p className="terms-text">
                  You will be charged the amount and at the frequency listed
                  above until you cancel. We may change our prices as described
                  in our Terms of Use. You can cancel any time.
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Payment;
