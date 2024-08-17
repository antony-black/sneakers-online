import GreenButton from "../greenButton/GreenButton";
import useGlobalState from "../../hooks/useGlobalState";
import styles from "./ItemsInfo.module.scss";
import style from "../greenButton/GreenButton.module.scss";

export default function ItemsInfo({ title, text, image }) {
  const { handleCart } = useGlobalState();

  return (
    <div className={styles.itemsInfo}>
      <div className={styles.content}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <GreenButton className={style.arrowBack} onClick={handleCart}>
        Go back
        <img src="../source/icons/arrow-back.svg" alt="arrow" />
      </GreenButton>
    </div>
  );
}
