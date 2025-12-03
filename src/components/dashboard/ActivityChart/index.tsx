'use client';

import { useMemo } from 'react';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import styles from '@/app/(private)/dashboard/page.module.css';

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

type ActivityDataPoint = { label: string; value: number };

export const ActivityChart = ({ data }: { data: ActivityDataPoint[] }) => {
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

