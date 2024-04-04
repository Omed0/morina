import { HiArrowNarrowUp } from "react-icons/hi"


function ArrowTopScrol({ ArrowColor }) {

  const { BackgroundColor, color } = ArrowColor

  return (
    <div
      className="w-12 h-12 rounded-full flex justify-center items-center text-4xl text-center shadow shadow-black/65"
      onClick={() => window.scrollTo(0, 0)}
      style={{
        backgroundColor: BackgroundColor,
        color: color,
      }}
    >
      <HiArrowNarrowUp />

      <style>
        {`
              .ArrowTopfadeIn {
                    animation: fadeIn 0.3s ease-in-out;
              }
              @keyframes fadeIn {
                0% {
                  opacity: 0;
                  transform: translateY(100px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0px);
                }
              }`}
      </style>

    </div>
  )
}

export default ArrowTopScrol