export type DeleteAccountApp = 'mathshorts' | 'datrans';

export function deleteAccountAppFromSearch(value: string | null): DeleteAccountApp {
  return value === 'datrans' ? 'datrans' : 'mathshorts';
}

export function deleteAccountPath(lang: string, app: DeleteAccountApp): string {
  return `/${lang}/delete-account/?app=${app}`;
}
