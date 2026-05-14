"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { categorySchema, CategoryFormData } from "@/lib/validators/mindful-exercise";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormData) => void;
  initialData?: any;
}

export default function AddCategoryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddCategoryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      subtitle: "",
      status: "active",
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(initialData || { name: "", subtitle: "", status: "active" });
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = (data: CategoryFormData) => {
    onSave(data);
    onClose();
  };

  const footer = (
    <div className="flex gap-4 w-full">
      <Button
        variant="outline"
        onClick={onClose}
        className="flex-1 py-3 h-auto rounded-[12px] border-[#E5E5E5] text-charcoal font-semibold hover:bg-gray-50"
      >
        Cancel
      </Button>
      <Button 
        onClick={handleSubmit(onSubmit)} 
        className="flex-1 py-3 h-auto rounded-[12px] bg-sageGreen hover:bg-sageGreenHover text-white font-semibold shadow-sm"
      >
        Save
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Category"
      footer={footer}
      maxWidth="max-w-xl"
    >
      <form className="space-y-6">
        <div className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-[14px] font-bold text-charcoal mb-2">
              Add title
            </label>
            <input
              {...register("name")}
              placeholder="Enter Title Name"
              className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-[10px] text-[14px] outline-none focus:border-sageGreen transition-all placeholder:text-[#D1D1D1]"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Subtitle Field */}
          <div>
            <label className="block text-[14px] font-bold text-charcoal mb-2">
              Add Subtitle (Optional)
            </label>
            <input
              {...register("subtitle")}
              placeholder="Enter Subtitle Name"
              className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-[10px] text-[14px] outline-none focus:border-sageGreen transition-all placeholder:text-[#D1D1D1]"
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-[14px] font-bold text-charcoal mb-2">
              Add Thumbnail Image
            </label>
            <div className="relative group cursor-pointer">
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#E5E5E5] rounded-[20px] bg-[#FDFDFD] hover:border-sageGreen transition-all">
                <div className="flex flex-col items-center gap-2">
                  <CloudArrowUpIcon className="h-10 w-10 text-[#D1D1D1] group-hover:text-sageGreen transition-colors" />
                  <p className="text-[14px] font-semibold text-sageGreen hover:underline">
                    Upload Icon File
                  </p>
                  <p className="text-[11px] text-[#A1A1A1]">
                    PNG, JPG up to 5MB (recommended: 40x40px)
                  </p>
                </div>
              </div>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
