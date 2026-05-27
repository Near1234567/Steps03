import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSiteData } from '../context/SiteContext';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useSiteData();
  const slideshowImages = data.hero.slideshowImages || [];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slideshowImages.length]);

    const zoomVariants = {
      enter: {
        scale: 1.4,
        opacity: 0,
      },
      center: {
        zIndex: 1,
        scale: 1,
        opacity: 1,
        transition: {
          scale: { duration: 3, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 1.5 }
        }
      },
      exit: {
        zIndex: 0,
        scale: 0.95,
        opacity: 0,
        transition: {
          scale: { duration: 1.5, ease: "easeIn" },
          opacity: { duration: 1 }
        }
      }
    };

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-zen-ivory">
      {/* Background Zen Gradient */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-zen-beige rounded-full opacity-30 blur-[150px] -z-10"
      ></motion.div>
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 lg:gap-40 items-center group">
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-12 lg:pr-32 transition-transform duration-1000 lg:group-hover:-translate-x-20 pb-20 lg:pb-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center lg:justify-start space-x-6">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: 32, md: 48 }}
                 transition={{ delay: 0.5, duration: 1 }}
                 className="h-px bg-zen-gold"
               ></motion.div>
               <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-zen-taupe font-bold">{t('hero.subtitle', { defaultValue: data.hero.subtitle })}</h2>
            </div>
            <motion.h1 
              initial={{ opacity: 0, filter: 'blur(20px)', y: 50 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ delay: 0.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[10rem] font-serif text-zen-stone leading-[0.9] italic select-none flex flex-col items-center lg:items-start"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="whitespace-nowrap"
              >
                {data.hero.titleTop}
              </motion.span> 
              <motion.span 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 2, ease: "easeOut" }}
                className="text-zen-gold drop-shadow-sm whitespace-nowrap lg:-mt-4"
              >
                {data.hero.titleBottom}
              </motion.span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl text-zen-stone/60 max-w-lg font-light leading-relaxed italic border-l-2 border-zen-gold/20 lg:pl-10"
          >
            "{t('hero.quote', { defaultValue: data.hero.quote })}" 
            <br /><span className="text-sm uppercase tracking-widest text-zen-gold mt-4 block">{t('hero.location', { defaultValue: data.hero.location })}</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 pt-6"
          >
            <RouterLink 
              to="/gallery-full"
              className="group relative px-12 py-5 bg-zen-stone text-white text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:shadow-2xl"
            >
              <span className="relative z-10">{t('hero.collection', { defaultValue: data.ui.heroCollection })}</span>
              <div className="absolute inset-0 bg-zen-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
            </RouterLink>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="order-1 lg:order-2 flex justify-center"
        >
            <div className="relative w-full max-w-[360px] sm:max-w-xl aspect-square group flex items-center justify-center">
            {/* Conteneur Diaporama - Forme Cercle avec Cadre Doré */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative w-full h-full rounded-full flex items-center justify-center transition-all duration-1000"
            >
              {/* Cadre Doré Sculpté (CSS) */}
              <div className="absolute inset-0 rounded-full p-[8px] bg-gradient-to-br from-[#D7BD8E] via-[#BD9F67] to-[#D7BD8E] shadow-[0_30px_70px_-20px_rgba(189,159,103,0.3)]">
                <div className="w-full h-full rounded-full border border-[#B18E50]/40 bg-white"></div>
              </div>
              
              {/* Zone de clipping circulaire pour les images d'art */}
              <div className="absolute inset-[10px] rounded-full overflow-hidden z-10 flex items-center justify-center bg-zen-stone/5 border border-white/30">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentImageIndex}
                    variants={zoomVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <img 
                      src={slideshowImages[currentImageIndex]} 
                      alt={`Art ${currentImageIndex}`} 
                      className="w-full h-full object-cover transition-transform duration-[8s] hover:scale-110"
                    />
                    {/* Filtre de profondeur interne */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none"></div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Indicateurs de progression discrets */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slideshowImages.map((_, idx) => (
                  <motion.div 
                    key={idx} 
                    animate={{ 
                      width: currentImageIndex === idx ? 28 : 8,
                      backgroundColor: currentImageIndex === idx ? '#D7BD8E' : 'rgba(168, 162, 158, 0.2)'
                    }}
                    className="h-1 rounded-full transition-all duration-700"
                  ></motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-6 opacity-30"
      >
        <span className="text-[9px] uppercase tracking-[0.6em] vertical-text">{t('hero.explore', { defaultValue: data.ui.heroExplore })}</span>
        <div className="w-px h-24 bg-gradient-to-b from-zen-gold to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default Hero;