import React, { useState } from "react";

const legalTips = [
  {
    title: "Your Right to a Free Credit Report",
    summary: "You are entitled to one free credit report per year in SA.",
    details:
      "Under the National Credit Act (NCA), every South African citizen has the right to request one free credit report per year from a registered credit bureau (e.g., TransUnion, Experian). This helps you spot errors and take control of your credit profile.",
  },
  {
    title: "Debt Collection & Harassment",
    summary: "Collectors must follow legal rules — no intimidation.",
    details:
      "The National Credit Act and Debt Collectors Act prohibit debt collectors from using threats or harassment. They must be registered and may not contact you between 9 PM and 6 AM without permission.",
  },
  {
    title: "Privacy and POPIA Compliance",
    summary: "You have control over your personal financial data.",
    details:
      "The Protection of Personal Information Act (POPIA) gives you the right to know why your data is collected, who it's shared with, and to object or request deletion of your info. Any financial service collecting your data must comply.",
  },
  {
    title: "Fair Contract Terms",
    summary: "You can challenge unfair or unclear terms.",
    details:
      "The Consumer Protection Act protects you from unfair, unreasonable, or unjust contract terms. You have the right to clear language, proper disclosures, and to cancel certain contracts within 5 days under the cooling-off rule.",
  },
  {
    title: "Disputing Credit Report Errors",
    summary: "You can dispute incorrect information on your credit report.",
    details:
      "If you find errors on your credit report, you have the right to dispute them with the credit bureau. The bureau must investigate and correct any inaccuracies within 20 business days.",
  },
];

const LegalTips = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">💼 Know Your Financial Rights</h2>
      <div className="space-y-4">
        {legalTips.map((tip, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-md border hover:shadow-xl transition-all"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{tip.title}</h3>
                <p className="text-gray-600">{tip.summary}</p>
              </div>
              <span className="text-2xl">{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <p className="mt-4 text-gray-700 border-t pt-4">{tip.details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalTips;
