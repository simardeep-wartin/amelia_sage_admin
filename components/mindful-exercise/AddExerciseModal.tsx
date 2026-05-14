"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { exerciseSchema, ExerciseFormData } from "@/lib/validators/mindful-exercise";

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function AddExerciseModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddExerciseModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ExerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: initialData || {
      title: "",
      subtitle: "",
      duration: "",
      description: "",
      status: "active",
    },
  });

  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      reset(initialData || { title: "", subtitle: "", duration: "", description: "", status: "active" });
      setVideoFile(null);
      setAudioFile(null);
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = (data: ExerciseFormData) => {
    onSave({ ...data, videoFile, audioFile });
    onClose();
  };

  const footer = (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button
        variant="outline"
        onClick={onClose}
        className="flex-1 text-[#475569] border-[#E5E5E5] hover:bg-gray-50"
      >
        Cancel
      </Button>
      <Button
        variant="outline"
        onClick={handleSubmit((data) => onSave({ ...data, status: "draft", videoFile, audioFile }))}
        className="flex-1 text-sageGreen border-sageGreen hover:bg-green-50"
      >
        Save as Draft
      </Button>
      <Button variant="solid" onClick={handleSubmit(onSubmit)} className="flex-1">
        Publish
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Exercise" : "Add New Exercise"}
      footer={footer}
      width="max-w-2xl"
    >
      <form className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
        <Input
          label="Add title"
          placeholder="Enter Title Name"
          {...register("title")}
          error={errors.title?.message}
        />

        <Input
          label="Add Subtitle"
          placeholder="Enter Subtitle Name"
          {...register("subtitle")}
          error={errors.subtitle?.message}
        />

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
      </form>
    </Modal>
  );
}
