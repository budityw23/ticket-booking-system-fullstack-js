import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box 
} from '@mui/material';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Box>
          <Box>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
