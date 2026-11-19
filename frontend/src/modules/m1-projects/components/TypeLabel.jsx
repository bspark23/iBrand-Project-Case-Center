import Icon from '../../../shared/ui/Icon.jsx';
import { typeLabel } from '../labels.js';

export const TYPE_ICONS = {
  event: 'sparkle',
  livestream: 'broadcast',
  brand_film: 'film',
  documentary: 'camera',
};

// Project type with its icon.
// Usage: <TypeLabel type="brand_film" />
export default function TypeLabel({ type }) {
  return (
    <span className="type-label">
      <Icon name={TYPE_ICONS[type] ?? 'folder'} size={15} />
      {typeLabel(type)}
    </span>
  );
}
