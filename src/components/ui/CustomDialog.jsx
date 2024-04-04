import {
  Dialog,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";

export default function CustomDialog({ children, ...props }) {
  const { isOpen, onClose, theme } = props;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{ backgroundColor: theme[0], color: theme[1] }}
        className="w-[97%] md:max-w-[44rem] rounded-lg p-0 overflow-x-hidden overflow-y-scroll 
          max-h-[95%] touch-none"
      >
        <DialogClose className="z-10" asChild>
          <div
            about="close button modal"
            className={cn("flex justify-center items-center absolute top-2 right-2 h-4 w-4")}
          >
            <span className="p-1 bg-[#0000004d] absolute top-[6%] right-[6%] text-white rounded-full">
              <IoClose
                size={26}
                className="inline-block"
              />
            </span>
          </div>
        </DialogClose>
        {children}
      </DialogContent>
    </Dialog>
  );
}
