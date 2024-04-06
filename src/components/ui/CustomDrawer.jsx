import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer"

export default function CustomDrawer({ children, ...props }) {
    const { isOpen, onClose, theme, hasIndecator = true } = props;
    console.log("theme", theme);
    return (
        <Drawer open={isOpen} onOpenChange={onClose}>
            <DrawerContent
                style={{ backgroundColor: theme[0], color: theme[1] }}
                className="p-0 border-0 w-full"
                hasIndecator={hasIndecator}
                colorGraber={theme[1]}
            >
                {children}
            </DrawerContent>
        </Drawer>
    )
}
