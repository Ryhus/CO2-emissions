import { useState, useEffect, memo } from 'react';

import { OPTIONAL_COLUMNS } from '@/utils/columns';

import './ColumnSelectorModalStyles.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColumns: string[];
  onSave: (cols: string[]) => void;
}

export default memo(function ColumnSelectorModal({
  isOpen,
  onClose,
  selectedColumns,
  onSave,
}: ModalProps) {
  const [tempSelection, setTempSelection] = useState<string[]>(selectedColumns);

  useEffect(() => {
    setTempSelection(selectedColumns);
  }, [selectedColumns, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleColumn = (col: string) => {
    setTempSelection((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const resetSelection = () => {
    setTempSelection([]);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Select Columns</h3>
        <div className="columns-list">
          {OPTIONAL_COLUMNS.map((col) => (
            <label key={col}>
              <input
                type="checkbox"
                checked={tempSelection.includes(col)}
                onChange={() => toggleColumn(col)}
              />
              {col}
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={resetSelection}>Reset to Default</button>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => {
              onSave(tempSelection);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
});
