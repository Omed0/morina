import {
  Dialog,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function CustomDialog({ children, ...props }) {

  const { language } = useSelector((state) => state.language);

  const { isOpen, onClose, theme, classClose, className } = props;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{ backgroundColor: theme[0], color: theme[1] }}
        className={cn("w-[97%] md:max-w-[44rem] rounded-lg p-0 overflow-x-hidden overflow-y-scroll max-h-[95%] touch-none", className)}
      >
        <div
          about="close button modal"
          className="w-full absolute"
        >
          <DialogClose className={cn("flex justify-center items-center z-10 absolute top-2 h-9 w-9", classClose)} asChild>
            <span className=" bg-[#0000004d] text-white rounded-full end-2">
              <IoClose
                size={26}
                className="inline-block"
              />
            </span>
          </DialogClose>
        </div>
        {children}
      </DialogContent>
    </Dialog >
  );
}
