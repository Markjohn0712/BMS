import { SymbolView, type AndroidSymbol, type SFSymbol } from 'expo-symbols';
import { View } from 'react-native';

export type AppIconName =
  | 'menu'
  | 'building'
  | 'check-circle'
  | 'clock'
  | 'add-circle'
  | 'document'
  | 'person'
  | 'lock'
  | 'eye'
  | 'eye-off'
  | 'folder'
  | 'search'
  | 'filter'
  | 'sort'
  | 'chevron-right'
  | 'checkbox'
  | 'download'
  | 'export'
  | 'image'
  | 'back'
  | 'logout'
  | 'notifications';

const SYMBOL_MAP: Record<AppIconName, { ios: SFSymbol; android: AndroidSymbol; web: AndroidSymbol }> = {
  menu: { ios: 'line.3.horizontal', android: 'menu', web: 'menu' },
  building: { ios: 'building.2', android: 'location_city', web: 'location_city' },
  'check-circle': { ios: 'checkmark.circle', android: 'check_circle', web: 'check_circle' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  'add-circle': { ios: 'plus.circle', android: 'add_circle', web: 'add_circle' },
  document: { ios: 'doc.text', android: 'description', web: 'description' },
  person: { ios: 'person', android: 'person', web: 'person' },
  lock: { ios: 'lock', android: 'lock', web: 'lock' },
  eye: { ios: 'eye', android: 'visibility', web: 'visibility' },
  'eye-off': { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' },
  folder: { ios: 'folder', android: 'folder', web: 'folder' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  filter: { ios: 'line.3.horizontal.decrease', android: 'filter_list', web: 'filter_list' },
  sort: { ios: 'arrow.up.arrow.down', android: 'sort', web: 'sort' },
  'chevron-right': { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  checkbox: { ios: 'checkmark.square', android: 'check_box', web: 'check_box' },
  download: { ios: 'arrow.down.circle', android: 'file_download', web: 'file_download' },
  export: { ios: 'square.and.arrow.up', android: 'file_export', web: 'file_export' },
  image: { ios: 'photo', android: 'image', web: 'image' },
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  logout: { ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' },
  notifications: { ios: 'bell', android: 'notifications', web: 'notifications' },
};

type AppIconProps = {
  name: AppIconName;
  size?: number;
  color: string;
};

export function AppIcon({ name, size = 24, color }: AppIconProps) {
  return (
    <SymbolView
      name={SYMBOL_MAP[name]}
      size={size}
      tintColor={color}
      fallback={<View style={{ width: size, height: size }} />}
    />
  );
}
