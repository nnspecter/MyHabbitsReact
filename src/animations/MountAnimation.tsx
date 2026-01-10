import { AnimatePresence, motion } from "framer-motion";

interface MountAnimationProps {
  children: React.ReactNode;
  animKey?: string | number;
}

export const MountAnimation = ({ children, animKey="key1"}: MountAnimationProps) => {
  return (
    
      
        <motion.div
          key={animKey}
          style={{ width: "100%" }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      
    
  );
};