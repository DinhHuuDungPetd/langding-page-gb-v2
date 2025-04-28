import ContactPage from "@/component/pages/contact/ContactPage";

export const metadata = {
  title: 'Liên hệ Green Lab – Hỗ trợ 24/7',
  description: 'Cần tư vấn xét nghiệm, hỗ trợ đặt lịch hoặc phản hồi dịch vụ? Liên hệ Green Lab qua hotline, Zalo, fanpage hoặc đến trực tiếp các chi nhánh gần bạn nhất.',
  openGraph: {
    title: 'Liên hệ Green Lab – Hỗ trợ 24/7',
    description: 'Cần tư vấn xét nghiệm, hỗ trợ đặt lịch hoặc phản hồi dịch vụ? Liên hệ Green Lab qua hotline, Zalo, fanpage hoặc đến trực tiếp các chi nhánh gần bạn nhất.',
    images: ['/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liên hệ Green Lab – Hỗ trợ 24/7',
    description: 'Cần tư vấn xét nghiệm, hỗ trợ đặt lịch hoặc phản hồi dịch vụ? Liên hệ Green Lab qua hotline, Zalo, fanpage.',
    images: ['/images/logo.png'],
  }
}

export default function Home() {
  return (
    <ContactPage />
  );
}
