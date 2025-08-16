// src/components/Icon.tsx
import React from 'react';
import { type LucideProps, icons } from 'lucide-react';

/**
 * This is a dynamic icon component that can render any icon from the lucide-react library.
 * Instead of importing each icon individually in every component,
 * you can just use this component and pass the icon's name as a prop.
 *
 * @example <Icon name="Phone" className="h-5 w-5" />
 */

// Define the props for our Icon component
interface IconProps extends LucideProps {
  // 'name' is a required prop and must be a valid lucide icon name
  name: keyof typeof icons;
}

const Icon = ({ name, color, size, ...props }: IconProps) => {
  // Dynamically get the icon component from the 'icons' object
  const LucideIcon = icons[name];

  // If the icon name is invalid, it returns null and logs a warning.
  // This prevents the app from crashing if an icon name is misspelled.
  if (!LucideIcon) {
    console.warn(`Icon with name "${name}" not found in lucide-react.`);
    return null;
  }

  // Render the found icon with the given props (color, size, className, etc.)
  return <LucideIcon color={color} size={size} {...props} />;
};

export default Icon;
