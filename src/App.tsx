import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "@/pages/Home";
import Create from "@/pages/Create";
import Clone from "@/pages/Clone";
import Preview from "@/pages/Preview";
import Notification from "@/components/Notification";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/clone" element={<Clone />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <Notification />
      <AnimatedRoutes />
    </Router>
  );
}
