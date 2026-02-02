import styles from "./ClearFiltersBtn.module.scss";

type ClearFiltersBtnPropTypes = {
  clearFilters: () => void;
};

const ClearFiltersBtn = ({ clearFilters }: ClearFiltersBtnPropTypes) => {
  return (
    <button onClick={clearFilters} className={styles.button}>
      Clear all
    </button>
  );
};
export default ClearFiltersBtn;
