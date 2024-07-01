import { RegisterForm } from "./RegisterForm/RegisterForm";
import { ToggleMenu } from "../../ToggleMenu/ToggleMenu";
import styles from "./Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Register = () => {
  const options = [
    "Is at least eight characters in length",
    "Contains at least one capital letter",
    "Contains at least one lowercase letter",
    "Contains at least one number",
    "Does not contain spaces",
  ];

  const title = "Password Requirements";

  const subtitle = "Please ensure your password:";
  return (
    <section className={styles["register-box"]}>
      <div className={styles["register-container"]}>
        <div className={styles["form-container"]}>
          <h2 className={styles["title"]} data-testid="sign-up-title-element">
            Create an Account
          </h2>
          <div
            className={styles["sub-title"]}
            data-testid="sign-up-sub-title-element"
          >
            <h3 className={styles["sub-title-left"]}>
              Have a ReactGems account?
            </h3>
            <Link className={styles["link"]} to="/user/login">
              <h3
                className={styles["sub-title-right"]}
                data-testid="sign-in-button"
              >
                Sign in{" "}
                <span className={styles["arrow"]}>
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </h3>
            </Link>
          </div>
          <RegisterForm />
        </div>
        <div
          className={styles["password-requirements-container"]}
          data-testid="image-element"
        >
          <div className={styles["image"]}>
            <img
              className={styles["img"]}
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1715602900/template_images/herolarged_ny24_plp_718_necklace_blue_g0wqz9.jpg"
              }
              alt={"Img"}
            />
          </div>
          <div
            className={styles["password-requirements"]}
            data-testid="password-requirements-element"
          >
            <ToggleMenu options={options} title={title} subtitle={subtitle} />
          </div>
        </div>
      </div>
    </section>
  );
};
