'use client';

import styles from '@/app/(private)/dashboard/page.module.css';

export const LatestUsersTable = ({
  users,
  loading,
}: {
  users: { name: string; city: string; company: string }[];
  loading: boolean;
}) => (
  <article className={`${styles.card} ${styles.tableCard}`}>
    <header className={styles.cardHeader}>
      <p className={styles.cardTitle}>Latest registered users</p>
      <span className={styles.caption}>Most recent 3 entries</span>
    </header>
    <div className={styles.tableBody}>
      {users.length === 0 ? (
        <div className={styles.emptyRow}>
          <p className={styles.emptyText}>{loading ? 'Loading users…' : 'No users registered yet'}</p>
        </div>
      ) : (
        users.map((user) => (
          <div key={user.name} className={styles.tableRow}>
            <div>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userMeta}>City: {user.city}</p>
            </div>
            <p className={styles.userCompany}>Company: {user.company}</p>
          </div>
        ))
      )}
    </div>
  </article>
);

