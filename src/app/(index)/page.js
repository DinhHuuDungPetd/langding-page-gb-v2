import HomePage from "@/component/pages/home/HomePage";
import { Metadata } from 'next'

export const metadata = {
  title: 'Trung Tâm Xét Nghiệm GREEN LAB',
  description: 'Trung tâm xét nghiệm Green Lab được dẫn dắt bởi đội ngũ chuyên gia PGS,TS,ThS hàng đầu trong lĩnh vực y tế. Green Lab tự hào đạt chứng nhận ISO 15189:2012 VILAS MED 134.',
  openGraph: {
    title: 'Trung Tâm Xét Nghiệm GREEN LAB',
    description: 'Trung tâm xét nghiệm Green Lab được dẫn dắt bởi đội ngũ chuyên gia PGS,TS,ThS hàng đầu trong lĩnh vực y tế. Green Lab tự hào đạt chứng nhận ISO 15189:2012 VILAS MED 134.',
    images: ['/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trung Tâm Xét Nghiệm GREEN LAB',
    description: 'Trung tâm xét nghiệm Green Lab được dẫn dắt bởi đội ngũ chuyên gia PGS,TS,ThS hàng đầu trong lĩnh vực y tế.',
    images: ['/images/logo.png'],
  }
}

export default function Home() {
  return (
    <HomePage />
  );
}
