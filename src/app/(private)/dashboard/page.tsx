'use client';

import { useEffect, useMemo } from 'react';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { useUsersStore } from '@/store/users';

import styles from './page.module.css';

const persianNumberFormatter = new Intl.NumberFormat('fa-IR');
const formatNumber = (value: number) => persianNumberFormatter.format(value);

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { color: '#4b5563' },
      grid: { display: false },
    },
    y: {
      ticks: { color: '#4b5563', precision: 0 },
      grid: { borderDash: [4, 6], color: 'rgba(79, 70, 229, 0.15)' },
    },
  },
  plugins: {
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      titleColor: '#f1f5f9',
      bodyColor: '#e5e7eb',
    },
    legend: {
      display: false,
    },
  },
};

const StatsCard = ({ label, value, change }: { label: string; value: string; change: string }) => (
  <article className={styles.card}>
    <p className={styles.cardLabel}>{label}</p>
    <p className={styles.cardValue}>{value}</p>
    <p className={styles.cardChange}>{change}</p>
  </article>
);

type ActivityDataPoint = { label: string; value: number };

const ActivityChart = ({ data }: { data: ActivityDataPoint[] }) => {
  const labels = data.map((point) => point.label);
  const datasetData = data.map((point) => point.value);

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: 'Users',
          data: datasetData,
          borderRadius: 12,
          maxBarThickness: 36,
          backgroundColor: 'rgba(79, 70, 229, 0.7)',
          borderColor: 'rgba(79, 70, 229, 1)',
        },
      ],
    }),
    [labels, datasetData],
  );

  return (
    <article className={`${styles.card} ${styles.chartCard}`}>
      <header className={styles.cardHeader}>
        <p className={styles.cardTitle}>User distribution by city</p>
        <span className={styles.badge}>Live data</span>
      </header>
      <div className={styles.chartWrapper}>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <p className={styles.chartCaption}>Active users per city</p>
    </article>
  );
};

const LatestUsersTable = ({
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

const DashboardPage = () => {
  const users = useUsersStore((state) => state.users);
  const loading = useUsersStore((state) => state.loading);
  const fetchUsers = useUsersStore((state) => state.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const totalCities = useMemo(() => new Set(users.map((user) => user.address.city)).size, [users]);
  const totalCompanies = useMemo(() => new Set(users.map((user) => user.company.name)).size, [users]);

  const stats = useMemo(
    () => [
      {
        label: 'Total Users',
        value: formatNumber(users.length),
        change: loading ? 'Loading user data…' : 'Based on live users',
      },
      {
        label: 'Active Cities',
        value: formatNumber(totalCities),
        change: totalCities ? 'Updated city count' : 'Gathering cities',
      },
      {
        label: 'Companies',
        value: formatNumber(totalCompanies),
        change: totalCompanies ? 'Registered organizations' : 'Preparing list',
      },
    ],
    [loading, totalCities, totalCompanies, users.length],
  );

  const chartData = useMemo(() => {
    if (!users.length) {
      return [{ label: 'Fetching data', value: 0 }];
    }

    const counts: Record<string, number> = {};
    users.forEach((user) => {
      const city = user.address.city;
      counts[city] = (counts[city] ?? 0) + 1;
    });

    return Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [users]);

  const latestUsers = useMemo(() => {
    return [...users]
      .sort((a, b) => b.id - a.id)
      .slice(0, 3)
      .map((user) => ({
        name: user.name,
        city: user.address.city,
        company: user.company.name,
      }));
  }, [users]);

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <div>
          <p className={styles.title}>Dashboard</p>
          <p className={styles.description}>Overall stats, activity trends, and the newest accounts</p>
        </div>
        <span className={styles.eyebrow}>Preview release</span>
      </header>

      <section className={styles.statsGrid}>
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className={styles.contentGrclid}>
        <ActivityChart data={chartData} />
        <LatestUsersTable users={latestUsers} loading={loading} />
      </section>
    </section>
  );
};

export default DashboardPage;
