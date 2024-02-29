import styles from "./Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

export default function Button({ children, secondary, ...props }: Props) {
  return (
    <button
      className={`${styles.button} ${secondary ? styles.secondary : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
