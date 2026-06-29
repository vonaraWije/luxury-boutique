import { useState } from 'react';

const tabs = ['Clothing', 'Jewellery', 'Accessories'];

const clothingData = {
  headers: ['Size', 'UK', 'EU', 'US', 'Bust (cm)', 'Waist (cm)', 'Hips (cm)'],
  rows: [
    ['XS', '6',  '34', '2',  '80–83',   '62–65',   '88–91'],
    ['S',  '8',  '36', '4',  '84–87',   '66–69',   '92–95'],
    ['M',  '10', '38', '6',  '88–91',   '70–73',   '96–99'],
    ['L',  '12', '40', '8',  '92–95',   '74–77',   '100–103'],
    ['XL', '14', '42', '10', '96–99',   '78–81',   '104–107'],
    ['XXL','16', '44', '12', '100–103', '82–85',   '108–111'],
  ],
};

const jewelleryData = {
  headers: ['Ring Size (UK)', 'Ring Size (EU)', 'Ring Size (US)', 'Diameter (mm)', 'Circumference (mm)'],
  rows: [
    ['H',  '47', '3½',  '15.0', '47.1'],
    ['J',  '49', '4½',  '15.6', '49.0'],
    ['L',  '51', '5½',  '16.2', '50.9'],
    ['N',  '54', '6½',  '17.1', '53.8'],
    ['P',  '57', '7½',  '18.0', '56.6'],
    ['R',  '60', '9',   '19.0', '59.7'],
    ['T',  '63', '10',  '19.8', '62.2'],
  ],
};

const accessoriesData = {
  headers: ['Hat / Cap Size', 'EU', 'Head Circumference (cm)', 'Belt Size', 'Waist (cm)'],
  rows: [
    ['XS / S',   '55 – 56', '55 – 57', 'XS / 70', '65 – 70'],
    ['S / M',    '57 – 58', '57 – 59', 'S / 80',  '75 – 80'],
    ['M / L',    '59 – 60', '59 – 61', 'M / 90',  '85 – 90'],
    ['L / XL',   '61 – 62', '61 – 63', 'L / 100', '95 – 100'],
    ['XL / XXL', '63 – 64', '63 – 65', 'XL / 110','105 – 110'],
  ],
};

const tableData = { Clothing: clothingData, Jewellery: jewelleryData, Accessories: accessoriesData };

const tips = [
  { label: 'Measure Yourself', desc: 'Use a soft tape measure. Keep it snug but not tight. Measure over your undergarments for the most accurate reading.' },
  { label: 'Bust / Chest', desc: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.' },
  { label: 'Waist', desc: 'Measure around your natural waistline — the narrowest part of your torso, usually just above the navel.' },
  { label: 'Hips', desc: 'Stand with feet together and measure around the fullest part of your hips and seat.' },
  { label: 'Between Sizes?', desc: 'We recommend sizing up for a more relaxed fit, or contact our styling concierge for personalised advice.' },
];

export default function SizeGuide() {
  const [active, setActive] = useState('Clothing');
  const { headers, rows } = tableData[active];

  return (
    <div className="min-h-screen bg-cream page-enter">
      {/* Hero */}
      <div className="relative py-24 px-6 text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Size Guide"
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.6em] uppercase text-gold-400 font-body mb-3">Find Your Perfect Fit</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Size Guide</h1>
          <div className="w-16 h-px bg-gold-gradient mx-auto" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-8 py-3 text-xs tracking-widest uppercase font-body transition-colors duration-200 ${active === tab ? 'border-b-2 border-gold-500 text-gold-600' : 'text-charcoal/50 hover:text-charcoal'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto mb-16">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="bg-charcoal">
                {headers.map((h) => (
                  <th key={h} className="px-5 py-4 text-left text-[10px] tracking-widest uppercase text-gold-400 font-body font-normal whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-[#faf9f7]'} hover:bg-champagne transition-colors duration-150`}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-5 py-4 ${j === 0 ? 'font-serif text-base text-charcoal' : 'text-charcoal/70'} whitespace-nowrap`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to measure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold-500 font-body mb-3">Guidance</p>
            <h2 className="font-serif text-3xl text-charcoal mb-2">How to Measure</h2>
            <div className="w-12 h-px bg-gold-gradient mb-8" />
            <div className="space-y-6">
              {tips.map(({ label, desc }) => (
                <div key={label} className="flex gap-4">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0 mt-2" />
                  <div>
                    <p className="text-xs tracking-wider uppercase font-body text-charcoal mb-1">{label}</p>
                    <p className="text-sm font-body text-charcoal/65 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-none">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=85"
              alt="Measuring"
              className="w-full h-96 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="font-serif text-xl text-white mb-1">Need Personal Styling?</p>
              <p className="text-xs font-body text-white/70 mb-4">Our stylists are available for a virtual or in-boutique consultation.</p>
              <a href="/contact" className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-gold-400 border-b border-gold-400/50 pb-0.5 hover:text-gold-300 font-body">
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
