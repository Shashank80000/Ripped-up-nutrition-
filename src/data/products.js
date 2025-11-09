// Product catalog using online images (Unsplash search endpoints). You can replace these URLs
// with any hosted images you prefer. Using source.unsplash.com returns a relevant photo.
const products = [
  {
    id: 'whey-001',
    name: 'Gold Whey Protein',
    price: 4000,
    category: 'protein',
    short: '24g protein per scoop, 5.2 lb tub',
    description:
      'Premium whey isolate blend for fast absorption and muscle recovery. Low sugar, great mixability.',
  // use local SVG assets that match product names
  image: '/assets/whey.jpg',
    rating: 4.5,
    reviews: 412,
    onSale: true,
    salePrice: 4000,
  },
  {
    id: 'creatine-001',
    name: 'Creatine Monohydrate',
    price: 1200,
    category: 'creatine',
    short: '5g creatine per serving, 300g',
    description:
      'Micronized creatine to support strength and power during high-intensity training. Unflavored and easy to stack.',
  image: '/assets/unflavoured.jpg',
    rating: 4.2,
    reviews: 128,
    onSale: false,
  },
  {
    id: 'pre-001',
    name: 'Pre-Workout Blast',
    price: 1500,
    category: 'pre-workout',
    short: 'Energy + focus, 30 servings',
    description:
      'Explosive energy, pump and focus. Formulated with caffeine, beta-alanine and nitric oxide boosters.',
  image: '/assets/pre-workout.jpg',
    rating: 4.1,
    reviews: 76,
    onSale: true,
    salePrice: 1500,
  },
  {
    id: 'bcaas-001',
    name: 'BCAA Recovery',
    price: 699,
    category: 'amino',
    short: 'Amino recovery formula, 30 servings',
    description:
      'Branched-chain amino acids to support recovery and reduce soreness after intense workouts.',
  image: '/assets/Bcaa.jpg',
    rating: 4.0,
    reviews: 54,
    onSale: false,
  },
  {
    id: 'omega-001',
    name: 'Omega-3 Fish Oil',
    price: 799,
    category: 'wellness',
    short: '1000mg EPA/DHA per serving, 120 caps',
    description:
      'High quality omega-3s to support heart and joint health — purified and molecularly distilled.',
  image: '/assets/omega-3.jpg',
    rating: 4.3,
    reviews: 201,
    onSale: false,
  },
  {
    id: 'multi-001',
    name: 'Men\'s Multivitamin',
    price: 999,
    category: 'vitamins',
    short: 'Daily nutrient support, 60 tablets',
    description:
      'Complete multivitamin to support overall health, energy and recovery for active individuals.',
  image: '/assets/multiovitamins.jpg',
    rating: 4.0,
    reviews: 88,
    onSale: false,
  },
  {
    id: 'gainer-001',
    name: 'Mass Gainer Chocolate',
    price: 1999,
    category: 'gainers',
    short: 'High-calorie mass gainer, 6 lb',
    description:
      'Calorie-dense formula with carbs and protein to help you gain mass when combined with resistance training.',
  image: '/assets/mass-gainer.jpg',
    rating: 4.4,
    reviews: 64,
    onSale: true,
    salePrice: 1999,
  },
  {
    id: 'bar-001',
    name: 'Protein Bar Variety',
    price: 199,
    category: 'snacks',
    short: '20g protein per bar, variety pack',
    description:
      'Convenient protein bars for snacks or post-workout. Assorted flavors and textures.',
  image: '/assets/protien.jpg',
    rating: 3.9,
    reviews: 233,
    onSale: false,
  },
]

export default products
