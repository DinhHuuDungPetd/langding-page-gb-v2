import CategoryPage from "@/component/pages/news-events/category/CategoryPage";

export const metadata = {
  title: 'Tin tức y khoa & hoạt động Green Lab',
  description: 'Cập nhật thông tin y học, kiến thức sức khỏe, hoạt động cộng đồng và sự kiện nổi bật tại Green Lab. Theo dõi ngay để không bỏ lỡ chương trình ưu đãi, hội thảo chuyên sâu.',
  openGraph: {
    title: 'Tin tức y khoa & hoạt động Green Lab',
    description: 'Cập nhật thông tin y học, kiến thức sức khỏe, hoạt động cộng đồng và sự kiện nổi bật tại Green Lab. Theo dõi ngay để không bỏ lỡ chương trình ưu đãi, hội thảo chuyên sâu.',
    images: ['/images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tin tức y khoa & hoạt động Green Lab',
    description: 'Cập nhật thông tin y học, kiến thức sức khỏe, hoạt động cộng đồng và sự kiện nổi bật tại Green Lab. Theo dõi ngay để không bỏ lỡ chương trình ưu đãi, hội thảo chuyên sâu.',
    images: ['/images/logo.png'],
  }
}
export default function Page({ params }) {
  return <CategoryPage params={params} />;
}
