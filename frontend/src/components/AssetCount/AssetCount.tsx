import styles from "./AssetCount.module.scss";

type AssetCountPropTypes = {
  count: number;
  total: number;
  className?: string;
};

const AssetCount = ({ count, total, className }: AssetCountPropTypes) => {
  return (
    <div className={`${styles.assetCount} ${className || ""}`}>
      <span>{count} /</span>
      <span>{total}</span>
    </div>
  );
};

export default AssetCount;
