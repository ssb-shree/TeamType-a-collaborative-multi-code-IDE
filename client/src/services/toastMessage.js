import styles from "../components/auth/Hero.module.css";

export const toastMessage = (success, text) => (
  <p
    className={`bg-[#1e293b] p-3 rounded-2xl shadow-cyan-300 shadow-lg border border-cyan-300 `}
  >
    {success ? "✅" : "❌"} <span className={` ${styles.title}`}>{text}</span>
  </p>
);
