import React from 'react';
import { Grid, Container } from '@mui/material';
import {
  ConfirmationNumber as TicketIcon,
  ShoppingCart as BookingIcon,
  AttachMoney as RevenueIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { StatsCard } from '../../components/Dashboard/StatsCard';
import { useQuery } from 'react-query';
import { api } from '../../services/api';
import { DashboardStats } from '../../types/admin';

export const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery<DashboardStats>(
    'dashboardStats',
    () => api.get('/admin/stats').then(res => res.data)
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Tickets"
            value={stats?.totalTickets || 0}
            icon={<TicketIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Bookings"
            value={stats?.totalBookings || 0}
            icon={<BookingIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Revenue"
            value={`$${stats?.totalRevenue || 0}`}
            icon={<RevenueIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Active Events"
            value={stats?.activeEvents || 0}
            icon={<EventIcon />}
          />
        </Grid>
      </Grid>
      {/* Add more dashboard components here */}
    </Container>
  );
};
