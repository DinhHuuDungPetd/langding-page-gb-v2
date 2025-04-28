import IntroductionPage from "@/component/pages/introduction/IntroductionPage";

export const metadata = {
  title: 'Về Green Lab – Chất lượng từ tâm huyết',
  description: 'Khám phá hành trình phát triển của Green Lab – trung tâm xét nghiệm đạt chuẩn ISO 15189, hội tụ đội ngũ bác sĩ giỏi, công nghệ tiên tiến và cam kết phục vụ bằng y đức và yêu thương.',
  openGraph: {
    title: 'Về Green Lab – Chất lượng từ tâm huyết',
    description: 'Khám phá hành trình phát triển của Green Lab – trung tâm xét nghiệm đạt chuẩn ISO 15189, hội tụ đội ngũ bác sĩ giỏi, công nghệ tiên tiến và cam kết phục vụ bằng y đức và yêu thương.',
    images: ['/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Về Green Lab – Chất lượng từ tâm huyết',
    description: 'Khám phá hành trình phát triển của Green Lab – trung tâm xét nghiệm đạt chuẩn ISO 15189.',
    images: ['/images/logo.png'],
  }
}

export default function Home() {
  return (
    <IntroductionPage />
  );
}
