import { useRef, useEffect } from "react";

export const GlareCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const animationFrame = useRef(null);

  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  const rotateFactor = 0.4;
  const smoothing = 0.1; // lower = smoother

  const updateRotation = () => {
    const dx = targetRotation.current.x - currentRotation.current.x;
    const dy = targetRotation.current.y - currentRotation.current.y;

    currentRotation.current.x += dx * smoothing;
    currentRotation.current.y += dy * smoothing;

    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(${currentRotation.current.x}deg) rotateY(${currentRotation.current.y}deg)`;
    }

    animationFrame.current = requestAnimationFrame(updateRotation);
  };

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const deltaX = percentX - 50;
    const deltaY = percentY - 50;

    targetRotation.current.x = -(deltaY * rotateFactor);
    targetRotation.current.y = deltaX * rotateFactor;
  };

  const handlePointerLeave = () => {
    targetRotation.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  return (
    <div
      className={`w-[320px] aspect-[17/21] transition-transform duration-300 ease-in-out [perspective:600px]`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={cardRef}
        className={` w-full text-wrap md:w-full h-[70%] rounded-2xl bg-slate-900 text-white p-6 shadow-lg transition-transform ease-in-out ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
};
