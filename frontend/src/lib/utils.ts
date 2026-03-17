// shadcn utils - install clsx tailwind-merge or remove
export function cn(...classes: (string | undefined | null | boolean | number)[]) {
  return classes.filter(Boolean).join(' ')
}

