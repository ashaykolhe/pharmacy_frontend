import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface ShortcutTT {
  link: string;
  text: string;
  shortcut: string;
  onClickFunc?: MouseEventHandler<HTMLAnchorElement>;
}

const ShortcutToolTip = ({ link, text, shortcut, onClickFunc }: ShortcutTT) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={link} onClick={onClickFunc}>
            {text}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          {shortcut}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default ShortcutToolTip;
