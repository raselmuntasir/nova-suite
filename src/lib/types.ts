export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
  tone: 'success' | 'info' | 'warning' | 'brand' | 'dark';
};
