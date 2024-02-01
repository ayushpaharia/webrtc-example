import { FC, useId, useState } from "react";
import ActionButton from "./ActionButton";
import { configMap, toggleValues } from "../common/constants";

const ActionBar: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [actions, setActions] = useState<Action[]>([
    "novideo",
    "unmute",
    "answer",
  ]);

  const handleClick = (action: Action) => {
    const index = actions.indexOf(action);

    const replaceAction = (actions: Action[]) => {
      const newActions = [...actions];
      newActions[index] = toggleValues[action];
      return newActions;
    };

    if (["novideo", "video", "unmute", "mute"].includes(action)) {
      setActions(replaceAction);
    }
  };

  const actionButtonId = useId();

  return (
    <div className="action-button-container">
      {actions.map((action, index) => {
        return (
          <ActionButton
            key={actionButtonId + index}
            action={action}
            config={configMap[action]}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default ActionBar;
