import { FC } from "react";

interface IActionButtonProps {
  config: {
    tooltipText: string;
    color: string;
    icon: JSX.Element;
  };
  action: Action;
  handleClick: (action: Action) => void;
}
const ActionButton: FC<IActionButtonProps> = (props) => {
  const { config, handleClick, action } = props;

  return (
    <div className="action-button-container group">
      <button onClick={() => handleClick(action)} className={`${config.color}`}>
        {config.icon}
      </button>
      <span className="group-hover:scale-100 z-100">{config.tooltipText}</span>
    </div>
  );
};

export default ActionButton;
