"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ExerciseAccordionItem, { ExerciseData } from "./ExerciseAccordionItem";
import CreateIntroScreenModal from "./CreateIntroScreenModal";
import AddExerciseModal from "./AddExerciseModal";

interface ManageCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
}

export default function ManageCategoryModal({
  isOpen,
  onClose,
  categoryName,
}: ManageCategoryModalProps) {
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);

  // For simplicity, we just add new exercises to the list
  const handleAddExercise = (data: { title: string; description: string }) => {
    const newExercise: ExerciseData = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description,
    };
    setExercises((prev) => [...prev, newExercise]);
  };

  const handleAddIntroScreen = (data: { subtitle: string; sageSays: string; description: string }) => {
    // In a real app, this might be saved separately. For now, we just close the modal.
    console.log("Intro Screen Saved:", data);
  };

  const handleDeleteExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
        <div className="w-full max-w-3xl rounded-[20px] bg-[#FBFBFB] shadow-lg flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-[#E5E5E5]">
            <h2 className="text-lg sm:text-xl font-bold text-charcoal">Manage {categoryName} exercises</h2>
            <button
              onClick={onClose}
              className="text-grey hover:text-charcoal transition-colors p-1 rounded-full hover:bg-black/5"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 pt-4">
            
            {exercises.length > 0 ? (
              <div className="space-y-4">
                {/* Actions Row */}
                <div className="flex justify-end items-center text-sm font-semibold text-sageGreen gap-3 mb-6">
                  <button onClick={() => setIsIntroModalOpen(true)} className="hover:text-[#7fa18c] transition-colors">
                    + Create Intro Screen
                  </button>
                  <span className="text-[#E5E5E5]">|</span>
                  <button onClick={() => setIsAddExerciseModalOpen(true)} className="hover:text-[#7fa18c] transition-colors">
                    + Create New Exercise
                  </button>
                </div>

                {/* Exercises List */}
                <div className="space-y-3">
                  {exercises.map((ex) => (
                    <ExerciseAccordionItem
                      key={ex.id}
                      exercise={ex}
                      onEdit={() => console.log("Edit", ex.id)}
                      onDelete={() => handleDeleteExercise(ex.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
                <div className="max-w-md">
                  <h3 className="text-2xl sm:text-[28px] font-cormorant text-charcoal mb-2 font-medium italic">No Exercises Yet</h3>
                  <p className="text-[13px] text-grey">
                    You have not added any exercises yet. Start building your routine by adding exercises tailored to your goals.
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
                  <button
                    onClick={() => setIsIntroModalOpen(true)}
                    className="flex-1 h-10 sm:h-12 rounded-[20px] border border-sageGreen bg-[#FBFBFB] text-xs sm:text-sm font-semibold text-sageGreen transition-colors hover:bg-green-50"
                  >
                    + Create Intro Screen
                  </button>
                  <button
                    onClick={() => setIsAddExerciseModalOpen(true)}
                    className="flex-1 h-10 sm:h-12 rounded-[20px] bg-sageGreen text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#7fa18c]"
                  >
                    + Create New Exercise
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Nested Modals */}
      <CreateIntroScreenModal
        isOpen={isIntroModalOpen}
        onClose={() => setIsIntroModalOpen(false)}
        categoryName={categoryName}
        onSave={handleAddIntroScreen}
      />
      
      <AddExerciseModal
        isOpen={isAddExerciseModalOpen}
        onClose={() => setIsAddExerciseModalOpen(false)}
        onSave={handleAddExercise}
      />
    </>
  );
}
