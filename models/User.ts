import mongoose, { Document, Schema } from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    emailVerified: { type: Date },
  },
  { timestamps: true }
);

// Create a model or return existing one to prevent recompilation errors
export const User = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema);

// Helper function to get the current user
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  
  return await User.findOne({ email: session.user.email });
}
