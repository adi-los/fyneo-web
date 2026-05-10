import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const configPath = path.join(process.cwd(), 'config', 'context.json');
    const raw = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(raw) as { gateway: string };
    return NextResponse.json(config);
  } catch (err) {
    console.error('[/api/config] Failed to read context.json:', err);
    return NextResponse.json(
      { error: 'Could not load configuration' },
      { status: 500 }
    );
  }
}
