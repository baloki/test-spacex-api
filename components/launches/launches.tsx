import { ReturnDataFormat } from '@/custom_types/returndataformat';
import { useEffect, useState } from 'react';
import { Launch } from '@/components/launch';
import styles from '../../styles/Home.module.css';

type LaunchesState = {
  data: ReturnDataFormat[] | undefined[];
};

export const Launches = (): React.ReactElement => {
  const [launches, setLaunches] = useState<LaunchesState>({ data: [] });
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    fetch('/api/spacexlaunches')
      .then((res) => res.json())
      .then((data) => {
        setLaunches(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (isLoading) {
    return <div className={styles.grid}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.grid}>There was an error loading the feed.</div>;
  }

  return (
    <div className={styles.grid}>
      {launches.data.map((item: ReturnDataFormat) => (
        <Launch {...item} key={item.primary_core_id} />
      ))}
    </div>
  );
};
