
interface MainButtonProps {
    button_text: string;
  }
  export default function MainButton(props: MainButtonProps) {
    return (
      <button type="submit" className="main-btn-component bg-green-600 hover:bg-green-500 w-full px-4 py-2 text-center text-white text-sm rounded-lg">
        {props.button_text}
      </button>
    );
  }