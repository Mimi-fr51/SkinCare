import { motion } from 'framer-motion';
import React from 'react';

const Features = () => {
  return (
    <motion.section
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="p-6 border rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src="/path-to-your-image1.jpg" alt="Feature 1" className="w-full h-64 object-cover mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold">Quality Products</h3>
            <p>Our products are curated with the finest ingredients for your radiant beauty.</p>
          </motion.div>
          <motion.div
            className="p-6 border rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src="/path-to-your-image2.jpg" alt="Feature 2" className="w-full h-64 object-cover mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold">Customer Satisfaction</h3>
            <p>We offer excellent customer support and guaranteed satisfaction with every purchase.</p>
          </motion.div>
          <motion.div
            className="p-6 border rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src="/path-to-your-image3.jpg" alt="Feature 3" className="w-full h-64 object-cover mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold">Affordable Prices</h3>
            <p>Enjoy premium beauty products at a price that fits your budget.</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
