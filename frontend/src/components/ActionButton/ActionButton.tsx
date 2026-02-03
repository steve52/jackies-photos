import styles from "./ActionButton.module.scss";

type ActionButtonPropsType = {
  Icon: React.ElementType;
};

const ActionButton = ({ Icon }: ActionButtonPropsType) => {
  return (
    <button className={styles.actionButton}>
      <Icon className={styles.icon} />
    </button>
  );
};

export default ActionButton;
