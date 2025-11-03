import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ParticleBackground from '../ParticleBackground';
import ThreeDModel from '../three/ThreeDModel';
import { Button, Badge } from '../common';

const Hero = ({ profile }) => {
  if (!profile) return null;

  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const socials = profile.social ?? [];

  // GSAP animations on mount
  useEffect(() => {
    const timeline = gsap.timeline();

    if (headlineRef.current) {
      timeline.from(headlineRef.current, {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
      });
    }

    if (subtitleRef.current) {
      timeline.from(
        subtitleRef.current,
        {
          duration: 1,
          y: 30,
          opacity: 0,
          ease: 'power3.out',
        },
        '-=0.7'
      );
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <ParticleBackground />

      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(74,112,169,0.15)_0%,rgba(0,0,0,0)_65%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(143,171,212,0.1)_0%,rgba(0,0,0,0)_50%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-12 md:gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left content */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge variant="primary">{profile.title}</Badge>
            </motion.div>

            {/* Headline */}
            <motion.div
              ref={headlineRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-night dark:text-sand leading-tight">
                {profile.name}
              </h1>
            </motion.div>

            {/* Subtitle/Bio */}
            <motion.div
              ref={subtitleRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl"
            >
              <p className="text-lg md:text-xl text-sand/70 leading-relaxed">
                {profile.bio || 'Full Stack Developer passionate about creating beautiful and functional web experiences.'}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/projects">
                <Button size="lg" variant="primary">
                  View My Work
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary">
                  Get In Touch
                </Button>
              </Link>
            </motion.div>

            {/* Social Links */}
            {socials.length > 0 && (
              <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {socials.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sand/10 border border-sand/20 text-sand hover:bg-sand/20 hover:border-sand/40 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.platform}
                  >
                    <span className="text-lg">{getSocialIcon(social.icon || social.platform)}</span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right content - 3D Model */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ThreeDModel />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-sand/50">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-sand/30 rounded-full flex items-center justify-center">
              <motion.div
                className="w-1 h-2 bg-sand/50 rounded-full"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper function to get social media icons
function getSocialIcon(iconName) {
  const icons = {
    github: '💻',
    linkedin: '🔗',
    twitter: '𝕏',
    instagram: '📷',
    email: '✉️',
    portfolio: '🌐',
    codepen: '✏️',
    behance: '🎨',
  };

  return icons[iconName?.toLowerCase()] || '🔗';
}

export default Hero;
