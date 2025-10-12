import { useRef } from "react";
import { useScroll } from "framer-motion";
import { motion, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};
const centerIndex = 4; // Center index for "SKIPERUI"
const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";

  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  return (
    <motion.span
      className={cn("inline-block text-orange-500", isSpace && "w-4")}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};
const Description = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
   <div
      ref={targetRef}
      className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw] w-1/2 "
    >
      <div
        className="font-geist w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-black"
        style={{
          perspective: "500px",
        }}
      >
        {["S", "k", "I", "P", "E", "R", "U", "I"].map((char, index) => (
          <CharacterV1
            key={index}
            char={char}
            index={index}
            centerIndex={centerIndex}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
export default Description;