'use client';

import type { ReactNode } from 'react';

import styles from '@/app/(private)/dashboard/page.module.css';

export { ActivityChart } from '../ActivityChart';
export { LatestUsersTable } from '../LatestUsersTable';

type StatsCardProps = {
  label: string;
  value: string;
  change: string;
  icon: ReactNode;
  iconColor?: string;
  iconBg?: string;
};

export const StatsCard = ({ label, value, change, icon, iconColor, iconBg }: StatsCardProps) => (
  <article className={styles.card}>
    <div className={styles.cardHeader}>
      <div
        className={styles.cardIcon}
        style={{ color: iconColor ?? '#1f2937', backgroundColor: iconBg ?? 'rgba(148, 163, 184, 0.15)' }}
      >
        {icon}
      </div>
      <p className={styles.cardLabel}>{label}</p>
    </div>
    <p className={styles.cardValue}>{value}</p>
    <p className={styles.cardChange}>{change}</p>
  </article>
);
