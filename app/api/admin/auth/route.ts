import { NextResponse } from 'next/server';

const COOKIE_NAME = 'ht-admin-token';
const VALID_TOKEN = 'hanoi-tourism-admin-secret-2024';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === 'admin' && password === 'admin') {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, VALID_TOKEN, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
    });
    return res;
  }

  return NextResponse.json({ error: 'Sai tài khoản hoặc mật khẩu' }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
  return res;
}
