import React from 'react'
import { motion } from 'framer-motion'

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Marie L.',
      role: 'Cliente fidèle',
      content: 'Les produits ont transformé ma routine beauté. Ma peau n a jamais été aussi rayonnante !',
      rating: 5,
      avatar: '👩'
    },
    {
      name: 'Sophie M.',
      role: 'Beauty Blogger',
      content: 'Qualité exceptionnelle et résultats visibles dès la première utilisation. Je recommande !',
      rating: 5,
      avatar: '💁'
    },
    {
      name: 'Emma K.',
      role: 'Esthéticienne',
      content: 'Des formulations innovantes et respectueuses de la peau. Mes clientes adorent !',
      rating: 5,
      avatar: '👸'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les retours de nos clients satisfaits
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials