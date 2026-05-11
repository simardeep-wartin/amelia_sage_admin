"use client";

import React, { useState } from "react";
import AccordionItem from "@/components/common/AccordionItem";
import ActionModal from "@/components/common/ActionModal";
import SidePanel from "@/components/ui/SidePanel";
import Button from "../ui/Button";

interface CategoryManagementPanelProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  itemType?: string; // e.g. "exercise", "lesson", "tool"
  showIntroScreenAction?: boolean;
}

export default function CategoryManagementPanel({
  isOpen,
  onClose,
  categoryName,
  itemType = "item",
  showIntroScreenAction = true,
}: CategoryManagementPanelProps) {
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
  const [editingItem, setEditingItem] = useState<any>(null);


  const handleAddItem = (data: { title: string; description: string }) => {
    if (editingItem) {
      setItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? { ...item, ...data } : item))
      );
    } else {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title,
        description: data.description,
      };
      setItems((prev) => [...prev, newItem]);
    }
    setEditingItem(null);
  };

  const handleAddIntroScreen = (data: { subtitle: string; sageSays: string; description: string }) => {
    console.log("Intro Screen Saved:", data);
    setEditingItem(null);
  };


  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const itemLabel = itemType.charAt(0).toUpperCase() + itemType.slice(1);

  return (
    <>
      <SidePanel
        isOpen={isOpen}
        onClose={onClose}
        title={`Manage ${categoryName} ${itemType}s`}
        width="max-w-2xl"
      >
        {items.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-end items-center text-[13px] font-semibold text-sageGreen gap-4 mb-2">
              {showIntroScreenAction && (
                <>
                  <button onClick={() => setIsIntroModalOpen(true)} className="hover:text-[#7fa18c] p-2 rounded-md cursor-pointer hover:border hover:border-[#7fa18c]">
                    + Create Intro Screen
                  </button>
                  <span className="text-[#E5E5E5] font-normal">|</span>
                </>
              )}
              <button onClick={() => setIsAddItemModalOpen(true)} className="hover:text-[#7fa18c] p-2 rounded-md cursor-pointer hover:border hover:border-[#7fa18c]">
                + Create New {itemLabel}
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  title={item.title}
                  onEdit={() => {
                    setEditingItem(item);
                    setIsAddItemModalOpen(true);
                  }}
                  onDelete={() => handleDeleteItem(item.id)}
                >

                  <div className="space-y-4 pt-2">
                    <div>
                      <p className="text-s tracking-wider text-sageGreen font-medium mb-1">Title</p>
                      <p className="text-s text-slate font-normal">{item.title}</p>
                    </div>
                    <div>
                      <p className="text-s tracking-wider text-sageGreen font-medium mb-1">Description</p>
                      <p className="text-s text-slate font-normal">{item.description}</p>
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col h-full w-full">

            {/* Top / Center Content */}
            <div className="flex flex-col items-center justify-start text-center flex-1 space-y-10">

              <div className="flex flex-col justify-start items-start gap-1">
                <h3 className="text-2xl sm:text-[32px] font-cormorant text-charcoal font-medium">
                  No {itemLabel}s Yet
                </h3>
                <p className="text-[14px] text-grey text-start">
                  You have not added any {itemType}s yet. Start building your routine by adding {itemType}s tailored to your goals.
                </p>
              </div>

              {/* Placeholder Graphic */}
              <div className="flex items-end justify-center gap-4 h-32 opacity-80">
                <div className="w-10 h-16 bg-[#F9F7F2] rounded-sm"></div>
                <div className="w-10 h-24 bg-[#F2F2F2] rounded-sm"></div>
                <div className="w-10 h-32 bg-[#F9F7F2] rounded-sm"></div>
                <div className="w-10 h-20 bg-[#F2F2F2] rounded-sm"></div>
              </div>

            </div>

            {/* Bottom Actions (Pinned) */}
            <div className="flex gap-2 justify-center pt-6">
              {showIntroScreenAction && (
                <Button
                  onClick={() => setIsIntroModalOpen(true)}
                  className="w-full"
                  variant="outline"
                >
                  + Create Intro Screen
                </Button>
              )}

              <Button
                onClick={() => setIsAddItemModalOpen(true)}
                className="w-full"
                variant="solid"
              >
                + Create New {itemLabel}
              </Button>
            </div>

          </div>
        )}
      </SidePanel>

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
        onClose={() => {
          setIsAddItemModalOpen(false);
          setEditingItem(null);
        }}
        type={itemType === "exercise" ? "exercise" : "category"}
        title={`Add New ${itemLabel}`}
        initialData={editingItem}
        onSave={handleAddItem}
      />

    </>
  );
}

