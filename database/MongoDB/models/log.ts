import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILog extends Document {
  usuario: string;
  operacion: string;
  sobre: string;
  fecha?: Date;
}

const logSchema: Schema<ILog> = new Schema({
  usuario: { type: String, required: true },
  operacion: { type: String, required: true },
  id: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

const Log: Model<ILog> = mongoose.models.Log || mongoose.model<ILog>('Log', logSchema);
export default Log;