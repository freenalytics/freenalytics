import { Schema, model } from 'mongoose';

export interface DataModel {
  payload: object
  domain: string
  createdAt: Date
}

const dataSchema = new Schema<DataModel>({
  payload: {
    type: Schema.Types.Mixed,
    required: true
  },
  domain: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: false
  }
});

export default model<DataModel>('Data', dataSchema);
