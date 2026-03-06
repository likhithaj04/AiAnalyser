import React from "react";

export default function Cards({ title, description }) {
  return (
    <div className="bg-blue-900 border-4 border-white rounded-2xl p-15 shadow-lg hover:scale-105 transition duration-300">
      <h2 className="text-white text-2xl font-bold mb-3">
        {title}
      </h2>
      <p className="text-blue-100">
        {description}
      </p>
    </div>
  );
}