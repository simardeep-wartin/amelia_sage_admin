"use client";

import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import PanelSkeleton from "@/components/loaders/panel-skeleton";
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
  categoryId?: string;
  categoryType?: "feeling" | "focus-area";
  itemType?: string;
  showIntroScreenAction?: boolean;
}

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
  const [introScreen, setIntroScreen] = useState<FeelingIntroScreen | null>(null);
  const [loading, setLoading] = useState(false);
  const [exercisesLoading, setExercisesLoading] = useState(false);

  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [isEditingIntro, setIsEditingIntro] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [showIntroRequired, setShowIntroRequired] = useState(false);
  const [editingItem, setEditingItem] = useState<Record<string, unknown> | null>(null);

  const handleOpenAddItem = () => {
    if (showIntroScreenAction && !introScreen) {
      setShowIntroRequired(true);
    } else {
      setIsAddItemModalOpen(true);
    }
  };

  const fetchExercises = (showFullLoader = false) => {
    if (!categoryId || !isMongoId(categoryId)) return;
    if (showFullLoader) setLoading(true);
    else setExercisesLoading(true);

    const fetcher =
      categoryType === "focus-area"
        ? getFocusAreaExercises(categoryId).then((res) => ({
            exercises: (res.data.exercises ?? []).map((ex) => ({
              id: ex.id,
              title: ex.title,
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
      .finally(() => {
        setLoading(false);
        setExercisesLoading(false);
      });
  };

  useEffect(() => {
    if (!isOpen || !categoryId || !isMongoId(categoryId)) return;
    fetchExercises(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, categoryId, categoryType]);

  const handleClose = () => {
    setItems([]);
    setIntroScreen(null);
    setEditingItem(null);
    onClose();
  };

  const handleAddItem = (data: Record<string, unknown>) => {
    const title = data.title as string;
    const description = data.description as string;
    const isDraft = (data.is_draft as boolean) ?? false;
    if (editingItem) {
      if (!categoryId || !isMongoId(categoryId)) return;
      const exerciseId = editingItem.id as string;
      const payload = exercisePayloads.edit(title, description, isDraft);
      const updater =
        categoryType === "focus-area"
          ? updateFocusAreaExercise(categoryId, exerciseId, payload)
          : updateFeelingExercise(categoryId, exerciseId, payload);

      updater
        .then(() => {
          setItems((prev) =>
            prev.map((item) => (item.id === exerciseId ? { ...item, title, description } : item)),
          );
          setEditingItem(null);
          setIsAddItemModalOpen(false);
        })
        .catch(console.error);
    } else {
      if (!categoryId || !isMongoId(categoryId)) return;
      const payload = exercisePayloads.create(title, description, isDraft);
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
        .then(() => {
          setIsAddItemModalOpen(false);
          fetchExercises();
        })
        .catch(console.error);
    }
  };

  const handleSaveIntroScreen = (data: Record<string, unknown>) => {
    if (!categoryId || !isMongoId(categoryId)) return;
    const payload = introScreenPayloads.update(
      data.subtitle as string,
      data.sageSays as string,
      data.description as string,
      (data.is_draft as boolean) ?? false,
    );
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
        setIsEditingIntro(false);
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
    deleter.catch(() => setItems(previous));
  };

  const openCreateIntro = () => {
    setIsEditingIntro(false);
    setIsIntroModalOpen(true);
  };

  const openEditIntro = () => {
    setIsEditingIntro(true);
    setIsIntroModalOpen(true);
  };

  const itemLabel = itemType.charAt(0).toUpperCase() + itemType.slice(1);

  const introInitialData = introScreen
    ? {
        subtitle: introScreen.subtitle,
        sageSays: introScreen.sage_says,
        description: introScreen.description,
      }
    : undefined;

  return (
    <>
      <SidePanel
        isOpen={isOpen}
        onClose={handleClose}
        title={`Manage ${categoryName} ${itemType}s`}
        width="max-w-2xl"
      >
        {loading ? (
          <PanelSkeleton />
        ) : (
          <div className="space-y-6">
            {/* Action buttons */}
            <div className="flex justify-end items-center text-[13px] font-semibold text-sageGreen gap-4">
              {showIntroScreenAction && (
                <>
                  <button
                    onClick={introScreen ? openEditIntro : openCreateIntro}
                    className="hover:text-[#7fa18c] p-2 rounded-md cursor-pointer hover:border hover:border-[#7fa18c]"
                  >
                    {introScreen ? (
                      <span className="flex items-center gap-1.5">
                        <PencilSquareIcon className="h-4 w-4" />
                        Edit Intro Screen
                      </span>
                    ) : (
                      "+ Create Intro Screen"
                    )}
                  </button>
                  <span className="text-[#E5E5E5] font-normal">|</span>
                </>
              )}
              <button
                onClick={handleOpenAddItem}
                className="hover:text-[#7fa18c] p-2 rounded-md cursor-pointer hover:border hover:border-[#7fa18c]"
              >
                + Create New {itemLabel}
              </button>
            </div>

            {/* Intro Screen accordion (shown when data exists) */}
            {introScreen && showIntroScreenAction && (
              <AccordionItem
                title="Intro Screen"
                onEdit={openEditIntro}
                onDelete={() => setIntroScreen(null)}
              >
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="text-s tracking-wider text-sageGreen font-medium mb-1">
                      Subtitle
                    </p>
                    <p className="text-s text-slate font-normal">{introScreen.subtitle}</p>
                  </div>
                  <div>
                    <p className="text-s tracking-wider text-sageGreen font-medium mb-1">
                      Sage Says
                    </p>
                    <p className="text-s text-slate font-normal">{introScreen.sage_says}</p>
                  </div>
                  <div>
                    <p className="text-s tracking-wider text-sageGreen font-medium mb-1">
                      Description
                    </p>
                    <p className="text-s text-slate font-normal">{introScreen.description}</p>
                  </div>
                </div>
              </AccordionItem>
            )}

            {/* Exercises list */}
            {exercisesLoading ? (
              <div className="space-y-3">
                {Array.from({ length: items.length || 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[52px] animate-pulse rounded-xl border border-cardBorder bg-[#F3F4F6]"
                    style={{ animationDelay: `${i * 60}ms` }}
                  />
                ))}
              </div>
            ) : items.length > 0 ? (
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
                        <p className="text-s tracking-wider text-sageGreen font-medium mb-1">
                          Title
                        </p>
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
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
                <div>
                  <h3 className="text-2xl sm:text-[32px] font-cormorant text-charcoal font-medium">
                    No {itemLabel}s Yet
                  </h3>
                  <p className="text-[14px] text-grey mt-1">
                    You have not added any {itemType}s yet.
                  </p>
                </div>
                <div className="flex items-end justify-center gap-4 h-24 opacity-60">
                  <div className="w-10 h-16 bg-[#F9F7F2] rounded-sm" />
                  <div className="w-10 h-24 bg-[#F2F2F2] rounded-sm" />
                  <div className="w-10 h-16 bg-[#F9F7F2] rounded-sm" />
                  <div className="w-10 h-20 bg-[#F2F2F2] rounded-sm" />
                </div>
                {showIntroScreenAction && !introScreen && (
                  <Button onClick={openCreateIntro} className="w-full" variant="outline">
                    + Create Intro Screen
                  </Button>
                )}
                <Button onClick={handleOpenAddItem} className="w-full" variant="solid">
                  + Create New {itemLabel}
                </Button>
              </div>
            )}
          </div>
        )}
      </SidePanel>

      {showIntroScreenAction && (
        <ActionModal
          isOpen={isIntroModalOpen}
          onClose={() => {
            setIsIntroModalOpen(false);
            setIsEditingIntro(false);
          }}
          type="intro-screen"
          title={
            isEditingIntro
              ? `Edit Intro Screen for ${categoryName}`
              : `Create Intro Screen for ${categoryName}`
          }
          initialData={introInitialData as Record<string, unknown> | undefined}
          onSave={handleSaveIntroScreen}
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

      {/* Intro screen required warning */}
      {showIntroRequired && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="text-amber-500"
              >
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-1">Intro Screen Required</h3>
              <p className="text-sm text-grey">
                Please create an Intro Screen for <strong>{categoryName}</strong> before adding
                exercises.
              </p>
            </div>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => setShowIntroRequired(false)}
                className="flex-1 h-10 rounded-lg border border-border text-sm font-semibold text-slate hover:bg-softstone transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowIntroRequired(false);
                  openCreateIntro();
                }}
                className="flex-1 h-10 rounded-lg bg-sageGreen text-sm font-semibold text-white hover:bg-[#7fa18c] transition-colors"
              >
                Create Intro Screen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
