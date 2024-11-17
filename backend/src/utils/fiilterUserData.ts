export class FilterUserData {
  static exclude<T extends Record<string, any>>(
    user: T,
    keys: string[]
  ): Omit<T, (typeof keys)[number]> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    ) as Omit<T, (typeof keys)[number]>;
  }
}
