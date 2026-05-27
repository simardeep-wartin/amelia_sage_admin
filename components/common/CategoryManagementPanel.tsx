"use client";

import React, { useState, useEffect } from "react";
import AccordionItem from "@/components/common/AccordionItem";
import ActionModal from "@/components/common/ActionModal";
import SidePanel from "@/components/ui/SidePanel";
import Button from "../ui/Button";
import {
  getFeelingExercises,
  getFocusAreaExercises,
  createFeelingExercise,
  createFocusAreaExercise,
  updateFeelingExercise,
  updateFocusAreaExercise,
  deleteFeelingExercise,
  deleteFocusAreaExercise,
  updateFeelingIntroScreen,
  updateFocusAreaIntroScreen,
  type FeelingExercise,
  type FeelingIntroScreen,
} from "@/Services/api/workOnMe";
import { exercises as exercisePayloads, introScreen as introScreenPayloads } from "@/lib/payloads";

interface CategoryManagementPanelProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  /** MongoDB ObjectID of the category — used to fetch live exercises */
  categoryId?: string;
  /** Whether this panel manages a feeling or a focus-area — determines which endpoint to use */
  categoryType?: "feeling" | "focus-area";
  itemType?: string;
  showIntroScreenAction?: boolean;
}

/** Returns true for 24-character hex strings (MongoDB ObjectIDs) */
const isMongoId = (v: string) => /^[0-9a-f]{24}$/.test(v);

export default function CategoryManagementPanel({
  isOpen,
  onClose,
  categoryName,
  categoryId,
  categoryType = "feeling",
  itemType = "item",
  showIntroScreenAction = true,
}: CategoryManagementPanelProps) {
  const [items, setItems] = useState<FeelingExercise[]>([]);
  const [_introScreen, setIntroScreen] = useState<FeelingIntroScreen | null>(null);
  const [loading, setLoading] = useState(false);

  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);

  // Fetch exercises whenever the panel is opened with a valid category ID
  useEffect(() => {
    if (!isOpen || !categoryId || !isMongoId(categoryId)) return;

    setLoading(true);

    const fetcher =
      categoryType === "focus-area"
        ? getFocusAreaExercises(categoryId).then((res) => ({
            exercises: (res.data.exercises ?? []).map((ex) => ({
              id: ex.id,
              title: ex.title,
              // sub_content holds the main exercise text for focus areas
              description: ex.description,
              feeling_id: ex.focus_on_category_id,
            })) as FeelingExercise[],
            intro_screen: res.data.intro_screen,
          }))
        : getFeelingExercises(categoryId).then((res) => ({
            exercises: res.data.exercises ?? [],
            intro_screen: res.data.intro_screen,
          }));

    fetcher
      .then(({ exercises, intro_screen }) => {
        setItems(exercises);
        setIntroScreen(intro_screen ?? null);
      })
      .catch(() => {
        setItems([]);
        setIntroScreen(null);
      })
      .finally(() => setLoading(false));
  }, [isOpen, categoryId, categoryType]);

  // Clear state when panel is closed
  const handleClose = () => {
    setItems([]);
    setIntroScreen(null);
    setEditingItem(null);
    onClose();
  };

  const handleAddItem = (data: { title: string; description: string }) => {
    if (editingItem) {
      // Edit flow — PUT to API (branch by categoryType)
      if (!categoryId || !isMongoId(categoryId)) return;
      const exerciseId = editingItem.id as string;
      const payload = exercisePayloads.edit(data.title, data.description);
      const updater =
        categoryType === "focus-area"
          ? updateFocusAreaExercise(categoryId, exerciseId, payload)
          : updateFeelingExercise(categoryId, exerciseId, payload);

      updater
        .then(() => {
          setItems((prev) =>
            prev.map((item) =>
              item.id === exerciseId
                ? { ...item, title: data.title, description: data.description }
                : item,
            ),
          );
          setEditingItem(null);
          setIsAddItemModalOpen(false);
        })
        .catch(console.error);
    } else {
      // Create flow — POST to API (branch by categoryType)
      if (!categoryId || !isMongoId(categoryId)) return;
      const payload = exercisePayloads.create(data.title, data.description);
      const creator =
        categoryType === "focus-area"
          ? createFocusAreaExercise(categoryId, payload).then((res) => ({
              id: res.data.id,
              title: res.data.title,
              description: res.data.description,
              feeling_id: res.data.focus_on_category_id,
            }))
          : createFeelingExercise(categoryId, payload).then((res) => res.data);

      creator
        .then((newItem) => {
          setItems((prev) => [...prev, newItem as FeelingExercise]);
          setIsAddItemModalOpen(false);
        })
        .catch(console.error);
    }
  };

  const handleAddIntroScreen = (data: {
    subtitle: string;
    sageSays: string;
    description: string;
  }) => {
    if (!categoryId || !isMongoId(categoryId)) return;
    const payload = introScreenPayloads.update(data.subtitle, data.sageSays, data.description);
    const updater =
      categoryType === "focus-area"
        ? updateFocusAreaIntroScreen(categoryId, payload)
        : updateFeelingIntroScreen(categoryId, payload);

    updater
      .then(() => {
        setIntroScreen({
          subtitle: payload.subtitle,
          sage_says: payload.sage_says,
          description: payload.description,
        });
        setIsIntroModalOpen(false);
      })
      .catch(console.error);
  };

  const handleDeleteItem = (exerciseId: string) => {
    if (!categoryId || !isMongoId(categoryId)) return;
    const previous = items;
    setItems((prev) => prev.filter((item) => item.id !== exerciseId));
    const deleter =
      categoryType === "focus-area"
        ? deleteFocusAreaExercise(categoryId, exerciseId)
        : deleteFeelingExercise(categoryId, exerciseId);
    deleter.catch(() => setItems(previous)); // rollback on failure
  };

  const itemLabel = itemType.charAt(0).toUpperCase() + itemType.slice(1);

  return (
    <>
      <SidePanel
        isOpen={isOpen}
        onClose={handleClose}
        title={`Manage ${categoryName} ${itemType}s`}
        width="max-w-2xl"
      >
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <span className="text-sm text-grey animate-pulse">Loading {itemType}s…</span>
          </div>
        ) : items.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-end items-center text-[13px] font-semibold text-sageGreen gap-4 mb-2">
              {showIntroScreenAction && (
                <>
                  <button
                    onClick={() => setIsIntroModalOpen(true)}
                    className="hover:text-[#7fa18c] p-2 rounded-md cursor-pointer hover:border hover:border-[#7fa18c]"
                  >
                    + Create Intro Screen
                  </button>
                  <span className="text-[#E5E5E5] font-normal">|</span>
                </>
              )}
              <button
                onClick={() => setIsAddItemModalOpen(true)}
                className="hover:text-[#7fa18c] p-2 rounded-md cursor-pointer hover:border hover:border-[#7fa18c]"
              >
                + Create New {itemLabel}
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  title={item.title}
                  onEdit={() => {
                    setEditingItem({
                      id: item.id,
                      title: item.title,
                      description: item.description,
                    });
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
                      <p className="text-s tracking-wider text-sageGreen font-medium mb-1">
                        Description
                      </p>
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
            <div className="flex flex-col items-center justify-start text-center flex-1 space-y-10">
              <div className="flex flex-col justify-start items-start gap-1">
                <h3 className="text-2xl sm:text-[32px] font-cormorant text-charcoal font-medium">
                  No {itemLabel}s Yet
                </h3>
                <p className="text-[14px] text-grey text-start">
                  You have not added any {itemType}s yet. Start building your routine by adding{" "}
                  {itemType}s tailored to your goals.
                </p>
              </div>

              <div className="flex items-end justify-center gap-4 h-32 opacity-80">
                <div className="w-10 h-16 bg-[#F9F7F2] rounded-sm"></div>
                <div className="w-10 h-24 bg-[#F2F2F2] rounded-sm"></div>
                <div className="w-10 h-32 bg-[#F9F7F2] rounded-sm"></div>
                <div className="w-10 h-20 bg-[#F2F2F2] rounded-sm"></div>
              </div>
            </div>

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
        initialData={editingItem ?? undefined}
        onSave={handleAddItem}
      />
    </>
  );
}
