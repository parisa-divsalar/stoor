'use client';

import styles from '@/app/(private)/dashboard/page.module.css';

export { ActivityChart } from '../ActivityChart';
export { LatestUsersTable } from '../LatestUsersTable';

export const StatsCard = ({ label, value, change }: { label: string; value: string; change: string }) => (
  <article className={styles.card}>
    <p className={styles.cardLabel}>{label}</p>
    <p className={styles.cardValue}>{value}</p>
    <p className={styles.cardChange}>{change}</p>
  </article>
);
