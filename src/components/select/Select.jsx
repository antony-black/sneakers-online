export default function Select({ options, defaultValue, value, sortSneakers }) {
  return (
    <select
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
  );
}
