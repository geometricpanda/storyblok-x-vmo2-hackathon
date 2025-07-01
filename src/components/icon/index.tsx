import { FC } from "react";
import * as FontAwesome from "react-icons/fa";
import { IconType } from "react-icons";

export interface IconData {
  _uid: string;
  icon: string;
  type: "fas";
  plugin: "fontawesome-selector";
}

interface IconProps {
  icon: IconData;
  className?: string;
  size?: number | string;
}

// Helper function to convert fa-style names to PascalCase
const convertIconName = (iconName: string): string => {
  // Remove 'fa-' prefix if present
  const cleanName = iconName.replace(/^fa-/, "");

  // Convert kebab-case to PascalCase and add 'Fa' prefix
  const pascalCase = cleanName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return `Fa${pascalCase}`;
};

export const Icon: FC<IconProps> = ({ icon, className = "w-5 h-5", size }) => {
  const { icon: iconName } = icon;

  // Convert icon name to react-icons format
  const convertedName = convertIconName(iconName);

  // Get the specific icon component from Font Awesome
  const IconComponent = (FontAwesome as Record<string, IconType>)[
    convertedName
  ];

  if (!IconComponent) {
    console.warn(`Font Awesome icon not found: ${convertedName}`);
    return null;
  }

  const iconProps = {
    className,
    ...(size && { style: { fontSize: size } }),
  };

  return <IconComponent {...iconProps} />;
};
