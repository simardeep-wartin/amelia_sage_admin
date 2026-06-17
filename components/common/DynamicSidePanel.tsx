"use client";

import { useState } from "react";
import SidePanel from "@/components/ui/SidePanel";
import AccordionItem from "@/components/common/AccordionItem";
import Button from "@/components/ui/Button";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { WELLTH_PANEL_CONFIG } from "@/lib/wellth-plans.config";
import PanelSkeleton from "@/components/loaders/panel-skeleton";
import type { PanelItem } from "@/types";

export type { PanelItem };

interface DynamicSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: PanelItem[];
  introScreen?: {
    greet: string;
    sub_content: string;
    description: string;
    intro_title: string;
    intro_description: string;
    focused_intentions: string[];
  } | null;
  loading?: boolean;
  onAction: (action: string) => void;
  onEditItem: (item: PanelItem) => void;
  onDeleteItem: (id: string) => void;
}

export default function DynamicSidePanel({
  isOpen,
  onClose,
  title,
  items,
  introScreen,
  loading = false,
  onAction,
  onEditItem,
  onDeleteItem,
}: DynamicSidePanelProps) {
  const config = WELLTH_PANEL_CONFIG;
  const [showIntroRequired, setShowIntroRequired] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);

  const handleAddExercise = () => {
    if (!introScreen) {
      setShowIntroRequired(true);
    } else {
      onAction("addExercise");
    }
  };

  const renderEmptyState = () => (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col items-center justify-start text-center flex-1 space-y-10">
        <div className="flex flex-col justify-start items-start gap-1 w-full text-left">
          <h3 className="text-2xl sm:text-[32px] font-cormorant text-charcoal font-medium">
            {config.emptyState.title}
          </h3>
          <p className="text-[14px] text-grey">{config.emptyState.description}</p>
        </div>

        {/* Placeholder Graphic */}
        <div className="flex items-end justify-center gap-4 h-32 opacity-80">
          <div className="w-10 h-16 bg-[#F9F7F2] rounded-sm"></div>
          <div className="w-10 h-24 bg-[#F2F2F2] rounded-sm"></div>
          <div className="w-10 h-32 bg-[#F9F7F2] rounded-sm"></div>
          <div className="w-10 h-20 bg-[#F2F2F2] rounded-sm"></div>
        </div>
      </div>

      <div className="flex gap-2 justify-center pt-6">
        {config.emptyState.actions.map((action, idx) => (
          <Button
            key={idx}
            variant={action.variant}
            onClick={() =>
              action.action === "addExercise" ? handleAddExercise() : onAction(action.action)
            }
            className="w-full"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderList = () => (
    <div className="space-y-6">
      <div className="flex justify-end items-center text-[13px] font-semibold text-sageGreen gap-4 mb-2">
        <button
          onClick={() => onAction("addIntro")}
          className="hover:text-[#7fa18c] p-2 rounded-md cursor-pointer hover:border hover:border-[#7fa18c]"
        >
          {introScreen ? "Edit Intro Screen" : "+ Create Intro Screen"}
        </button>
        <span className="text-[#E5E5E5] font-normal">|</span>
        <button
          onClick={handleAddExercise}
          className="hover:text-[#7fa18c] p-2 rounded-md cursor-pointer hover:border hover:border-[#7fa18c]"
        >
          + Create New Exercise
        </button>
      </div>

      {/* Intro Screen accordion */}
      {introScreen && (
        <AccordionItem title="Intro Screen" onEdit={() => onAction("addIntro")}>
          <div className="space-y-4 pt-2">
            {/* Intro Screen tab fields */}
            <div>
              <p className="text-s tracking-wider text-sageGreen font-medium mb-1">Subtitle</p>
              <p className="text-s text-slate font-normal">{introScreen.greet || "—"}</p>
            </div>
            <div>
              <p className="text-s tracking-wider text-sageGreen font-medium mb-1">Sage Says</p>
              <p className="text-s text-slate font-normal">{introScreen.sub_content}</p>
            </div>
            <div>
              <p className="text-s tracking-wider text-sageGreen font-medium mb-1">Description</p>
              <p className="text-s text-slate font-normal">{introScreen.description}</p>
            </div>

            {/* Sub-intro Screen tab fields */}
            {introScreen.intro_title && (
              <div>
                <p className="text-s tracking-wider text-sageGreen font-medium mb-1">
                  Sub-intro Title
                </p>
                <p className="text-s text-slate font-normal">{introScreen.intro_title}</p>
              </div>
            )}
            {introScreen.intro_description && (
              <div>
                <p className="text-s tracking-wider text-sageGreen font-medium mb-1">
                  Sub-intro Description
                </p>
                <p className="text-s text-slate font-normal">{introScreen.intro_description}</p>
              </div>
            )}
            {introScreen.focused_intentions?.length > 0 && (
              <div>
                <p className="text-s tracking-wider text-sageGreen font-medium mb-2">
                  Focused Intentions
                </p>
                <ul className="space-y-1">
                  {introScreen.focused_intentions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-s text-slate font-normal">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sageGreen" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </AccordionItem>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            title={item.title}
            onEdit={() => onEditItem(item)}
            onDelete={() => setPendingDelete({ id: item.id, title: item.title })}
          >
            <div className="space-y-4 pt-2">
              <div>
                <p className="text-s tracking-wider text-sageGreen font-medium mb-1 uppercase">
                  Title
                </p>
                <p className="text-s text-slate font-normal">{item.title}</p>
              </div>
              {item.subtitle && (
                <div>
                  <p className="text-s tracking-wider text-sageGreen font-medium mb-1 uppercase">
                    Subtitle
                  </p>
                  <p className="text-s text-slate font-normal">{item.subtitle}</p>
                </div>
              )}
              <div>
                <p className="text-s tracking-wider text-sageGreen font-medium mb-1 uppercase">
                  Description
                </p>
                <p className="text-s text-slate font-normal">{item.description}</p>
              </div>
            </div>
          </AccordionItem>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <SidePanel isOpen={isOpen} onClose={onClose} title={title} width="max-w-2xl">
        {loading ? <PanelSkeleton /> : items.length > 0 ? renderList() : renderEmptyState()}
      </SidePanel>

      <DeleteConfirmationModal
        isOpen={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) return;
          onDeleteItem(pendingDelete.id);
          setPendingDelete(null);
        }}
        itemName={pendingDelete?.title ?? ""}
      />

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
                Please create an Intro Screen before adding exercises.
              </p>
            </div>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => setShowIntroRequired(false)}
                className="flex-1 h-10 rounded-lg border border-border text-sm font-semibold text-slate hover:bg-softstone transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowIntroRequired(false);
                  onAction("addIntro");
                }}
                className="flex-1 h-10 rounded-lg bg-sageGreen text-sm font-semibold text-white hover:bg-[#7fa18c] transition-colors cursor-pointer"
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
