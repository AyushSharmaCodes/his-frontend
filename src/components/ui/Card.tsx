import styles from "./Card.module.css";

const Card: React.FC<{
  title: string;
  content: string;
  icon: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ title, content, icon, style }) => {
  return (
    <div className={styles.card}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>{content}</div>
      </div>
      {icon && (
        <div
          className={styles.icon}
          style={{
            color: style?.color,
            backgroundColor: style?.backgroundColor,
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};
export default Card;
