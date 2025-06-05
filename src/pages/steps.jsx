import "../styles/pages/steps.scss";

const Steps = () => {
  return (
      <div className="steps-container">
        <div className="steps-image">
          <img src="src/assets/images/trainer4.png" alt="Trainer Squatting" />
        </div>

        <div className="steps-text">
          <p className="steps-header">How It Works</p>
          <h1 className="steps-title">Join in 3 Easy Steps</h1>

          <div className="steps-list">
            <div className="step-item">
              <div className="step-image">
                <img
                  src="src/assets/images/plan.png"
                  alt="Pick your plan image"
                />
              </div>

              <div>
                <h2>Pick Your Plan</h2>
                <p>
                  Choose the membership that fits your lifestyle — Student,
                  Regular, or Premium. Each plan is crafted to match your
                  fitness level, schedule, and goals.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-image">
                <img
                  src="src/assets/images/account.png"
                  alt="Create your account image"
                />
              </div>
              <div>
                <h2>Create Your Account</h2>
                <p>
                  Sign up online in minutes. Activate your dashboard to unlock
                  workout plans, diet guides, class schedules, and your own
                  progress tracker
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-image">
                <img
                  src="src/assets/images/gym.png"
                  alt="Start Trainning Smart Image"
                />
              </div>
              <div>
                <h2>Start Training Smart</h2>
                <p>
                  Book classes, follow your personalized plans, track progress,
                  and connect with trainers — all from the app or in the gym.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Steps;
