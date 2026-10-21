import styles from './icon.module.scss'

export default function Icon({ type }) {
  const iconProps = {
    className: styles.icon,
    viewBox: "0 -960 960 960",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false"
  };
  return (
    <>
      {type === 'arrowRight' && 
        <svg {...iconProps}>
          <path d="m545.23-271.38-25.85-26.81 163.54-163.54H206.15v-36.92h476.77L519.38-662.19l25.85-26.43L753.85-480 545.23-271.38Z"/>
        </svg>
      }

      {type === 'arrowLeft' && 
        <svg {...iconProps}>
          <path d="M396.77-271.38 188.15-480l208.62-208.62 25.85 26.43-163.54 163.54h512.77v36.92H259.08l163.54 163.54-25.85 26.81Z"/>
        </svg>
      }

      {type === 'arrowUp' && 
        <svg {...iconProps}>
          <path d="M461.23-272v-393.85l-163.5 163.5-26.35-25.96 208-208L688-527.69l-25.85 25.84-164-163.88V-272h-36.92Z"/>
        </svg>
      }

      {type === 'arrowDown' && 
        <svg {...iconProps}>
          <path d="M480-272 272-480.5l26.35-25.96 163.5 164v-393.85h36.92v393.35l164-164 25.85 26.34L480-272Z"/>
        </svg>
      }
    </>
  );
}
