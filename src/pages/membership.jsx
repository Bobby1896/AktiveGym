import "../styles/pages/membership.scss";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import { plans } from "../plainData";
import { FaCheck } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Membership = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <div className="membership-container">
      <div className="membership-header">
        <p className="section-title">Choose a plan</p>
        <h1 className="section-subtitle">Membership Plan</h1>
      </div>

      <div className="billing-toggle">
        <button
          className={billingCycle === "monthly" ? "active" : ""}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </button>

        <button
          className={billingCycle === "yearly" ? "active" : ""}
          onClick={() => setBillingCycle("yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="plan-group">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={index === 1 ? "plan-middle-card" : "plan-card"}
          >
            <div>
              <h2 className="plan-title">{plan.name}</h2>
              <p className="plan-price">{plan.description}</p>
            </div>
            <div className="plan-details">
              {plan[billingCycle].map((price, i) => (
                <p key={i} className="plan-price-amount">
                  <strong>{price}</strong>
                </p>
              ))}
              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <FaCheck className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
               <div className="plan-button">
                <CustomButton
                  size="large"
                  bgColor={index === 1 ? "#ffffff" : "#1A85C8"}
                  textColor={index === 1 ? "#1A85C8" : "#ffffff"}
                  component={RouterLink}  to="/signup"
                >
                  Choose Plan
                </CustomButton>
              </div>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
