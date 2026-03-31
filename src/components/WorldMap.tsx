import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  Annotation,
} from 'react-simple-maps';
import { useLang } from '../context/LangContext';
import { massacres, Massacre, MassacreCategory } from '../data/massacres';

const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

// All world countries with approximate center coordinates
const countryLabels: { name: string; nameEn: string; coords: [number, number] }[] = [
  // Middle East & North Africa
  { name: 'فلسطين', nameEn: 'Palestine', coords: [35.2, 31.9] },
  { name: 'إسرائيل', nameEn: 'Israel', coords: [34.8, 31.0] },
  { name: 'لبنان', nameEn: 'Lebanon', coords: [35.8, 33.9] },
  { name: 'سوريا', nameEn: 'Syria', coords: [38.5, 35.0] },
  { name: 'الأردن', nameEn: 'Jordan', coords: [36.5, 31.0] },
  { name: 'العراق', nameEn: 'Iraq', coords: [43.7, 33.2] },
  { name: 'إيران', nameEn: 'Iran', coords: [53.7, 32.4] },
  { name: 'السعودية', nameEn: 'Saudi Arabia', coords: [45.0, 24.0] },
  { name: 'اليمن', nameEn: 'Yemen', coords: [48.5, 15.5] },
  { name: 'عُمان', nameEn: 'Oman', coords: [57.5, 21.5] },
  { name: 'الإمارات', nameEn: 'UAE', coords: [54.0, 23.8] },
  { name: 'قطر', nameEn: 'Qatar', coords: [51.2, 25.3] },
  { name: 'البحرين', nameEn: 'Bahrain', coords: [50.5, 26.0] },
  { name: 'الكويت', nameEn: 'Kuwait', coords: [47.5, 29.3] },
  { name: 'مصر', nameEn: 'Egypt', coords: [30.0, 26.0] },
  { name: 'ليبيا', nameEn: 'Libya', coords: [17.2, 27.0] },
  { name: 'تونس', nameEn: 'Tunisia', coords: [9.0, 34.0] },
  { name: 'الجزائر', nameEn: 'Algeria', coords: [3.0, 28.0] },
  { name: 'المغرب', nameEn: 'Morocco', coords: [-5.5, 32.0] },
  { name: 'موريتانيا', nameEn: 'Mauritania', coords: [-11.0, 20.0] },
  { name: 'تركيا', nameEn: 'Turkey', coords: [35.5, 39.0] },
  // Africa
  { name: 'السودان', nameEn: 'Sudan', coords: [30.0, 15.0] },
  { name: 'إثيوبيا', nameEn: 'Ethiopia', coords: [40.0, 9.0] },
  { name: 'الصومال', nameEn: 'Somalia', coords: [46.0, 6.0] },
  { name: 'كينيا', nameEn: 'Kenya', coords: [37.5, 0.5] },
  { name: 'تنزانيا', nameEn: 'Tanzania', coords: [35.0, -6.5] },
  { name: 'موزمبيق', nameEn: 'Mozambique', coords: [35.0, -17.0] },
  { name: 'مدغشقر', nameEn: 'Madagascar', coords: [47.0, -20.0] },
  { name: 'جنوب أفريقيا', nameEn: 'South Africa', coords: [25.0, -29.0] },
  { name: 'زيمبابوي', nameEn: 'Zimbabwe', coords: [30.0, -20.0] },
  { name: 'زامبيا', nameEn: 'Zambia', coords: [27.5, -13.5] },
  { name: 'أنغولا', nameEn: 'Angola', coords: [17.5, -12.0] },
  { name: 'الكونغو', nameEn: 'Congo', coords: [24.0, -4.0] },
  { name: 'الكاميرون', nameEn: 'Cameroon', coords: [12.5, 5.5] },
  { name: 'نيجيريا', nameEn: 'Nigeria', coords: [8.5, 9.5] },
  { name: 'غانا', nameEn: 'Ghana', coords: [-1.0, 8.0] },
  { name: 'ساحل العاج', nameEn: "Côte d'Ivoire", coords: [-5.5, 7.5] },
  { name: 'السنغال', nameEn: 'Senegal', coords: [-14.5, 14.5] },
  { name: 'مالي', nameEn: 'Mali', coords: [-2.0, 17.0] },
  { name: 'النيجر', nameEn: 'Niger', coords: [8.5, 17.0] },
  { name: 'تشاد', nameEn: 'Chad', coords: [18.5, 15.0] },
  { name: 'إريتريا', nameEn: 'Eritrea', coords: [39.0, 15.0] },
  { name: 'أوغندا', nameEn: 'Uganda', coords: [32.5, 1.5] },
  { name: 'رواندا', nameEn: 'Rwanda', coords: [29.8, -2.0] },
  { name: 'ناميبيا', nameEn: 'Namibia', coords: [18.0, -22.0] },
  { name: 'بوتسوانا', nameEn: 'Botswana', coords: [24.0, -22.0] },
  // Asia
  { name: 'أفغانستان', nameEn: 'Afghanistan', coords: [67.7, 33.9] },
  { name: 'باكستان', nameEn: 'Pakistan', coords: [69.0, 30.0] },
  { name: 'الهند', nameEn: 'India', coords: [78.0, 22.0] },
  { name: 'الصين', nameEn: 'China', coords: [104.0, 35.0] },
  { name: 'روسيا', nameEn: 'Russia', coords: [100.0, 60.0] },
  { name: 'كازاخستان', nameEn: 'Kazakhstan', coords: [68.0, 48.0] },
  { name: 'أوزبكستان', nameEn: 'Uzbekistan', coords: [63.0, 41.0] },
  { name: 'تركمانستان', nameEn: 'Turkmenistan', coords: [59.0, 40.0] },
  { name: 'منغوليا', nameEn: 'Mongolia', coords: [103.0, 46.0] },
  { name: 'كوريا الشمالية', nameEn: 'N. Korea', coords: [127.0, 40.5] },
  { name: 'كوريا الجنوبية', nameEn: 'S. Korea', coords: [128.0, 37.0] },
  { name: 'اليابان', nameEn: 'Japan', coords: [138.0, 36.5] },
  { name: 'فيتنام', nameEn: 'Vietnam', coords: [108.0, 14.0] },
  { name: 'تايلاند', nameEn: 'Thailand', coords: [101.0, 15.0] },
  { name: 'ميانمار', nameEn: 'Myanmar', coords: [96.0, 19.0] },
  { name: 'كمبوديا', nameEn: 'Cambodia', coords: [104.9, 12.5] },
  { name: 'لاوس', nameEn: 'Laos', coords: [103.0, 18.0] },
  { name: 'ماليزيا', nameEn: 'Malaysia', coords: [109.0, 4.0] },
  { name: 'إندونيسيا', nameEn: 'Indonesia', coords: [117.0, -2.0] },
  { name: 'الفلبين', nameEn: 'Philippines', coords: [122.0, 12.0] },
  { name: 'بنغلاديش', nameEn: 'Bangladesh', coords: [90.0, 24.0] },
  { name: 'سريلانكا', nameEn: 'Sri Lanka', coords: [80.5, 8.0] },
  { name: 'نيبال', nameEn: 'Nepal', coords: [84.0, 28.0] },
  { name: 'طاجيكستان', nameEn: 'Tajikistan', coords: [71.0, 39.0] },
  { name: 'قيرغيزستان', nameEn: 'Kyrgyzstan', coords: [74.5, 41.0] },
  { name: 'أذربيجان', nameEn: 'Azerbaijan', coords: [47.5, 40.5] },
  { name: 'أرمينيا', nameEn: 'Armenia', coords: [45.0, 40.2] },
  { name: 'جورجيا', nameEn: 'Georgia', coords: [43.5, 42.0] },
  { name: 'ميانمار', nameEn: 'Myanmar', coords: [96.5, 21.0] },
  // Europe
  { name: 'أوكرانيا', nameEn: 'Ukraine', coords: [32.0, 49.0] },
  { name: 'بولندا', nameEn: 'Poland', coords: [19.5, 52.0] },
  { name: 'ألمانيا', nameEn: 'Germany', coords: [10.5, 51.0] },
  { name: 'فرنسا', nameEn: 'France', coords: [2.5, 46.5] },
  { name: 'إسبانيا', nameEn: 'Spain', coords: [-3.5, 40.0] },
  { name: 'إيطاليا', nameEn: 'Italy', coords: [12.0, 42.5] },
  { name: 'المملكة المتحدة', nameEn: 'UK', coords: [-2.0, 54.0] },
  { name: 'السويد', nameEn: 'Sweden', coords: [18.0, 63.0] },
  { name: 'النرويج', nameEn: 'Norway', coords: [10.0, 65.0] },
  { name: 'فنلندا', nameEn: 'Finland', coords: [26.0, 64.0] },
  { name: 'رومانيا', nameEn: 'Romania', coords: [25.0, 45.5] },
  { name: 'اليونان', nameEn: 'Greece', coords: [22.0, 39.5] },
  { name: 'البرتغال', nameEn: 'Portugal', coords: [-8.0, 39.5] },
  { name: 'بيلاروسيا', nameEn: 'Belarus', coords: [28.0, 53.0] },
  { name: 'صربيا', nameEn: 'Serbia', coords: [21.0, 44.0] },
  { name: 'بلغاريا', nameEn: 'Bulgaria', coords: [25.0, 43.0] },
  { name: 'المجر', nameEn: 'Hungary', coords: [19.0, 47.0] },
  { name: 'النمسا', nameEn: 'Austria', coords: [14.5, 47.5] },
  { name: 'سويسرا', nameEn: 'Switzerland', coords: [8.0, 47.0] },
  // Americas
  { name: 'الولايات المتحدة', nameEn: 'USA', coords: [-98.0, 38.0] },
  { name: 'كندا', nameEn: 'Canada', coords: [-96.0, 60.0] },
  { name: 'المكسيك', nameEn: 'Mexico', coords: [-102.0, 23.0] },
  { name: 'البرازيل', nameEn: 'Brazil', coords: [-52.0, -10.0] },
  { name: 'الأرجنتين', nameEn: 'Argentina', coords: [-65.0, -35.0] },
  { name: 'كولومبيا', nameEn: 'Colombia', coords: [-74.0, 4.0] },
  { name: 'البيرو', nameEn: 'Peru', coords: [-76.0, -10.0] },
  { name: 'بوليفيا', nameEn: 'Bolivia', coords: [-65.0, -17.0] },
  { name: 'تشيلي', nameEn: 'Chile', coords: [-71.0, -35.0] },
  { name: 'فنزويلا', nameEn: 'Venezuela', coords: [-66.0, 8.0] },
  { name: 'هندوراس', nameEn: 'Honduras', coords: [-86.5, 15.0] },
  { name: 'غواتيمالا', nameEn: 'Guatemala', coords: [-90.5, 15.5] },
  { name: 'بنما', nameEn: 'Panama', coords: [-80.0, 9.0] },
  { name: 'كوبا', nameEn: 'Cuba', coords: [-79.5, 21.5] },
  { name: 'هايتي', nameEn: 'Haiti', coords: [-72.5, 19.0] },
  { name: 'نيكاراغوا', nameEn: 'Nicaragua', coords: [-85.0, 12.8] },
  { name: 'الإكوادور', nameEn: 'Ecuador', coords: [-78.0, -2.0] },
  { name: 'باراغواي', nameEn: 'Paraguay', coords: [-58.0, -23.0] },
  { name: 'أوروغواي', nameEn: 'Uruguay', coords: [-56.0, -33.0] },
  // Oceania
  { name: 'أستراليا', nameEn: 'Australia', coords: [134.0, -25.5] },
  { name: 'نيوزيلندا', nameEn: 'New Zealand', coords: [172.5, -41.5] },
];


const getCategoryColor = (cat: MassacreCategory) => {
  switch (cat) {
    case 'israeli': return { fill: '#8B0000', glow: 'rgba(139,0,0,0.6)' };
    case 'american': return { fill: '#b35400', glow: 'rgba(179,84,0,0.6)' };
    default: return { fill: '#8B0000', glow: 'rgba(139,0,0,0.6)' };
  }
};

const getMarkerSize = (victims: number) => {
  if (victims > 100000) return 4;
  if (victims > 10000) return 3;
  if (victims > 1000) return 2.5;
  return 2;
};

interface PopupCard {
  massacre: Massacre;
  x: number;
  y: number;
}

export const WorldMap = () => {
  const { isAr } = useLang();
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([25, 20]);
  const [selectedCard, setSelectedCard] = useState<PopupCard | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleZoomIn = useCallback(() => setZoom((z) => Math.min(z * 1.6, 12)), []);
  const handleZoomOut = useCallback(() => setZoom((z) => Math.max(z / 1.6, 1)), []);
  const handleReset = useCallback(() => { setZoom(1); setCenter([25, 20]); }, []);

  const handleMoveEnd = useCallback(({ coordinates, zoom: z }: { coordinates: [number, number]; zoom: number }) => {
    setCenter(coordinates);
    setZoom(z);
  }, []);

  return (
    <section id="map" className="relative py-24 bg-ash overflow-hidden">
      {/* background ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blood/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-blood text-xs tracking-[4px] uppercase mb-3 block">● LIVE MAP</span>
          <h2 className={`text-3xl sm:text-5xl font-bold text-white mb-4 ${isAr ? 'font-arabic' : 'font-display'}`}>
            {isAr ? 'خريطة الجراح' : 'Map of Scars'}
          </h2>
          <p className={`text-gray-400 max-w-xl mx-auto text-sm sm:text-base ${isAr ? 'font-arabic' : ''}`}>
            {isAr
              ? 'كل نقطة دم على الخريطة تُمثِّل مجزرة موثقة. استخدم التحكم للتكبير أو اضغط على أي نقطة لعرض التفاصيل.'
              : 'Every blood dot marks a documented massacre. Zoom in or tap any point for full details.'}
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#8B0000] shadow-[0_0_8px_#8B0000]" />
            <span className={`text-gray-400 ${isAr ? 'font-arabic' : ''}`}>{isAr ? 'عمليات إسرائيلية' : 'Israeli Operations'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#b35400] shadow-[0_0_8px_#b35400]" />
            <span className={`text-gray-400 ${isAr ? 'font-arabic' : ''}`}>{isAr ? 'عمليات أمريكية' : 'US Operations'}</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-blood"
            />
            <span className={`text-gray-400 ${isAr ? 'font-arabic' : ''}`}>{isAr ? 'نقطة تفاعلية' : 'Interactive point'}</span>
          </div>
        </div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#070d14] border border-blood/20 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(139,0,0,0.15)] aspect-[4/3] sm:aspect-video w-full"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] pointer-events-none z-10" />
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blood/60 rounded-tl-2xl pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blood/60 rounded-tr-2xl pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blood/60 rounded-bl-2xl pointer-events-none z-20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blood/60 rounded-br-2xl pointer-events-none z-20" />

          <ComposableMap
            projectionConfig={{ scale: 160, center: [0, 0] }}
            className="w-full h-full"
          >
            <ZoomableGroup
              center={center}
              zoom={zoom}
              maxZoom={14}
              minZoom={0.8}
              onMoveEnd={handleMoveEnd}
            >
              {/* Geographies */}
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#111827"
                      stroke="#1f2937"
                      strokeWidth={0.4}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: '#1f2937', outline: 'none' },
                        pressed: { fill: '#374151', outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Country Labels — always visible, font adapts to zoom */}
              {countryLabels.map((label) => {
                // Base size per country scaled down by zoom so text stays inside borders
                const baseFontSize = 3.5 / zoom;
                // Only show if font would be at least 1px (avoids clutter at max zoom out)
                if (baseFontSize > 6) return null;
                return (
                  <Annotation
                    key={label.nameEn}
                    subject={label.coords}
                    dx={0}
                    dy={0}
                    connectorProps={{}}
                  >
                    <text
                      textAnchor="middle"
                      fontSize={Math.max(baseFontSize, 1)}
                      fill="rgba(255,255,255,0.45)"
                      fontFamily="'Segoe UI', sans-serif"
                      fontWeight="700"
                      letterSpacing="0.2"
                      style={{ userSelect: 'none', pointerEvents: 'none' }}
                    >
                      {isAr ? label.name : label.nameEn}
                    </text>
                  </Annotation>
                );
              })}

              {/* Massacre Markers */}
              {massacres.map((m) => {
                const { fill, glow } = getCategoryColor(m.category);
                const r = getMarkerSize(m.victims);
                const isHovered = hoveredId === m.id;

                return (
                  <Marker
                    key={m.id}
                    coordinates={[m.location.lng, m.location.lat]}
                    onMouseEnter={() => setHoveredId(m.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={(e) => {
                      const svgEl = (e.target as SVGElement).closest('svg');
                      const rect = svgEl?.getBoundingClientRect();
                      const clientX = (e as unknown as MouseEvent).clientX;
                      const clientY = (e as unknown as MouseEvent).clientY;
                      setSelectedCard({
                        massacre: m,
                        x: rect ? clientX - rect.left : 200,
                        y: rect ? clientY - rect.top : 200,
                      });
                    }}
                  >
                    <g className="cursor-pointer" style={{ filter: isHovered ? `drop-shadow(0 0 3px ${glow})` : undefined }}>
                      {/* Pulse ring 1 — tight, zoom-aware */}
                      <motion.circle
                        fill="none"
                        stroke={fill}
                        strokeOpacity={0.7}
                        strokeWidth={0.5 / zoom}
                        animate={{
                          r: [r * 1.2 / zoom, r * 2.4 / zoom],
                          opacity: [0.7, 0],
                        }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0 }}
                      />
                      {/* Pulse ring 2 — staggered */}
                      <motion.circle
                        fill="none"
                        stroke={fill}
                        strokeOpacity={0.4}
                        strokeWidth={0.3 / zoom}
                        animate={{
                          r: [r * 0.8 / zoom, r * 1.8 / zoom],
                          opacity: [0.5, 0],
                        }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.9 }}
                      />
                      {/* Solid core */}
                      <motion.circle
                        r={r / zoom}
                        fill={fill}
                        animate={{ opacity: isHovered ? 1 : [0.85, 1, 0.85] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {/* White center for very deadly events */}
                      {m.victims > 50000 && (
                        <circle r={(r * 0.4) / zoom} fill="rgba(255,255,255,0.9)" />
                      )}
                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleZoomIn}
              className="w-9 h-9 bg-[#0d1117]/90 border border-blood/40 text-white rounded-lg flex items-center justify-center text-xl font-bold hover:border-blood hover:bg-blood/20 transition-all shadow-lg"
              aria-label="Zoom in"
            >+</motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleZoomOut}
              className="w-9 h-9 bg-[#0d1117]/90 border border-blood/40 text-white rounded-lg flex items-center justify-center text-xl font-bold hover:border-blood hover:bg-blood/20 transition-all shadow-lg"
              aria-label="Zoom out"
            >−</motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleReset}
              className="w-9 h-9 bg-[#0d1117]/90 border border-blood/40 text-gray-400 rounded-lg flex items-center justify-center text-xs hover:border-blood hover:text-white hover:bg-blood/20 transition-all shadow-lg"
              title="Reset view"
              aria-label="Reset map"
            >⟳</motion.button>
          </div>

          {/* Zoom level indicator */}
          <div className="absolute top-4 left-4 z-30 bg-black/50 border border-white/10 rounded px-2 py-0.5 text-gray-500 text-xs font-mono pointer-events-none">
            {zoom.toFixed(1)}x
          </div>

          {/* Popup Card */}
          <AnimatePresence>
            {selectedCard && (
              <>
                {/* Backdrop to close */}
                <div
                  className="absolute inset-0 z-40"
                  onClick={() => setSelectedCard(null)}
                />
                <motion.div
                  key={selectedCard.massacre.id}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute z-50 w-64 sm:w-80 bg-[#0d1117]/95 border border-blood/50 rounded-xl shadow-[0_0_40px_rgba(139,0,0,0.3)] overflow-hidden backdrop-blur-md"
                  style={{
                    left: Math.min(Math.max(selectedCard.x - 130, 8), window.innerWidth - 330),
                    top: Math.min(selectedCard.y + 12, window.innerHeight - 280),
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Card Header */}
                  <div className="bg-blood/20 border-b border-blood/30 px-4 py-3 flex justify-between items-start">
                    <div>
                      <p className="text-blood text-xs font-mono uppercase tracking-widest mb-1">
                        {selectedCard.massacre.date}
                      </p>
                      <h3 className={`text-white font-bold text-sm leading-tight ${isAr ? 'font-arabic text-base' : 'font-display'}`}>
                        {isAr ? selectedCard.massacre.nameAr : selectedCard.massacre.nameEn}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedCard(null)}
                      className="text-gray-500 hover:text-blood ml-2 text-lg leading-none flex-shrink-0"
                    >×</button>
                  </div>

                  {/* Card Body */}
                  <div className="px-4 py-3 space-y-3">
                    {/* Victims */}
                    <div className="flex items-center gap-3 bg-black/30 rounded-lg px-3 py-2">
                      <span className="text-2xl">☠</span>
                      <div>
                        <p className={`text-blood font-bold text-xl font-display`}>
                          {selectedCard.massacre.victims.toLocaleString('en-US')}+
                        </p>
                        <p className={`text-gray-400 text-xs ${isAr ? 'font-arabic' : ''}`}>
                          {isAr ? 'شهيد موثق' : 'Documented Martyrs'}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>📍</span>
                      <span className={isAr ? 'font-arabic' : ''}>
                        {isAr
                          ? `${selectedCard.massacre.location.cityAr}، ${selectedCard.massacre.location.countryAr}`
                          : `${selectedCard.massacre.location.cityEn}, ${selectedCard.massacre.location.countryEn}`}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`text-gray-300 text-xs leading-relaxed line-clamp-3 ${isAr ? 'font-arabic text-sm text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
                      {isAr ? selectedCard.massacre.descriptionAr : selectedCard.massacre.descriptionEn}
                    </p>

                    {/* Source */}
                    <a
                      href={selectedCard.massacre.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blood transition-colors"
                    >
                      <span>🔗</span>
                      <span className="truncate">{selectedCard.massacre.source.name}</span>
                    </a>
                  </div>

                  {/* Category Badge */}
                  <div className={`absolute top-3 right-10 text-[10px] font-bold px-1.5 py-0.5 rounded ${selectedCard.massacre.category === 'israeli' ? 'bg-red-900/60 text-red-300' : 'bg-orange-900/60 text-orange-300'}`}>
                    {selectedCard.massacre.category === 'israeli' ? (isAr ? 'إسرائيلي' : 'ISRAELI') : (isAr ? 'أمريكي' : 'US')}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tap hint for mobile */}
        <p className="text-center text-gray-600 text-xs mt-4 sm:hidden">
          {isAr ? 'اضغط على أي نقطة حمراء لعرض التفاصيل' : 'Tap any red dot to view event details'}
        </p>
      </div>
    </section>
  );
};

export default WorldMap;
