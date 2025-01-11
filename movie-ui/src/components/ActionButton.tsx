interface ActionButtonProps {
  icon: string;
  tooltip: string;
  onClick: () => void;
}

const ActionButton = ({ icon, tooltip, onClick }: ActionButtonProps) => {
  return (
    <div className="group relative">
      <button
        onClick={onClick}
        className="w-[46px] h-[46px] rounded-full bg-tmdbDarkBlue flex items-center justify-center 
                 border border-white hover:bg-white transition-colors duration-200"
      >
        <img
          src={icon}
          alt={tooltip}
          className="w-5 h-5 group-hover:filter group-hover:brightness-0"
        />
      </button>
      <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 
                    whitespace-nowrap bg-white text-tmdbDarkBlue text-sm py-1 px-2 rounded">
        {tooltip}
      </div>
    </div>
  );
};

export default ActionButton; 