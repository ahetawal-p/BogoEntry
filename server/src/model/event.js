/* eslint-disable comma-dangle */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  title: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: Number, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  updateDate: { type: Date, default: Date.now },
  category: { type: String },
  activity: { type: String },
  phone: { type: String },
  email: { type: String },
  website: { type: String },
  createdDate: { type: Date, default: Date.now }
});

const EventModel = mongoose.model('event', EventSchema);

export default EventModel;
