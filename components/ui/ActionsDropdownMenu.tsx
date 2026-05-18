import { EllipsisVerticalIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ActionsDropdownMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  trigger?: "vertical" | "horizontal";
  stopPropagation?: boolean;
};

export default function ActionsDropdownMenu({
  onEdit,
  onDelete,
  trigger = "vertical",
  stopPropagation = false,
}: ActionsDropdownMenuProps) {
  const TriggerIcon = trigger === "horizontal" ? EllipsisHorizontalIcon : EllipsisVerticalIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-1 text-[#D1D1D1] hover:text-[#2D2D2D] transition-colors outline-none"
        onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
      >
        <TriggerIcon className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[140px] rounded-[16px] py-2 px-1 border-[#F2F2F2] shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
      >
        <DropdownMenuItem
          onSelect={onEdit}
          className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#2D2D2D] hover:bg-[#F7F4EE] hover:text-sageGreen cursor-pointer"
        >
          <PencilSquareIcon className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={onDelete}
          className="flex items-center gap-3 px-4 py-2.5 rounded-[12px] text-[14px] font-semibold text-[#2D2D2D] hover:bg-[#FDF2F2] hover:text-destructive cursor-pointer"
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
