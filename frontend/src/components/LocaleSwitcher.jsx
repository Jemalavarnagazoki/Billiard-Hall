import { useLocale } from '../context/LocaleContext';

export default function LocaleSwitcher() {
  const { locale, setLocale, localeOptions, content } = useLocale();

  return (
    <div aria-label={content.ui.localeSwitcherLabel} className="locale-switcher" role="group">
      {localeOptions.map((option) => (
        <button
          aria-pressed={locale === option.value}
          className={`locale-switcher-button${locale === option.value ? ' is-active' : ''}`}
          key={option.value}
          type="button"
          onClick={() => setLocale(option.value)}
        >
          <span aria-hidden="true" className="locale-switcher-flag">
            {option.flag}
          </span>
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
