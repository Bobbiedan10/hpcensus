import { useTheme } from "next-themes";
import LightbulbIcon from "../icons/lightbulb-icon";

function ToggleSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='fixed opacity-60 dark:hover:bg-blue-300 hover:bg-blue-300 bg-blue-500 dark:bg-blue-800 rounded-lg bottom-4 right-4 p-3 h-12 w-12 order-2 md:order-3'
      onClick={() => setTheme(theme === "dark" ? null : "dark")}>
      <LightbulbIcon />
    </button>
  );
}

export default ToggleSwitch;
