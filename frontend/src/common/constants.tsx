interface IActionConfig {
  tooltipText: string;
  color: string;
  icon: JSX.Element;
}

export const configMap: Record<Action, IActionConfig> = {
  cut: {
    tooltipText: "Cut the Call",
    color: "bg-red-500",
    icon: <i className="fa fa-trash" />,
  },
  answer: {
    tooltipText: "Answer the Call",
    color: "bg-green-500",
    icon: <i className="fa fa-phone" />,
  },
  unmute: {
    tooltipText: "Unmute",
    color: "bg-blue-500",
    icon: <i className="fa fa-microphone-slash" />,
  },
  mute: {
    tooltipText: "Mute",
    color: "bg-indigo-500",
    icon: <i className="fa fa-microphone" />,
  },
  video: {
    tooltipText: "Turn off Video",
    color: "bg-rose-500",
    icon: <i className="fa fa-video"></i>,
  },
  novideo: {
    tooltipText: "Turn on Video",
    color: "bg-pink-500",
    icon: <i className="fa fa-video-slash" />,
  },
};

export const toggleValues: Record<Action | string, Action> = {
  novideo: "video",
  unmute: "mute",
  mute: "unmute",
  video: "novideo",
};
