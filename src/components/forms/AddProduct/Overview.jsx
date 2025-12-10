import React, { useState } from "react";

export default function Overview() {
const product = {
  title: "Amrutam Amla Churna | Ayurvedic Anti-Oxidant",
  price: 2820,
  mainImage: "/assets/churna.png",

  packOptions: [
    { weight: "170 GM", duration: "1 Month • 1 Jar", price: 329 },
    { weight: "200 GM", duration: "2 Month • 2 Jar", price: 711 },
    { weight: "3 × 400 GM", duration: "3 Month • 3 Jar", price: 3636 },
  ],

  description:
    "Amrutam’s Amla Churna is a pure and authentic Ayurvedic recipe rich in Vitamin C...",

  primaryBenefits: [
    "Reduces Hair Fall",
    "Treats Scalp Health",
    "Improves Blood Circulation",
    "Promotes Hair Growth",
    "Repairs Damaged Hair",
    "Treats Dry and Frizzy Hair",
    "Makes Hair Soft & Voluminous",
  ],

  secondaryBenefits: [
    "Reduces Stress",
    "Aids in Digestion",
    "Boosts the Immune System",
    "Reduces Anxiety",
  ],

  dosage: "1 Teaspoon Daily | Empty Stomach",

  usage: ["Shampoo | Twice a week", "Oil | Twice a week", "Soil | Twice a week"],

  ingredients: [
    { name: "Bhringaraj", image: "/img/b.png" },
    { name: "Sariva", image: "/img/s.png" },
    { name: "Guduchi", image: "/img/g.png" },
    { name: "Jatamansi", image: "/img/j.png" },
  ],

  duration: "3–6 month minimum",
};

  const [view, setView] = useState("mobile");

  return (
    <div className="w-full max-w-6xl mx-auto">

      {/* ------------------ Tabs ------------------ */}
      <div className="flex items-center gap-3 mb-4 bg-gray-100 p-2 rounded-lg w-fit">
        
        <button
          onClick={(e) => {e.preventDefault();setView("mobile")}}
          className={`px-4 py-2 rounded-lg text-sm font-medium 
            ${view === "mobile" ? "bg-white shadow-md" : "text-gray-600"}`}
        >
          Mobile View
        </button>

        <button
        type="button"
          onClick={() => setView("desktop")}
          className={`px-4 py-2 rounded-lg text-sm font-medium 
            ${view === "desktop" ? "bg-white shadow-md" : "text-gray-600"}`}
        >
          Desktop View
        </button>

      </div>

      {/* ------------------ View Container ------------------ */}
      <div
        className={`border-2 rounded-xl p-5 ${
          view === "mobile" ? "max-w-sm mx-auto border-blue-500" : "border-green-500"
        }`}
      >
        {/* Render the product layout */}
        <ProductDetailLayout product={product} mode={view} />
      </div>

    </div>
  );
}

function ProductDetailLayout({ product, mode }) {
  return (
    <div
      className={
        mode === "desktop"
          ? "flex flex-col gap-8 max-w-4xl mx-auto"
          : "flex flex-col gap-6"
      }
    >
      {/* IMAGE + TITLE SECTION */}
      <div
        className={`flex ${
          mode === "desktop"
            ? "flex-row gap-6"
            : "flex-col gap-4"
        }`}
      >
        {/* Image */}
        <div className={mode === "desktop" ? "w-1/2" : "w-full"}>
          <img
            src={product.mainImage}
            alt=""
            className="rounded-xl w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className={mode === "desktop" ? "w-1/2" : "w-full"}>
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="text-2xl font-bold mt-2">₹ {product.price}</p>

          {/* Pack Options */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {product.packOptions?.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 text-center shadow-sm"
              >
                <p className="font-semibold">{item.weight}</p>
                <p className="text-xs text-gray-500">{item.duration}</p>
                <p className="font-bold mt-1">₹ {item.price}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-4">{product.description}</p>
        </div>
      </div>

      {/* PRIMARY BENEFITS */}
      <Section title="Primary Benefits">
        <ul className="space-y-2">
          {product.primaryBenefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-2 h-2 mt-2 bg-green-600 rounded-full"></span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* SECONDARY BENEFITS */}
      <Section title="Secondary Benefits">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.secondaryBenefits.map((b, i) => (
            <div className="flex flex-col items-center text-center" key={i}>
              <div className="text-2xl">✨</div>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DOSAGE */}
      <Section title="Dosage">
        <p>{product.dosage}</p>
      </Section>

      {/* USAGE */}
      <Section title="Usage">
        <ul className="space-y-1">
          {product.usage.map((u, i) => (
            <li key={i}>• {u}</li>
          ))}
        </ul>
      </Section>

      {/* INGREDIENTS */}
      <Section title="Primary Ingredients">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.ingredients.map((ing, i) => (
            <div
              key={i}
              className="border rounded-lg p-3 flex flex-col items-center"
            >
              <img
                src={ing.image}
                className="w-16 h-16 object-cover rounded-md"
              />
              <p className="mt-2 font-medium">{ing.name}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DURATION */}
      <Section title="Duration">
        <p>{product.duration}</p>
      </Section>

      {/* ADD TO CART */}
      <button className="w-full bg-green-600 text-white py-3 rounded-lg">
        Add to Cart
      </button>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}
