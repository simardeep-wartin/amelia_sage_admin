"use client";

import { useState } from "react";

type ModalState<T> = {
  isModalOpen: boolean;
  editingItem: T | null;
  isDeleteModalOpen: boolean;
  itemToDelete: string | null;
  openAdd: () => void;
  openEdit: (item: T) => void;
  openDelete: (id: string) => void;
  closeModal: () => void;
  closeDelete: () => void;
};

export function useModalState<T>(): ModalState<T> {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  return {
    isModalOpen,
    editingItem,
    isDeleteModalOpen,
    itemToDelete,
    openAdd: () => {
      setEditingItem(null);
      setIsModalOpen(true);
    },
    openEdit: (item: T) => {
      setEditingItem(item);
      setIsModalOpen(true);
    },
    openDelete: (id: string) => {
      setItemToDelete(id);
      setIsDeleteModalOpen(true);
    },
    closeModal: () => {
      setIsModalOpen(false);
      setEditingItem(null);
    },
    closeDelete: () => {
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    },
  };
}
