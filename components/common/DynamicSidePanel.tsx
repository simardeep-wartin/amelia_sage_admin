"use client";

import SidePanel from "@/components/ui/SidePanel";
import AccordionItem from "@/components/common/AccordionItem";
import Button from "@/components/ui/Button";
import { WELLTH_PANEL_CONFIG } from "@/lib/wellth-plans.config";
import PanelSkeleton from "@/components/loaders/panel-skeleton";
import type { PanelItem } from "@/types";

export type { PanelItem };

interface DynamicSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: PanelItem[];
  introScreen?: { intro_title: string; intro_description: string } | null;
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
            onClick={() => onAction(action.action)}
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
          onClick={() => onAction("addExercise")}
          className="hover:text-[#7fa18c] p-2 rounded-md cursor-pointer hover:border hover:border-[#7fa18c]"
        >
          + Create New Exercise
        </button>
      </div>

      {/* Intro Screen accordion */}
      {introScreen && (
        <AccordionItem title="Intro Screen" onEdit={() => onAction("addIntro")}>
          <div className="space-y-4 pt-2">
            <div>
              <p className="text-s tracking-wider text-sageGreen font-medium mb-1">Subtitle</p>
              <p className="text-s text-slate font-normal">{introScreen.intro_title}</p>
            </div>
            <div>
              <p className="text-s tracking-wider text-sageGreen font-medium mb-1">Sage Says</p>
              <p className="text-s text-slate font-normal">—</p>
            </div>
            <div>
              <p className="text-s tracking-wider text-sageGreen font-medium mb-1">Description</p>
              <p className="text-s text-slate font-normal">{introScreen.intro_description}</p>
            </div>
          </div>
        </AccordionItem>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            title={item.title}
            onEdit={() => onEditItem(item)}
            onDelete={() => onDeleteItem(item.id)}
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
    <SidePanel isOpen={isOpen} onClose={onClose} title={title} width="max-w-2xl">
      {loading ? <PanelSkeleton /> : items.length > 0 ? renderList() : renderEmptyState()}
    </SidePanel>
  );
}
