import styles from "./LoadingSpinner.module.css";
export const LoadingSpinner = () => {
  return (
    <div
      className={styles["loading-spinner-box"]}
      data-testid="loading-spinner-box"
    >
      <div className={styles["loading-spinner"]} data-testid="loading-spinner">
        <div className={styles["image-container"]}>
          <img
            className={styles["image"]}
            src="https://res.cloudinary.com/deztgvefu/image/upload/v1714938396/template_images/Screenshot_2024-05-05_at_22.42.20-removebg-preview_xfkrvq.png"
            alt="logo"
          />
        </div>
        <h1 className={styles["title"]}>Loading... !</h1>
      </div>
    </div>
  );
};
