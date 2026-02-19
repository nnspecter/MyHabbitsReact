import { LazyMotion, m, domAnimation, useReducedMotion } from "framer-motion";

interface MountAnimationProps {
  children: React.ReactNode;
  animKey?: string | number;
}

export const MountAnimation = ({ children, animKey = "key1" }: MountAnimationProps) => {
  const shouldReduceMotion = useReducedMotion(); // проверяем настройку пользователя

  return (
    <LazyMotion features={domAnimation}> {/* оптимизон, ограничил бандл */}
      <m.div
        key={animKey}
        style={{ width: "100%" }}
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 0 }}
        animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};
