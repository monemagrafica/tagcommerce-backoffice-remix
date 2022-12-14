import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";

type Props = {};

const Mail: FC<Props> = (props: Props) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          exit={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Mail
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Mail;
