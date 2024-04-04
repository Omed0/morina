export default function CustomModal({
    children,
    isOpen,
    onClose,
}) {
    const Modal = () => {

        return (
            <div
                role="dialog"
                onClick={onClose}
                aria-hidden={true}
                className="flex justify-center overflow-hidden fixed inset-0 z-40 w-full min-h-screen p-2 touch-none"
            >
                <div className="absolute inset-0 bg-black opacity-80 text-white" />
                <div className="relative w-full h-full md:max-w-[600px] lg:max-w-[680px] min-w-0 flex justify-center items-center">
                    {children}
                </div>
            </div>
        );
    };
    return isOpen ? <Modal /> : null;
}
