"use client";

import React, { useState } from "react";
import AccordionItem from "@/components/common/AccordionItem";
import ActionModal from "@/components/common/ActionModal";
import Modal from "@/components/ui/Modal";

interface CategoryManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  itemType?: string; // e.g. "exercise", "lesson", "tool"
  showIntroScreenAction?: boolean;
}

export default function CategoryManagementModal({
  isOpen,
  onClose,
  categoryName,
  itemType = "item",
  showIntroScreenAction = true,
}: CategoryManagementModalProps) {
  const [items, setItems] = useState<{ id: string; title: string; description: string }[]>([
    {
      id: "1",
      title: "Morning Gratitude Reflection",
      description: "A 5-minute guided session to start your day with positive intentions and thankfulness.",
    },
    {
      id: "2",
      title: "Daily Intention Setting",
      description: "Clarify your goals for the day and align your actions with your core values.",
    },
  ]);
  
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleAddItem = (data: { title: string; description: string }) => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleAddIntroScreen = (data: { subtitle: string; sageSays: string; description: string }) => {
    console.log("Intro Screen Saved:", data);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const itemLabel = itemType.charAt(0).toUpperCase() + itemType.slice(1);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Manage ${categoryName} ${itemType}s`}
        maxWidth="max-w-3xl"
      >
        {items.length > 0 ? (
          <div className="space-y-4">
            {/* Actions Row */}
            <div className="flex justify-end items-center text-sm font-semibold text-sageGreen gap-3 mb-6">
              {showIntroScreenAction && (
                <>
                  <button onClick={() => setIsIntroModalOpen(true)} className="hover:text-[#7fa18c] transition-colors">
                    + Create Intro Screen
                  </button>
                  <span className="text-[#E5E5E5]">|</span>
                </>
              )}
              <button onClick={() => setIsAddItemModalOpen(true)} className="hover:text-[#7fa18c] transition-colors">
                + Create New {itemLabel}
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  title={item.title}
                  onEdit={() => console.log("Edit", item.id)}
                  onDelete={() => handleDeleteItem(item.id)}
                >
                  <div>
                    <p className="text-[13px] text-sageGreen mb-1">Title</p>
                    <p className="text-[14px] text-charcoal font-medium">{item.title}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-sageGreen mb-1">Description</p>
                    <p className="text-[14px] text-charcoal leading-relaxed">{item.description}</p>
                  </div>
                </AccordionItem>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
            <div className="max-w-md">
              <h3 className="text-2xl sm:text-[28px] font-cormorant text-charcoal mb-2 font-medium italic">No {itemLabel}s Yet</h3>
              <p className="text-[13px] text-grey">
                You have not added any {itemType}s yet. Start building your routine by adding {itemType}s tailored to your goals.
              </p>
            </div>
            
            {/* Placeholder Graphic */}
            <div className="flex items-end justify-center gap-2 h-24 my-6 opacity-30">
              <div className="w-6 h-12 bg-[#D3C8A5] rounded-sm"></div>
              <div className="w-6 h-16 bg-[#A1A1A1] rounded-sm"></div>
              <div className="w-6 h-20 bg-[#C1D2A4] rounded-sm"></div>
              <div className="w-6 h-14 bg-[#E5E5E5] rounded-sm"></div>
            </div>

            {/* Empty State Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              {showIntroScreenAction && (
                <button
                  onClick={() => setIsIntroModalOpen(true)}
                  className="flex-1 h-10 sm:h-12 rounded-[20px] border border-sageGreen bg-[#FBFBFB] text-xs sm:text-sm font-semibold text-sageGreen transition-colors hover:bg-green-50"
                >
                  + Create Intro Screen
                </button>
              )}
              <button
                onClick={() => setIsAddItemModalOpen(true)}
                className="flex-1 h-10 sm:h-12 rounded-[20px] bg-sageGreen text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#7fa18c]"
              >
                + Create New {itemLabel}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Nested Modals */}
      {showIntroScreenAction && (
        <ActionModal
          isOpen={isIntroModalOpen}
          onClose={() => setIsIntroModalOpen(false)}
          type="intro-screen"
          title={`Create Intro Screen for ${categoryName}`}
          categoryName={categoryName}
          onSave={handleAddIntroScreen}
        />
      )}
      
      <ActionModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        type={itemType === "exercise" ? "exercise" : "category"} // Falls back to generic category type if not exercise
        title={`Add New ${itemLabel}`}
        onSave={handleAddItem}
      />

    </>
  );
}
