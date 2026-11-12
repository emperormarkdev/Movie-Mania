import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json(
      { error: 'Transaction reference is required' },
      { status: 400 }
    );
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    // Return mock success in development/testing mode
    return NextResponse.json({
      status: true,
      message: 'Verification successful (Simulated/Test mode)',
      data: {
        reference,
        status: 'success',
        currency: 'NGN',
        paid_at: new Date().toISOString()
      }
    });
  }

  try {
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await paystackRes.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to verify transaction' },
      { status: 500 }
    );
  }
}

