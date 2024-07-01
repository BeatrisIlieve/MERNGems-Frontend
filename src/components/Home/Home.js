import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { HorizontalLine } from "../HorizontalLine/HorizontalLine";

export const Home = () => {
  return (
    <section className={styles["hero"]} data-testid="hero-section">
      <Link to="/forget-me-not" className={styles["no-decoration"]}>
        <div className={styles["hero-box"]}>
          <div className={styles["hero-text"]}>
            <h2 className={styles["title"]} data-testid="forget-me-not-title">
              Forget-Me-Not Collection
            </h2>
            <p
              className={styles["paragraph"]}
              data-testid="forget-me-not-paragraph"
            >
              An enchanting medley of round brilliant, pear-shaped and marquise
              stones that together reveal a beautiful flower.
            </p>
            <button
              className={styles["animated-button"]}
              data-testid="forget-me-not-button"
            >
              Discover
            </button>
          </div>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              data-testid="forget-me-not-image"
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1716995569/collections/forgetmenot_rz0umv.png"
              }
              alt={"Img"}
            />
          </div>
        </div>
      </Link>
      <HorizontalLine />
      <Link to="/sparkling-cluster" className={styles["no-decoration"]}>
        <div className={styles["hero-box-reverse"]}>
          <div className={styles["hero-text"]}>
            <h2
              className={styles["title"]}
              data-testid="sparkling-cluster-title"
            >
              Sparkling Cluster Collection
            </h2>
            <p
              className={styles["paragraph"]}
              data-testid="sparkling-cluster-paragraph"
            >
              Captivating diamond jewels designed to perfectly complement
              brilliant celebrations.
            </p>
            <button
              className={styles["animated-button"]}
              data-testid="sparkling-cluster-button"
            >
              Discover
            </button>
          </div>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              data-testid="sparkling-cluster-image"
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1717917440/collections/herolarged_l2_bri24_sp_wdj_hero_dl66ao.webp"
              }
              alt={"Img"}
            />
          </div>
        </div>
      </Link>
      <HorizontalLine />
      <Link to="/diamond-loop" className={styles["no-decoration"]}>
        <div className={styles["hero-box"]}>
          <div className={styles["hero-text"]}>
            <h2 className={styles["title"]} data-testid="diamond-loop-title">
              Diamond Loop Collection
            </h2>
            <p
              className={styles["paragraph"]}
              data-testid="diamond-loop-paragraph"
            >
              The captivating shape of pear-shaped diamonds inspires delicate
              designs.
            </p>

            <button
              className={styles["animated-button"]}
              data-testid="diamond-loop-button"
            >
              Discover
            </button>
          </div>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              data-testid="diamond-loop-image"
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1716995568/collections/diamondloop_hzmacd.webp"
              }
              alt={"Img"}
            />
          </div>
        </div>
      </Link>
      <HorizontalLine />
      <Link to="/sunflower" className={styles["no-decoration"]}>
        <div className={styles["hero-box-reverse"]}>
          <div className={styles["hero-text"]}>
            <h2 className={styles["title"]} data-testid="sunflower-title">
              Sunflower Collection
            </h2>
            <p
              className={styles["paragraph"]}
              data-testid="sunflower-paragraph"
            >
              Natural brilliance radiates in timeless blooms.
            </p>

            <button
              className={styles["animated-button"]}
              data-testid="sunflower-button"
            >
              Discover
            </button>
          </div>
          <div className={styles["hero-img-container"]}>
            <img
              className={styles["hero-img"]}
              data-testid="sunflower-image"
              src={
                "https://res.cloudinary.com/deztgvefu/image/upload/v1716995568/collections/sunflower_jreu5p.webp"
              }
              alt={"Img"}
            />
          </div>
        </div>
      </Link>
    </section>
  );
};
