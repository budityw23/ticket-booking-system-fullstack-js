import mongoose, { Document } from 'mongoose';

export interface ITicket extends Document {
  name: string;
  description: string;
  price: number;
  totalQuota: number;
  availableQuota: number;
  status: 'active' | 'inactive';
  createdBy: mongoose.Types.ObjectId;
}

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a ticket name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  totalQuota: {
    type: Number,
    required: [true, 'Please add total quota']
  },
  availableQuota: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
