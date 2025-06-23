/* import React, { useState } from "react";
import { LuGavel } from "react-icons/lu";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const legalTips = [
	{
		title: "Your Right to a Free Credit Report",
		summary: "You are entitled to one free credit report per year in SA.",
		details:
			<>Under the National Credit Act (NCA), every South African citizen has the right to request one free credit report per year from a registered credit bureau (e.g., TransUnion, Experian). This helps you spot errors and take control of your credit profile.<br/>
			<a href="https://www.ncr.org.za/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">National Credit Regulator (NCR)</a></>
	},
	{
		title: "Debt Collection & Harassment",
		summary: "Collectors must follow legal rules — no intimidation.",
		details:
			<>The National Credit Act and Debt Collectors Act prohibit debt collectors from using threats or harassment. They must be registered and may not contact you between 9 PM and 6 AM without permission.<br/>
			<a href="https://www.justice.gov.za/legislation/acts/1998-114.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Debt Collectors Act</a></>
	},
	{
		title: "Privacy and POPIA Compliance",
		summary: "You have control over your personal financial data.",
		details:
			<>The Protection of Personal Information Act (POPIA) gives you the right to know why your data is collected, who it's shared with, and to object or request deletion of your info. Any financial service collecting your data must comply.<br/>
			<a href="https://www.justice.gov.za/inforeg/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Information Regulator (POPIA)</a></>
	},
	{
		title: "Fair Contract Terms",
		summary: "You can challenge unfair or unclear terms.",
		details:
			<>The Consumer Protection Act protects you from unfair, unreasonable, or unjust contract terms. You have the right to clear language, proper disclosures, and to cancel certain contracts within 5 days under the cooling-off rule.<br/>
			<a href="https://www.gov.za/documents/consumer-protection-act" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Consumer Protection Act</a></>
	},
	{
		title: "Disputing Credit Report Errors",
		summary: "You can dispute incorrect information on your credit report.",
		details:
			<>If you find errors on your credit report, you have the right to dispute them with the credit bureau. The bureau must investigate and correct any inaccuracies within 20 business days.<br/>
			<a href="https://www.transunion.co.za/credit-disputes" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">TransUnion Disputes</a></>
	},
	{
		title: "SARS Tax Compliance",
		summary: "You must file annual tax returns if you earn above the threshold.",
		details:
			<>The South African Revenue Service (SARS) requires individuals who earn above a certain threshold to file annual tax returns. Non-compliance can result in penalties.<br/>
			<a href="https://www.sars.gov.za/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">SARS Official Site</a></>
	},
	{
		title: "National Credit Regulator Complaints",
		summary: "You can lodge complaints about credit providers or bureaus.",
		details:
			<>If you have issues with a credit provider or bureau, you can lodge a complaint with the National Credit Regulator.<br/>
			<a href="https://www.ncr.org.za/index.php/consumers/complaints" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">NCR Complaints</a></>
	},
	{
		title: "Financial Services Conduct Authority (FSCA)",
		summary: "The FSCA regulates financial institutions and products.",
		details:
			<>The FSCA oversees the conduct of financial institutions to protect consumers. You can check if a provider is registered or lodge a complaint.<br/>
			<a href="https://www.fsca.co.za/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">FSCA Official Site</a></>
	},
	{
		title: "Small Claims Court",
		summary: "You can resolve small financial disputes affordably.",
		details:
			<>The Small Claims Court allows you to resolve disputes up to R20,000 without a lawyer. It’s a quick and affordable way to claim money owed.<br/>
			<a href="https://www.justice.gov.za/scc/scc.htm" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] underline">Small Claims Court Info</a></>
	},
];

const generateLoanAgreement = (borrower, lender, amount, interest, repayment, lateFee, defaultClause, collateral, date, dueDate, purpose, prepayment) => {
	const doc = new jsPDF();
	doc.setFontSize(14);
	doc.text("Simple Loan Agreement", 20, 20);
	doc.setFontSize(11);
	let y = 30;
	doc.text(`This agreement is made between:`, 20, y);
	y += 8;
	doc.text(`Lender: ${lender}`, 20, y);
	y += 8;
	doc.text(`Borrower: ${borrower}`, 20, y);
	y += 8;
	doc.text(`Date: ${date}`, 20, y);
	y += 8;
	doc.text(`Loan Amount: R${amount}`, 20, y);
	y += 8;
	if (purpose) { doc.text(`Purpose: ${purpose}`, 20, y); y += 8; }
	if (interest) { doc.text(`Interest Rate: ${interest}`, 20, y); y += 8; }
	if (repayment) { doc.text(`Repayment Schedule: ${repayment}`, 20, y); y += 8; }
	if (prepayment) { doc.text(`Prepayment: ${prepayment}`, 20, y); y += 8; }
	if (lateFee) { doc.text(`Late Payment: ${lateFee}`, 20, y); y += 8; }
	if (defaultClause) { doc.text(`Default: ${defaultClause}`, 20, y); y += 8; }
	if (collateral) { doc.text(`Collateral: ${collateral}`, 20, y); y += 8; }
	doc.text(`Governing Law: This agreement is governed by the laws of South Africa.`, 20, y); y += 12;
	doc.text(`Both parties agree to the terms above. Signed on ${date}.`, 20, y); y += 12;
	doc.text("Lender: ________________________", 20, y); y += 10;
	doc.text("Borrower: ______________________", 20, y);
	doc.save("Loan-Agreement.pdf");
};

const LegalTips = () => {
	const [activeIndex, setActiveIndex] = useState(null);
	const [showLoanForm, setShowLoanForm] = useState(false);
	const [loanForm, setLoanForm] = useState({
		lender: "",
		borrower: "",
		amount: "",
		interest: "",
		repayment: "",
		lateFee: "",
		defaultClause: "",
		collateral: "",
		date: "",
		dueDate: "",
		purpose: "",
		prepayment: "",
	});
	const navigate = useNavigate();

	const toggleIndex = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	const handleLoanFormChange = (e) => {
		setLoanForm({ ...loanForm, [e.target.name]: e.target.value });
	};

	return (
		<div style={{ background: "#f0fdf4", minHeight: "100vh", position: "relative" }}>
			<div className="max-w-4xl mx-auto px-0 py-10">
				<h2
					className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2"
					style={{ color: "var(--color-primary)" }}
				>
					<span
						className="text-3xl"
						role="img"
						aria-label="Justice"
					>
						⚖️
					</span>
					Know Your Financial Rights
				</h2>
				<div className="space-y-4">
					{legalTips.map((tip, index) => (
						<div
							key={index}
							className="rounded-2xl p-5 transition-all"
							style={{
								background: "var(--color-card)",
								color: "var(--color-text)",
								border: "1px solid var(--color-border)",
								boxShadow: "var(--color-shadow)",
							}}
						>
							<button
								onClick={() => toggleIndex(index)}
								className="w-full text-left flex justify-between items-center"
								style={{ color: "var(--color-primary)", fontWeight: 600 }}
							>
								<div>
									<h3
										className="text-xl font-semibold"
										style={{ color: "var(--color-primary)" }}
									>
										{tip.title}
									</h3>
									<p className="text-[var(--color-text-secondary)]">
										{tip.summary}
									</p>
								</div>
								<span className="text-2xl">
									{activeIndex === index ? "−" : "+"}
								</span>
							</button>
							{activeIndex === index && (
								<p
									className="mt-4 border-t pt-4"
									style={{
										color: "var(--color-text)",
										borderColor: "var(--color-border)",
									}}
								>
									{tip.details}
								</p>
							)}
						</div>
					))}
				</div>
				<div className="space-y-4 mb-10 mt-10 flex flex-col items-center">
					<button
						className="btn-primary px-6 py-2 rounded-lg font-semibold"
						onClick={() => setShowLoanForm((v) => !v)}
					>
						{showLoanForm ? "Hide Loan Agreement Template" : "Generate Loan Agreement PDF"}
					</button>
					{showLoanForm && (
						<div className="bg-white rounded-xl p-6 mt-4 shadow border border-[var(--color-border)] max-w-lg mx-auto">
							<div className="mb-3">
								<label className="block mb-1 font-medium">Lender Name</label>
								<input
									className="input-box w-full"
									name="lender"
									value={loanForm.lender}
									onChange={handleLoanFormChange}
									type="text"
									placeholder="Lender Name"
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Lender Address</label>
								<input
									className="input-box w-full"
									name="lenderAddress"
									onChange={handleLoanFormChange}
									type="text"
									placeholder="Lender Address (optional)"
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Borrower Name</label>
								<input
									className="input-box w-full"
									name="borrower"
									value={loanForm.borrower}
									onChange={handleLoanFormChange}
									type="text"
									placeholder="Borrower Name"
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Borrower Address</label>
								<input
									className="input-box w-full"
									name="borrowerAddress"
									onChange={handleLoanFormChange}
									type="text"
									placeholder="Borrower Address (optional)"
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Amount (R)</label>
								<input
									className="input-box w-full"
									name="amount"
									value={loanForm.amount}
								 onChange={handleLoanFormChange}
									type="number"
									placeholder="Amount"
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Interest Rate (%)</label>
								<input
									className="input-box w-full"
									name="interest"
									value={loanForm.interest}
									onChange={handleLoanFormChange}
									type="text"
									placeholder="e.g. 5% or 0 if none"
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Repayment Schedule</label>
								<input
									className="input-box w-full"
									name="repayment"
									value={loanForm.repayment}
									onChange={handleLoanFormChange}
									type="text"
									placeholder="e.g. Monthly, Lump sum, etc." />
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Late Payment Provisions</label>
								<input
									className="input-box w-full"
									name="lateFee"
									value={loanForm.lateFee}
									onChange={handleLoanFormChange}
									type="text"
									placeholder="e.g. R100 penalty after 7 days late"
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Default Clause</label>
								<input
									className="input-box w-full"
									name="defaultClause"
									value={loanForm.defaultClause}
									onChange={handleLoanFormChange}
									type="text"
									placeholder="e.g. Full amount due immediately on default"
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Collateral (Optional)</label>
								<input
									className="input-box w-full"
									name="collateral"
									value={loanForm.collateral}
									onChange={handleLoanFormChange}
									type="text"
									placeholder="e.g. Car, house, etc."
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Agreement Date</label>
								<input
									className="input-box w-full"
									name="date"
									value={loanForm.date}
									onChange={handleLoanFormChange}
									type="date"
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Due Date</label>
								<input
									className="input-box w-full"
									name="dueDate"
									value={loanForm.dueDate}
									onChange={handleLoanFormChange}
									type="date"
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Purpose of Loan (Optional)</label>
								<input
									className="input-box w-full"
									name="purpose"
									value={loanForm.purpose}
									onChange={handleLoanFormChange}
									type="text"
									placeholder="e.g. Home improvement, education, etc."
								/>
							</div>
							<div className="mb-3">
								<label className="block mb-1 font-medium">Prepayment Options</label>
								<input
									className="input-box w-full"
									name="prepayment"
									value={loanForm.prepayment}
									onChange={handleLoanFormChange}
									type="text"
									placeholder="e.g. Allowed without penalty"
								/>
							</div>
							<button
								className="btn-primary px-6 py-2 rounded-lg font-semibold mt-2"
								onClick={() =>
									generateLoanAgreement(
										loanForm.borrower,
										loanForm.lender,
										loanForm.amount,
										loanForm.interest,
										loanForm.repayment,
										loanForm.lateFee,
										loanForm.defaultClause,
										loanForm.collateral,
										loanForm.date,
										loanForm.dueDate,
										loanForm.purpose,
										loanForm.prepayment
									)
								}
							>
								Download PDF
							</button>
							<p className="text-xs text-[var(--color-text-secondary)] mt-4 italic">
								Note: While a simple agreement might be suitable for loans between friends or family for smaller amounts, it's always recommended to have a formal written agreement, especially for larger sums or if there are concerns about repayment.
							</p>
						</div>
					)}
				</div>
			</div>
			<span
				onClick={() => navigate("/dashboard")}
				style={{
					position: "fixed",
					left: 24,
					bottom: 24,
					color: "var(--color-primary)",
					cursor: "pointer",
					fontWeight: 600,
					fontSize: "1.1rem",
					zIndex: 100
				}}
			>
				← Back to Home
			</span>
		</div>
	);
};

export default LegalTips;
 */