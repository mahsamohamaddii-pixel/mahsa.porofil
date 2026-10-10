export async function POST() {
  return Response.json(
    { error: "سفارش‌گذاری در نسخه نمایشی فعال نیست." },
    { status: 503 }
  );
}
