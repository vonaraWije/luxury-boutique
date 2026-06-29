import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import BannerStrip from '../components/BannerStrip';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <main className="page-enter">
      <HeroSection />
      <CategorySection />
      <FeaturedProducts
        title="Featured Pieces"
        subtitle="Handpicked For You"
        endpoint="/products/featured"
      />
      <BannerStrip />
      <FeaturedProducts
        title="New Arrivals"
        subtitle="Just Landed"
        endpoint="/products/new-arrivals"
      />
      <Testimonials />
      <FeaturedProducts
        title="Bestsellers"
        subtitle="Most Loved"
        endpoint="/products/bestsellers"
      />
      <Newsletter />
    </main>
  );
}
