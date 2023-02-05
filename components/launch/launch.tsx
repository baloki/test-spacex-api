import { ReturnDataFormat } from '@/custom_types/returndataformat';
import styles from '../../styles/Home.module.css';

export const Launch = ({ name, date_utc, primary_core_id, payloads, image, success, reason }: ReturnDataFormat) => {
  return (
    <section className={styles.card}>
      <h2>
        <img src={image} className={styles.logo} alt={`Mission logo of ${name}`} />
        <span className={styles.missionName}>{name}</span>
        <span className={styles.coreId}>{primary_core_id}</span>
      </h2>
      <p>
        <em>Date Launched</em>: {new Date(date_utc).toLocaleDateString('en-GB')}
      </p>
      <h3>Payloads</h3>
      <ul>
        {payloads.map((payload) => (
          <li key={`payload_id_${payload}`}>{payload}</li>
        ))}
      </ul>
      <h3>Mission was a {success ? 'success 🎉' : 'failure 🛑'}</h3>
      {reason && <span>{`Reason given: ${reason}`}</span>}
    </section>
  );
};
