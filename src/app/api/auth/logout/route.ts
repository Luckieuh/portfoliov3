import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Déconnexion réussie' });
  
  // Supprimer le cookie de session
  response.cookies.delete('adminSession');
  
  return response;
}
