// このファイルはLucide Reactからのアイコンをインポートするためのものです
// GoogleIconはLucide Reactに含まれていないため、カスタムアイコンとして定義しています

import type { LucideIcon } from "lucide-react"

export const GoogleIcon: LucideIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    <path d="M17.8 12.2h-3.6v3.6h-2.4v-3.6H8.2v-2.4h3.6V6.2h2.4v3.6h3.6v2.4z" />
  </svg>
)
