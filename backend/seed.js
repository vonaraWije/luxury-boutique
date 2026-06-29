const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const User = require('./models/User');

const products = [
  // Clothing
  { name: 'Silk Evening Gown', description: 'An exquisite silk evening gown with a flowing silhouette, perfect for black-tie events.', price: 1299, originalPrice: 1599, category: 'clothing', subcategory: 'dresses', brand: 'Maison Élégance', images: ['https://images.unsplash.com/photo-1566479179817-0b3b6c7d5a9e?w=600'], stock: 15, sizes: ['XS','S','M','L','XL'], colors: ['Midnight Black','Champagne','Ruby Red'], isFeatured: true, isNewArrival: true, rating: 4.8, numReviews: 124, material: 'Pure Silk', tags: ['gown','evening','luxury','silk'] },
  { name: 'Cashmere Wrap Coat', description: 'A luxurious full-length wrap coat crafted from the finest Mongolian cashmere.', price: 2199, originalPrice: 2599, category: 'clothing', subcategory: 'coats', brand: 'Heritage Couture', images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600'], stock: 10, sizes: ['XS','S','M','L','XL','XXL'], colors: ['Camel','Ivory','Charcoal'], isFeatured: true, isBestseller: true, rating: 4.9, numReviews: 89, material: 'Mongolian Cashmere', tags: ['coat','cashmere','winter','luxury'] },
  { name: 'Tailored Linen Blazer', description: 'A sophisticated linen blazer with hand-stitched lapels and mother-of-pearl buttons.', price: 649, category: 'clothing', subcategory: 'blazers', brand: 'Atelier Blanc', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'], stock: 20, sizes: ['XS','S','M','L','XL'], colors: ['Ivory','Navy','Sage'], isFeatured: false, isNewArrival: true, rating: 4.6, numReviews: 56, material: 'Belgian Linen', tags: ['blazer','linen','office','chic'] },
  { name: 'Velvet Corset Top', description: 'An opulent crushed velvet corset with gold boning detail and adjustable lacing.', price: 389, originalPrice: 450, category: 'clothing', subcategory: 'tops', brand: 'Noir Luxe', images: ['https://images.unsplash.com/photo-1485231183945-fffde7bd7b93?w=600'], stock: 25, sizes: ['XS','S','M','L'], colors: ['Deep Burgundy','Midnight Blue','Forest Green'], isNewArrival: true, rating: 4.7, numReviews: 73, material: 'Crushed Velvet', tags: ['corset','velvet','evening','statement'] },
  { name: 'Wide-Leg Palazzo Trousers', description: 'Flowing palazzo trousers in pure crepe silk with a high waist and wide silhouette.', price: 520, category: 'clothing', subcategory: 'trousers', brand: 'Maison Élégance', images: ['https://images.unsplash.com/photo-1594938298603-c8148c4b4e6b?w=600'], stock: 18, sizes: ['XS','S','M','L','XL'], colors: ['Champagne','Dusty Rose','Onyx'], isBestseller: true, rating: 4.5, numReviews: 44, material: 'Crepe Silk', tags: ['trousers','palazzo','silk','elegant'] },

  // Jewellery
  { name: 'Diamond Halo Necklace', description: 'A breathtaking 18k white gold necklace featuring a brilliant-cut diamond surrounded by a halo of pavé diamonds.', price: 4999, originalPrice: 5999, category: 'jewellery', subcategory: 'necklaces', brand: 'Lumière Jewels', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600'], stock: 5, isFeatured: true, isBestseller: true, rating: 5.0, numReviews: 38, material: '18k White Gold, Diamond', tags: ['diamond','necklace','luxury','gold'] },
  { name: 'Sapphire Drop Earrings', description: 'Elegant drop earrings featuring deep blue Ceylon sapphires set in 18k yellow gold with diamond accents.', price: 2799, category: 'jewellery', subcategory: 'earrings', brand: 'Lumière Jewels', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600'], stock: 8, isFeatured: true, rating: 4.9, numReviews: 52, material: '18k Gold, Ceylon Sapphire', tags: ['sapphire','earrings','gold','luxury'] },
  { name: 'Rose Gold Bangle Set', description: 'A set of three hand-crafted 14k rose gold bangles with engraved floral motifs.', price: 1299, originalPrice: 1500, category: 'jewellery', subcategory: 'bracelets', brand: 'Petal & Gold', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600'], stock: 12, isNewArrival: true, isBestseller: true, rating: 4.8, numReviews: 97, material: '14k Rose Gold', tags: ['bangles','rose gold','bracelet','set'] },
  { name: 'Pearl & Gold Statement Ring', description: 'A bold cocktail ring featuring a lustrous South Sea pearl surrounded by hand-set diamonds in 18k gold.', price: 1899, category: 'jewellery', subcategory: 'rings', brand: 'Lumière Jewels', images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600'], stock: 7, isFeatured: true, rating: 4.7, numReviews: 31, material: '18k Gold, South Sea Pearl', tags: ['pearl','ring','gold','statement'] },
  { name: 'Vintage Charm Bracelet', description: 'An heirloom-quality 14k gold charm bracelet with six hand-selected vintage charms.', price: 2199, category: 'jewellery', subcategory: 'bracelets', brand: 'Heritage Gems', images: ['https://images.unsplash.com/photo-1573408301185-9519f94de49e?w=600'], stock: 6, isNewArrival: true, rating: 4.9, numReviews: 28, material: '14k Gold', tags: ['charm','bracelet','vintage','gold'] },

  // Cosmetics
  { name: 'Velvet Matte Lip Collection', description: 'A curated set of 6 luxurious velvet matte lipsticks in an elegant gold-embossed case. Long-lasting formula enriched with vitamin E.', price: 189, originalPrice: 220, category: 'cosmetics', subcategory: 'lips', brand: 'Aurum Beauty', images: ['https://images.unsplash.com/photo-1586495777744-4e6b0c9b4789?w=600'], stock: 50, isFeatured: true, isBestseller: true, rating: 4.8, numReviews: 215, tags: ['lipstick','matte','luxury','set'] },
  { name: 'Illuminating Gold Serum', description: 'A 24k gold-infused illuminating serum that brightens, firms and imparts a radiant glow.', price: 299, originalPrice: 350, category: 'cosmetics', subcategory: 'skincare', brand: 'Or Pur Skincare', images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600'], stock: 35, isFeatured: true, isNewArrival: true, rating: 4.9, numReviews: 183, tags: ['serum','gold','skincare','glow'] },
  { name: 'Rose & Oud Perfume', description: 'An intoxicating eau de parfum that opens with Bulgarian rose and settles into a warm oud and amber base.', price: 349, category: 'cosmetics', subcategory: 'fragrance', brand: 'Maison de Parfum', images: ['https://images.unsplash.com/photo-1541643600914-78b084683702?w=600'], stock: 28, isFeatured: true, isBestseller: true, rating: 4.9, numReviews: 142, weight: '50ml EDP', tags: ['perfume','rose','oud','fragrance'] },
  { name: 'Champagne Eye Palette', description: 'A 12-pan champagne and rose gold eyeshadow palette with a mix of matte, shimmer and glitter finishes.', price: 159, category: 'cosmetics', subcategory: 'eyes', brand: 'Aurum Beauty', images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600'], stock: 42, isNewArrival: true, rating: 4.7, numReviews: 176, tags: ['eyeshadow','palette','gold','shimmer'] },
  { name: 'Caviar Anti-Aging Cream', description: 'A rich night cream infused with Siberian caviar extract and hyaluronic acid to restore skin\'s youthful radiance.', price: 429, originalPrice: 499, category: 'cosmetics', subcategory: 'skincare', brand: 'Or Pur Skincare', images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600'], stock: 20, isBestseller: true, rating: 4.8, numReviews: 94, tags: ['anti-aging','cream','skincare','caviar'] },

  // Accessories
  { name: 'Structured Leather Tote', description: 'A timeless structured tote in full-grain Italian leather with gold hardware and a suede lining.', price: 899, originalPrice: 1099, category: 'accessories', subcategory: 'bags', brand: 'Pelle Italiana', images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600'], stock: 14, isFeatured: true, isBestseller: true, rating: 4.9, numReviews: 88, material: 'Full-Grain Italian Leather', colors: ['Black','Cognac','Ivory'], tags: ['bag','tote','leather','luxury'] },
  { name: 'Silk Twill Scarf', description: 'A hand-printed 90cm silk twill scarf featuring an original botanical print designed by Parisian artists.', price: 299, category: 'accessories', subcategory: 'scarves', brand: 'Soie de Paris', images: ['https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=600'], stock: 30, isNewArrival: true, rating: 4.6, numReviews: 63, material: '100% Silk Twill', colors: ['Rose Garden','Midnight Bloom','Golden Hour'], tags: ['scarf','silk','print','accessories'] },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/luxury-boutique');
  console.log('Connected to MongoDB');

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);

  const adminExists = await User.findOne({ email: 'admin@luxuryboutique.com' });
  if (!adminExists) {
    await User.create({ name: 'Admin', email: 'admin@luxuryboutique.com', password: 'admin123', role: 'admin' });
    console.log('Admin user created: admin@luxuryboutique.com / admin123');
  }

  mongoose.disconnect();
  console.log('Seed complete!');
}

seed().catch(console.error);
