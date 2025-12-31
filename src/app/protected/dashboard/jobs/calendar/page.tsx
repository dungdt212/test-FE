// Trong calendar/page.tsx
export default async function CalendarPage() {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Bắt trang web đợi 1.5 giây để thấy loading, chờ API đổ dữ liệu về
  return <div>Nội dung lịch thật</div>;
}