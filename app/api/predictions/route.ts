import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import { User } from '@/models/User';
import { Prediction, IPrediction } from '@/models/Prediction';

export async function POST(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the current user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to save predictions' },
        { status: 401 }
      );
    }

    // Find or create the user
    let user = await User.findOne({ email: session.user.email });
    if (!user) {
      user = await User.create({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      });
    }

    // Parse the request body
    const predictionData = await request.json();

    // Create a new prediction
    const prediction = await Prediction.create({
      userId: user._id,
      ...predictionData,
    });

    return NextResponse.json({ success: true, data: prediction });
  } catch (error) {
    console.error('Error saving prediction:', error);
    return NextResponse.json(
      { error: 'Failed to save prediction' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Get the current user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'You must be logged in to view predictions' },
        { status: 401 }
      );
    }

    // Find the user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get all predictions for the user
    const predictions = await Prediction.find({ userId: user._id })
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: predictions });
  } catch (error) {
    console.error('Error fetching predictions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch predictions' },
      { status: 500 }
    );
  }
}
