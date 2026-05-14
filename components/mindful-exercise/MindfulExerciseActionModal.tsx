"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { 
  categorySchema, 
  exerciseSchema, 
  CategoryFormData, 
  ExerciseFormData 
} from "@/lib/validators/mindful-exercise";

type ModalMode = "category" | "exercise";

interface MindfulExerciseActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  mode: ModalMode;
  initialData?: any;
}

export default function MindfulExerciseActionModal({
  isOpen,
  onClose,
  onSave,
  mode,
  initialData,
}: MindfulExerciseActionModalProps) {
  const schema = mode === "category" ? categorySchema : exerciseSchema;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: "",
      title: "",
      subtitle: "",
      duration: "",
      description: "",
      status: "active",
    },
  });

  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      reset(initialData || { 
        name: "", 
        title: "", 
        subtitle: "", 
        duration: "", 
        description: "", 
        status: "active" 
      });
      setVideoFile(null);
      setAudioFile(null);
      setThumbnailFile(null);
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      videoFile,
      audioFile,
      thumbnailFile,
    };
    onSave(payload);
    onClose();
  };

  const handleSaveDraft = (data: any) => {
    onSave({ ...data, status: "draft", videoFile, audioFile, thumbnailFile });
    onClose();
  };

  const isEdit = !!initialData;
  const titleText = isEdit 
    ? `Edit ${mode === "category" ? "Category" : "Exercise"}`
    : `Add New ${mode === "category" ? "Category" : "Exercise"}`;

  const footer = (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button
        variant="outline"
        onClick={onClose}
        className="flex-1 text-[#475569] border-[#E5E5E5] hover:bg-gray-50 h-auto py-3 rounded-[12px]"
      >
        Cancel
      </Button>
      {mode === "exercise" && (
        <Button
          variant="outline"
          onClick={handleSubmit(handleSaveDraft)}
          className="flex-1 text-sageGreen border-sageGreen hover:bg-green-50 h-auto py-3 rounded-[12px]"
        >
          Save as Draft
        </Button>
      )}
      <Button 
        variant="solid" 
        onClick={handleSubmit(onSubmit)} 
        className="flex-1 h-auto py-3 rounded-[12px] bg-sageGreen hover:bg-sageGreenHover text-white font-semibold"
      >
        {isEdit ? "Save Changes" : mode === "exercise" ? "Publish" : "Save"}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={titleText}
      footer={footer}
      width={mode === "exercise" ? "max-w-2xl" : "max-w-xl"}
    >
      <form className={`space-y-6 ${mode === "exercise" ? "max-h-[70vh] overflow-y-auto px-1" : ""}`}>
        {/* Common Fields */}
        {mode === "category" ? (
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
        ) : (
          <Input
            label="Add title"
            placeholder="Enter Title Name"
            {...register("title")}
            error={errors.title?.message}
          />
        )}

        <Input
          label={mode === "category" ? "Add Subtitle (Optional)" : "Add Subtitle"}
          placeholder="Enter Subtitle Name"
          {...register("subtitle")}
          error={errors.subtitle?.message}
        />

        {/* Exercise Specific Fields */}
        {mode === "exercise" && (
          <>
            <Input
              label="Set Duration"
              placeholder="Set time Duration (e.g. 5 mins)"
              {...register("duration")}
              error={errors.duration?.message}
            />

            <div className="space-y-1">
              <label className="block text-s font-medium text-charcoal">
                Add Description
              </label>
              <textarea
                className="w-full rounded-lg border border-[#ededed] bg-white px-5 py-4 font-normal text-m text-charcoal placeholder:text-[#e1e1e1] outline-none transition focus:border-sageGreen/55 focus:ring-2 focus:ring-sageGreen/20 min-h-[100px] resize-none"
                placeholder="Add Description Here"
                {...register("description")}
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
            </div>

            {/* Video Upload */}
            <div className="space-y-1">
              <label className="block text-s font-medium text-charcoal">
                Add Video File
              </label>
              <div
                onClick={() => videoInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#E5E5E5] bg-[#FDFDFD] py-8 transition-colors hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="file"
                  ref={videoInputRef}
                  className="hidden"
                  accept="video/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setVideoFile(e.target.files[0]);
                    }
                  }}
                />
                <CloudArrowUpIcon className="h-8 w-8 text-[#9898A3] mb-2" strokeWidth={1} />
                <span className="text-sm font-medium text-[#5B4FDB] mb-1">
                  {videoFile ? videoFile.name : "Upload Video Animation"}
                </span>
                <span className="text-xs text-[#A1A1AA]">
                  MP4, MOV up to 5MB (recommended: 40x40px)
                </span>
              </div>
            </div>

            {/* Audio Upload */}
            <div className="space-y-1">
              <label className="block text-s font-medium text-charcoal">
                Add Audio Script
              </label>
              <div
                onClick={() => audioInputRef.current?.click()}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#E5E5E5] bg-[#FDFDFD] py-8 transition-colors hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="file"
                  ref={audioInputRef}
                  className="hidden"
                  accept="audio/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAudioFile(e.target.files[0]);
                    }
                  }}
                />
                <CloudArrowUpIcon className="h-8 w-8 text-[#9898A3] mb-2" strokeWidth={1} />
                <span className="text-sm font-medium text-[#5B4FDB] mb-1">
                  {audioFile ? audioFile.name : "Upload Audio Script"}
                </span>
                <span className="text-xs text-[#A1A1AA]">
                  MP3, WAV up to 5MB
                </span>
              </div>
            </div>
          </>
        )}

        {/* Category Specific Fields */}
        {mode === "category" && (
          <div>
            <label className="block text-[14px] font-bold text-charcoal mb-2">
              Add Thumbnail Image
            </label>
            <div className="relative group cursor-pointer" onClick={() => imageInputRef.current?.click()}>
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#E5E5E5] rounded-[20px] bg-[#FDFDFD] hover:border-sageGreen transition-all">
                <div className="flex flex-col items-center gap-2">
                  <CloudArrowUpIcon className="h-10 w-10 text-[#D1D1D1] group-hover:text-sageGreen transition-colors" />
                  <p className="text-[14px] font-semibold text-sageGreen hover:underline">
                    {thumbnailFile ? thumbnailFile.name : "Upload Icon File"}
                  </p>
                  <p className="text-[11px] text-[#A1A1A1]">
                    PNG, JPG up to 5MB (recommended: 40x40px)
                  </p>
                </div>
              </div>
              <input 
                type="file" 
                ref={imageInputRef}
                className="hidden" 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setThumbnailFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}
