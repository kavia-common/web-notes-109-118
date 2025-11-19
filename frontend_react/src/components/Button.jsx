import React from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * Button component supporting multiple variants, sizes, and accessibility features.
 *
 * Props:
 * @param {'primary'|'secondary'|'success'|'danger'|'ghost'} variant - Button color variant.
 * @param {'sm'|'md'|'lg'} size - Button size.
 * @param {boolean} disabled - Disabled state.
 * @param {boolean} loading - Loading state (shows spinner, disables interaction).
 * @param {boolean} fullWidth - Makes the button 100% width.
 * @param {function} onClick - onClick handler.
 * @param {'button'|'submit'|'reset'} type - Button type.
 * @param {string} className - Extra className.
 * @param {React.ReactNode} children - Button content.
 * @param {string} ariaLabel - aria-label prop pass-through.
 * ...props - Any other native button attributes (e.g., aria-*).
 */
export const Button = React.forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
      onClick,
      type = "button",
      className = "",
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Button style classes
    const classes = [
      styles.buttonBase,
      styles[variant] || styles.primary,
      styles[size] || styles.md,
      fullWidth ? styles.fullWidth : "",
      isDisabled ? styles.disabled : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Focus visible: rely on native focus, but apply custom ring for accessibility
    const [focusVisible, setFocusVisible] = React.useState(false);
    const handleBlur = (e) => setFocusVisible(false);
    const handleFocus = (e) => {
      if (e.target.matches(":focus-visible")) setFocusVisible(true);
    };

    return (
      <button
        type={type}
        className={classes + (focusVisible ? " " + styles.focusVisible : "")}
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled}
        aria-label={ariaLabel}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        {...props}
      >
        {loading && (
          <span
            className={styles.spinner}
            role="status"
            aria-live="polite"
            aria-label="Loading"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "ghost",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  children: PropTypes.node,
  "aria-label": PropTypes.string,
};
