import styles from "./Select.module.scss";
// TODO: remove sort functionality to backend
export default function Select({ options, defaultValue, value, sortSneakers }) {
  return (
    <div className={styles.mySelect}>
      <select
        className={styles.select}
        value={value}
        onChange={(event) => sortSneakers(event.target.value)}
      >
        <option disabled value="">
          {defaultValue}
        </option>
        {options.map((optionData) => (
          <option key={optionData.value} value={optionData.value}>
            {optionData.name}
          </option>
        ))}
      </select>
    </div>
  );
}
