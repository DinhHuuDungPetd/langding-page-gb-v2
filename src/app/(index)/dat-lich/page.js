import OrderPage from "@/component/pages/order/OrderPage";

export const metadata = {
  title: 'Đặt lịch xét nghiệm Green Lab dễ dàng',
  description: 'Đặt lịch xét nghiệm nhanh chóng tại Green Lab. Hỗ trợ lấy mẫu tại nhà, chủ động thời gian, đảm bảo an toàn. Đăng ký online đơn giản, xác nhận ngay trong ngày.',
  openGraph: {
    title: 'Đặt lịch xét nghiệm Green Lab dễ dàng',
    description: 'Đặt lịch xét nghiệm nhanh chóng tại Green Lab. Hỗ trợ lấy mẫu tại nhà, chủ động thời gian, đảm bảo an toàn. Đăng ký online đơn giản, xác nhận ngay trong ngày.',
    images: ['/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Đặt lịch xét nghiệm Green Lab dễ dàng',
    description: 'Đặt lịch xét nghiệm nhanh chóng tại Green Lab. Hỗ trợ lấy mẫu tại nhà, chủ động thời gian, đảm bảo an toàn. Đăng ký online đơn giản, xác nhận ngay trong ngày.',
    images: ['/images/logo.png'],
  }
}


export default function Home() {
  return (
    <OrderPage />
  );
}
