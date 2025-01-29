import React from 'react';
import classNames from 'classnames';

interface ErrorProps {
  errorMessage: string;
  onClose: () => void;
}

export const Error: React.FC<ErrorProps> = ({ errorMessage, onClose }) => {
  React.useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, onClose]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />
      {errorMessage}
    </div>
  );
};
