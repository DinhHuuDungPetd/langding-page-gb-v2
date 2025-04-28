import ServicePage from "@/component/pages/service/ServicePage";
import { Metadata } from 'next'

export const metadata = {
  title: 'Dịch vụ xét nghiệm đa dạng tại Green Lab',
  description: 'Green Lab cung cấp hơn 100 loại xét nghiệm: sức khỏe tổng quát, sàng lọc ung thư, sản – phụ khoa, truyền nhiễm, di truyền... An toàn – chính xác – nhanh chóng.',
  openGraph: {
    title: 'Dịch vụ xét nghiệm đa dạng tại Green Lab',
    description: 'Green Lab cung cấp hơn 100 loại xét nghiệm: sức khỏe tổng quát, sàng lọc ung thư, sản – phụ khoa, truyền nhiễm, di truyền... An toàn – chính xác – nhanh chóng.',
    images: ['/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dịch vụ xét nghiệm đa dạng tại Green Lab',
    description: 'Green Lab cung cấp hơn 100 loại xét nghiệm: sức khỏe tổng quát, sàng lọc ung thư, sản – phụ khoa, truyền nhiễm, di truyền...',
    images: ['/images/logo.png'],
  }
}

export default function Home() {
  return (
    <ServicePage />
  );
}
