interface ActionButtonProps {
  icon: string;
  tooltip: string;
  onClick: () => void;
  isActive?: boolean;
}

const ActionButton = ({ icon, tooltip, onClick, isActive }: ActionButtonProps) => {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors
          ${isActive
            ? 'bg-tmdbLightBlue border-tmdbLightBlue'
            : 'bg-tmdbDarkBlue/20 border-white/20 hover:border-white'
          }`}
      >
        <img
          src={icon}
          alt=""
          className={`w-5 h-5 ${isActive ? 'brightness-0 invert' : ''}`}
        />
      </button>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {tooltip}
      </div>
    </div>
  );
};

export default ActionButton; 