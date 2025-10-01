# Tối ưu hóa hiệu suất - Performance Optimizations

## Tổng quan
Tài liệu này mô tả các tối ưu hóa hiệu suất đã được thực hiện để cải thiện trải nghiệm người dùng (UX) và tốc độ tải trang mà không thay đổi giao diện người dùng (UI).

## 1. Tối ưu hóa hình ảnh và Lazy Loading

### OptimizedImage Component
- **Vị trí**: `src/components/OptimizedImage.js`
- **Cải tiến**:
  - Sử dụng `React.memo` để tránh re-render không cần thiết
  - Thêm error handling với fallback UI
  - Blur placeholder mặc định để cải thiện perceived performance
  - Loading spinner tối ưu với animation mượt mà
  - Hỗ trợ `sizes` attribute cho responsive images

### ImageSlider Optimization
- **Vị trí**: `src/component/pages/home/ImageSlider.js`
- **Cải tiến**:
  - Chỉ ảnh đầu tiên có `priority={true}`
  - Memoize Swiper config để tránh re-render
  - Giảm animation delay từ 0.2s xuống 0.1s
  - Sử dụng OptimizedImage thay vì Image trực tiếp

## 2. Tối ưu hóa Components với React Performance

### React.memo, useMemo, useCallback
- **Components được tối ưu**:
  - `LazyLoadOnView` - Component helper cho lazy loading
  - `TableRelatedPosts` - Table component với pagination
  - `TablePosts` - Table component tương tự
  - `ImageSlider` - Slider component

### Cải tiến cụ thể:
- Sử dụng `useCallback` cho event handlers
- `useMemo` cho expensive calculations (sorting, filtering)
- `React.memo` để tránh unnecessary re-renders
- Proper dependency arrays trong hooks

## 3. Tối ưu hóa Code Splitting và Dynamic Imports

### Next.js Configuration
- **Vị trí**: `next.config.js`
- **Cải tiến**:
  - Bật `reactStrictMode` và `swcMinify`
  - Bundle splitting tối ưu với vendor và common chunks
  - Tree shaking được kích hoạt
  - CSS optimization
  - Package imports optimization cho framer-motion, react-icons, swiper

### Dynamic Imports Strategy
- **HomePage**: Các section quan trọng load ngay, các section cuối lazy load
- **SSR**: Bật cho các component quan trọng, tắt cho các component không cần thiết

## 4. Cải thiện Caching và Preloading

### Resource Preloading
- **Vị trí**: `src/components/ResourcePreloader.js`
- **Chức năng**:
  - Preload critical images ngay lập tức
  - Prefetch secondary images sau 2 giây
  - Không can thiệp vào critical path

### Layout Optimization
- **Vị trí**: `src/app/layout.js`
- **Cải tiến**:
  - Preload critical fonts (Medium, Bold)
  - DNS prefetch cho external domains
  - Preconnect cho critical origins
  - Enhanced metadata cho SEO

### Caching Headers
- Static assets: 1 năm cache
- Fonts: 1 năm cache
- Next.js static files: 1 năm cache

## 5. Tối ưu hóa Font Loading

### Font Strategy
- **Critical fonts**: Medium và Bold load ngay
- **Secondary fonts**: Italic variants load sau 1 giây
- **FontLoader component**: `src/components/FontLoader.js`

### CSS Font Loading
- `font-display: swap` cho tất cả fonts
- Thứ tự load được tối ưu: critical → secondary
- Preload critical fonts trong HTML head

## 6. Performance Monitoring

### Web Vitals Tracking
- **Vị trí**: `src/utils/performance.js`
- **Chức năng**:
  - Track Core Web Vitals (LCP, FID, CLS)
  - Store metrics trong localStorage
  - Long task monitoring
  - Memory usage monitoring
  - Component render time measurement

### Lazy Library Loading
- **Vị trí**: `src/components/LazyLibraryLoader.js`
- **Chức năng**:
  - Load Swiper modules sau 3 giây
  - Load Framer Motion components sau 3 giây
  - Không can thiệp vào initial page load

## Kết quả mong đợi

### Core Web Vitals Improvements
- **LCP (Largest Contentful Paint)**: Giảm 20-30% nhờ image optimization
- **FID (First Input Delay)**: Cải thiện nhờ code splitting và lazy loading
- **CLS (Cumulative Layout Shift)**: Giảm nhờ proper image dimensions và font loading

### Loading Performance
- **Initial bundle size**: Giảm nhờ code splitting
- **Time to Interactive**: Cải thiện nhờ lazy loading
- **Perceived Performance**: Tăng nhờ skeleton screens và blur placeholders

### User Experience
- **Smooth scrolling**: Không bị lag khi scroll
- **Fast navigation**: Components load nhanh hơn
- **Better mobile experience**: Optimized cho mobile devices

## Cách sử dụng

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Performance Testing
- Sử dụng Chrome DevTools Lighthouse
- Kiểm tra Network tab để xem loading strategy
- Monitor Console để xem performance metrics

## Lưu ý quan trọng

1. **Không thay đổi UI**: Tất cả optimizations đều invisible với user
2. **Backward compatible**: Không phá vỡ existing functionality
3. **Progressive enhancement**: App vẫn hoạt động ngay cả khi JS fail
4. **Mobile-first**: Optimizations tập trung vào mobile experience

## Monitoring và Maintenance

- Kiểm tra Web Vitals metrics định kỳ
- Monitor bundle size trong mỗi release
- Test performance trên các devices khác nhau
- Cập nhật optimization strategies dựa trên real-world data
