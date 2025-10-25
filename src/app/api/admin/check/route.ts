import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const adminCount = await prisma.admin.count();
    
    return NextResponse.json({
      exists: adminCount > 0,
    });
  } catch (error) {
    console.error('Error checking admin:', error);
    return NextResponse.json(
      { exists: false, error: 'Error checking admin status' },
      { status: 500 }
    );
  }
}
