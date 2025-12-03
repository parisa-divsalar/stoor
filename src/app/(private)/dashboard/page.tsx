'use client';

import { useEffect, useMemo } from 'react';

import { ActivityChart, LatestUsersTable, StatsCard } from '@/components/dashboard';
import { useUsersStore } from '@/store/users';

import styles from './page.module.css';

const formatNumber = (value: number) => value.toLocaleString('en-US');

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

      <section className={styles.contentGrid}>
        <ActivityChart data={chartData} />
        <LatestUsersTable users={latestUsers} loading={loading} />
      </section>
    </section>
  );
};

export default DashboardPage;
