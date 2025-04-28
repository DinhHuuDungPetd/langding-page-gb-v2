import AccountPage from "@/component/pages/account/AccountPage";


export const metadata = {
  title: 'Tra cứu kết quả xét nghiệm Green Lab',
  description: 'Xem và tải kết quả xét nghiệm online bảo mật, nhanh chóng. Green Lab cam kết trả kết quả đúng hạn, hỗ trợ tư vấn từ bác sĩ khi cần giải thích chỉ số bất thường.',
  openGraph: {
    title: 'Tra cứu kết quả xét nghiệm Green Lab',
    description: 'Xem và tải kết quả xét nghiệm online bảo mật, nhanh chóng. Green Lab cam kết trả kết quả đúng hạn, hỗ trợ tư vấn từ bác sĩ khi cần giải thích chỉ số bất thường.',
    images: ['/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tra cứu kết quả xét nghiệm Green Lab',
    description: 'Xem và tải kết quả xét nghiệm online bảo mật, nhanh chóng. Green Lab cam kết trả kết quả đúng hạn, hỗ trợ tư vấn từ bác sĩ khi cần giải thích chỉ số bất thường.',
    images: ['/images/logo.png'],
  }
}
export default function Home() {
  return (
    <AccountPage />
  );
}
