import { useDispatch, useSelector } from "react-redux";
import { Sun,Moon} from "lucide-react";
import { toggleMode } from "./toggleModeSlice";

function ToggleButton() {
  const mode = useSelector((state) => state.toggle.mode);
  const dispatch = useDispatch();

  return (
    <span>
    <button
      onClick={() => dispatch(toggleMode())}
      className="px-4 py-2 bg-blue-950 dark:bg-yellow-950 text-white dark:text-white rounded"
    >
      {mode === "dark" ? <Sun/>:<Moon/>}
    </button>
    </span>
  );
}

export default ToggleButton;
