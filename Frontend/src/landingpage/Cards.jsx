import React from "react";
import { motion } from "framer-motion";

export default function Cards({ title, description }) {
  return (
<motion.div
  initial={{ opacity: 0, y: 0 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: "easeIn" }}
  viewport={{ once: true }}

   className="inset-0 bg-linear-to-r from-[#777cb3]  to-[#151b3b]/70  border-3 border-white rounded-2xl p-15 shadow-lg  shadow-[#09171a] hover:scale-105 transition duration-300">
      <h2 className="text-white text-2xl font-bold mb-3">
        {title}
      </h2>
      <p className="text-blue-100">
        {description}
      </p>
    </motion.div>
  );
}
