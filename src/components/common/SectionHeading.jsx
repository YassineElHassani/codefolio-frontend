import { motion } from 'framer-motion';
import Badge from './Badge';

const SectionHeading = ({ eyebrow, title, description, subtitle }) => {
  return (
    <motion.header
      className="max-w-3xl space-y-4 mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <Badge variant="primary">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-night dark:text-sand">{title}</h2>
      {(description || subtitle) && (
        <p className="text-lg text-sand/70 leading-relaxed max-w-2xl">
          {description || subtitle}
        </p>
      )}
    </motion.header>
  );
};

export default SectionHeading;
