"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Leaf, Flower, Trees, TentTree } from "lucide-react";
import { LinkData } from "../utils/discordApi";

interface LinkCardProps {
  link: LinkData;
  design: "tilted" | "layered" | "polaroid";
}

const plantTypes = [
  { icon: Leaf, color: "text-emerald-600" },
  { icon: Flower, color: "text-pink-600" },
  { icon: TentTree, color: "text-blue-600" },
  { icon: Trees, color: "text-red-600" },
];

const gradients = [
  "from-emerald-50 to-teal-100",
  "from-sky-50 to-indigo-100",
  "from-rose-50 to-pink-100",
];

export default function LinkCard({ link, design }: LinkCardProps) {
  const { icon: PlantIcon, color } =
    plantTypes[Math.floor(Math.random() * plantTypes.length)];
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];

  const cardContent = (
    <>
      <div className="flex items-center mb-2">
        <PlantIcon className={`w-5 h-5 mr-2 ${color}`} />
        <h3 className="text-lg font-semibold truncate">{link.title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{link.url}</p>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Visit <ExternalLink className="ml-1" size={14} />
      </a>
    </>
  );

  if (design === "tilted") {
    return (
      <motion.div
        whileHover={{ scale: 1.05, rotate: 0 }}
        className="group h-full"
        style={{ transformOrigin: "center" }}
      >
        <div
          className={`bg-gradient-to-br ${gradient} p-5 rounded-lg shadow-md overflow-hidden transition-all duration-300 transform -rotate-1 group-hover:rotate-0 h-full`}
        >
          {cardContent}
        </div>
      </motion.div>
    );
  }

  if (design === "layered") {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="group relative h-full"
      >
        <div className="absolute inset-0 bg-white rounded-lg shadow-md transform rotate-3"></div>
        <div className="absolute inset-0 bg-gray-50 rounded-lg shadow-md transform -rotate-3"></div>
        <div className="relative bg-white p-5 rounded-lg shadow-md z-10">
          {cardContent}
        </div>
      </motion.div>
    );
  }

  if (design === "polaroid") {
    return (
      <motion.div
        whileHover={{ scale: 1.05, rotate: 0 }}
        className="group bg-white p-3 shadow-md h-full"
        style={{ transformOrigin: "center" }}
      >
        <div
          className={`bg-gradient-to-br ${gradient} h-32 mb-4 rounded-sm`}
        ></div>
        <div className="px-2">{cardContent}</div>
      </motion.div>
    );
  }

  return null;
}
