import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div
          className="w-12 h-12 flex items-center justify-center text-2xl rounded-lg"
          style={{
            background: "var(--color-card-alt)",
            color: "var(--color-primary)",
            border: "1px solid var(--color-border)",
          }}
        >
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12" />
          ) : (
            <LuImage />
          )}
        </div>

        <p
          style={{
            color: "var(--color-primary)",
            fontWeight: 500,
          }}
        >
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        <div className="relative" style={{ zIndex: 50 }}>
          <button
            className="w-7 h-7 flex items-center justify-center border rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
            style={{
              background: "var(--color-card)",
              borderColor: "var(--color-border)",
              color: "var(--color-primary)",
              boxShadow: "var(--color-shadow)",
            }}
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <div
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "1rem",
              boxShadow: "var(--color-shadow)",
              padding: "0.5rem",
            }}
          >
            <EmojiPicker
              open={isOpen}
              onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
              theme="light"
              style={{
                background: "var(--color-card)",
                color: "var(--color-text)",
                borderRadius: "1rem",
                border: "none",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
