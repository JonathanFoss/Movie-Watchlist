let messages = {};

export async function loadLanguage(lang) {
  messages = await fetch(`/locales/${lang}.json?cacheBust=${Date.now()}`)
    .then(r => r.json());
}

export function t(key) {
  return messages[key] || key;
}