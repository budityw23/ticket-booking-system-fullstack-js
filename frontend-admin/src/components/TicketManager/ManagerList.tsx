import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { TicketManager } from '../../types/admin';

interface ManagerListProps {
  managers: TicketManager[];
  onEdit: (manager: TicketManager) => void;
  onDelete: (managerId: string) => void;
}

export const ManagerList: React.FC<ManagerListProps> = ({
  managers,
  onEdit,
  onDelete
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {managers.map((manager) => (
            <TableRow key={manager.id}>
              <TableCell>{manager.name}</TableCell>
              <TableCell>{manager.email}</TableCell>
              <TableCell>
                <Chip
                  label={manager.status}
                  color={manager.status === 'active' ? 'success' : 'error'}
                />
              </TableCell>
              <TableCell>
                {new Date(manager.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(manager)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(manager.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
