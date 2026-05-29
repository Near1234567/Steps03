 import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSiteData } from '../context/SiteContext';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useSiteData();

  const slideshowImages = data.hero.slideshowImages || [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (slideshowImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const zoomVariants = {
    enter: {
      scale: 1.05,
      opacity: 0,
      y: 10,
    },

    center: {
      scale: 1,
      opacity: 1,
      y: 0,

      transition: {
        scale: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1]
        },

        opacity: {
          duration: 0.8
        },

        y: {
          duration: 0.8
        }
      }
    },

    exit: {
      opacity: 0
    }
  };

  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-zen-ivory"
    >
      {/* BACKGROUND */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-zen-beige rounded-full opacity-30 blur-[150px] -z-10"
      />

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 flex flex-col items-center gap-24 group">

        {/* TEXT CONTENT */}
        <div className="order-1 flex flex-col items-center text-center space-y-8 lg:space-y-12 pb-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 1.2,
              ease: [0.23, 1, 0.32, 1]
            }}

            className="space-y-4"
          >
            {/* SUBTITLE */}
            <div className="flex items-center justify-center space-x-6">

              <motion.div
                initial={{ width: 0 }}

                animate={{ width: 48 }}

                transition={{
                  delay: 0.5,
                  duration: 1
                }}

                className="h-px bg-zen-gold"
              />

              <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-zen-taupe font-bold">
                {t('hero.subtitle', {
                  defaultValue: data.hero.subtitle
                })}
              </h2>
            </div>

            {/* TITLE */}
            <motion.h1
              initial={{
                opacity: 0,
                filter: 'blur(20px)',
                y: 50
              }}

              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                y: 0
              }}

              transition={{
                delay: 0.2,
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1]
              }}

              className="
                text-6xl
                sm:text-7xl
                md:text-8xl
                lg:text-[8rem]
                xl:text-[10rem]
                font-serif
                text-zen-stone
                leading-[0.9]
                italic
                select-none
                flex
                flex-col
                items-center
              "
            >
              <motion.span
                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                transition={{
                  delay: 0.5,
                  duration: 1.5
                }}

                className="whitespace-nowrap"
              >
                {data.hero.titleTop}
              </motion.span>

              <motion.span
                initial={{
                  x: -100,
                  opacity: 0
                }}

                animate={{
                  x: 0,
                  opacity: 1
                }}

                transition={{
                  delay: 0.8,
                  duration: 2,
                  ease: 'easeOut'
                }}

                className="
                  text-zen-gold
                  drop-shadow-sm
                  whitespace-nowrap
                  lg:-mt-4
                "
              >
                {data.hero.titleBottom}
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* QUOTE */}
          <motion.p
            initial={{
              opacity: 0,
              x: -20
            }}

            animate={{
              opacity: 1,
              x: 0
            }}

            transition={{
              delay: 0.8,
              duration: 1
            }}

            className="
              text-xl
              md:text-2xl
              text-zen-stone/60
              max-w-2xl
              font-light
              leading-relaxed
              italic
              border-l-2
              border-zen-gold/20
              pl-8
              text-center
            "
          >
            "
            {t('hero.quote', {
              defaultValue: data.hero.quote
            })}
            "

            <br />

            <span className="text-sm uppercase tracking-widest text-zen-gold mt-4 block">
              {t('hero.location', {
                defaultValue: data.hero.location
              })}
            </span>
          </motion.p>

          {/* BUTTON */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: 1.1,
              duration: 1
            }}

            className="pt-4"
          >
            <RouterLink
              to="/gallery-full"
              className="
                group
                relative
                px-12
                py-5
                bg-zen-stone
                text-white
                text-[10px]
                uppercase
                tracking-[0.3em]
                overflow-hidden
                transition-all
                hover:shadow-2xl
              "
            >
              <span className="relative z-10">
                {t('hero.collection', {
                  defaultValue: data.ui.heroCollection
                })}
              </span>

              <div className="absolute inset-0 bg-zen-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
            </RouterLink>
          </motion.div>
        </div>

        {/* IMAGE SECTION */}
        <div className="order-2 flex justify-center items-center w-full">

          <motion.div
            key={currentImageIndex}

            variants={zoomVariants}

            initial="enter"

            animate="center"

            className="relative inline-flex items-center justify-center overflow-hidden"
          >
            {/* GOLD FRAME */}
            <div
              className="
                p-[8px]
                rounded-3xl
                bg-gradient-to-br
                from-[#D7BD8E]
                via-[#BD9F67]
                to-[#D7BD8E]
                shadow-[0_30px_70px_-20px_rgba(189,159,103,0.3)]
              "
            >
              <div
                className="
                  rounded-[22px]
                  border
                  border-[#B18E50]/40
                  bg-white
                  p-2
                "
              >
                <img
                  src={slideshowImages[currentImageIndex]}
                  alt={`Art ${currentImageIndex}`}

                  className="
                    max-w-[92vw]
                    max-h-[75vh]
                    w-auto
                    h-auto
                    object-contain
                    rounded-2xl
                    transition-transform
                    duration-[8s]
                    hover:scale-105
                  "
                />
              </div>
            </div>

            {/* LIGHT OVERLAY */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none"></div>
          </motion.div>

        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        animate={{
          y: [0, 10, 0]
        }}

        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}

        className="
          absolute
          bottom-12
          left-1/2
          -translate-x-1/2
          flex
          flex-col
          items-center
          space-y-6
          opacity-30
        "
      >
        <span className="text-[9px] uppercase tracking-[0.6em] vertical-text">
          {t('hero.explore', {
            defaultValue: data.ui.heroExplore
          })}
        </span>

        <div className="w-px h-24 bg-gradient-to-b from-zen-gold to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default Hero;
