import { AEZ_CHAPTERS } from "./subjects/aez";
import { GEB_CHAPTERS } from "./subjects/geb";
import { BSR_CHAPTERS } from "./subjects/bsr";
import { MRB_CHAPTERS } from "./subjects/mrb";
import { PAR_CHAPTERS } from "./subjects/par";
import { ENT_CHAPTERS } from "./subjects/ent";
import { FSB_CHAPTERS } from "./subjects/fsb";
import { WLB_CHAPTERS } from "./subjects/wlb";

export interface QuestionItem {
  id?: number;
  q: string;
  answer?: string;
  hot?: boolean;
  years?: string;
  marks?: number;
}

export interface ChapterItem {
  id: string;
  chapterNo: number;
  title: string;
  titleEn?: string;
  emoji: string;
  ka: QuestionItem[];
  kha: QuestionItem[];
  ga: QuestionItem[];
}

export interface SubjectItem {
  id: string;
  code: string;
  name: string;
  bn: string;
  emoji: string;
  grad: string;
  accent: string;
  mid: string;
  bg: string;
  chapters: ChapterItem[];
}

export const DIVS = [
  { key: "ka", label: "ক বিভাগ", sub: "অতিসংক্ষিপ্ত · ১ নম্বর", marks: 1 },
  { key: "kha", label: "খ বিভাগ", sub: "সংক্ষিপ্ত · ৪ নম্বর", marks: 4 },
  { key: "ga", label: "গ বিভাগ", sub: "রচনামূলক · ১০ নম্বর", marks: 10 },
] as const;

export const ALL_SUBJECTS: SubjectItem[] = [
  {
    id: "AEZ",
    code: "243101",
    name: "Applied & Economic Zoology",
    bn: "এপ্লাইড ও ইকোনমিক জুওলজি",
    emoji: "🐝",
    grad: "linear-gradient(135deg,#1B5E20,#2E7D32)",
    accent: "#1B5E20",
    mid: "#388E3C",
    bg: "linear-gradient(145deg,#E8F5E9 0%,#F1F8E9 100%)",
    chapters: AEZ_CHAPTERS,
  },
  {
    id: "GEB",
    code: "243103",
    name: "Genetic Engineering & Biotechnology",
    bn: "জেনেটিক ইঞ্জিনিয়ারিং ও বায়োটেকনোলজি",
    emoji: "🧬",
    grad: "linear-gradient(135deg,#1A237E,#283593)",
    accent: "#1A237E",
    mid: "#303F9F",
    bg: "linear-gradient(145deg,#E8EAF6 0%,#EDE7F6 100%)",
    chapters: GEB_CHAPTERS,
  },
  {
    id: "BSR",
    code: "243105",
    name: "Biostatistics & Research Methodology",
    bn: "বায়োস্ট্যাটিস্টিক্স ও রিসার্চ মেথডলজি",
    emoji: "📊",
    grad: "linear-gradient(135deg,#004D40,#00695C)",
    accent: "#004D40",
    mid: "#00796B",
    bg: "linear-gradient(145deg,#E0F2F1 0%,#E8F5E9 100%)",
    chapters: BSR_CHAPTERS,
  },
  {
    id: "MRB",
    code: "243107",
    name: "Microbiology & Radiation Biology",
    bn: "মাইক্রোবায়োলজি ও রেডিয়েশন বায়োলজি",
    emoji: "🦠",
    grad: "linear-gradient(135deg,#4A148C,#6A1B9A)",
    accent: "#4A148C",
    mid: "#7B1FA2",
    bg: "linear-gradient(145deg,#F3E5F5 0%,#EDE7F6 100%)",
    chapters: MRB_CHAPTERS,
  },
  {
    id: "PAR",
    code: "243109",
    name: "Parasitology",
    bn: "প্যারাসাইটোলজি",
    emoji: "🔬",
    grad: "linear-gradient(135deg,#880E4F,#AD1457)",
    accent: "#880E4F",
    mid: "#C2185B",
    bg: "linear-gradient(145deg,#FCE4EC 0%,#F8BBD9 100%)",
    chapters: PAR_CHAPTERS,
  },
  {
    id: "ENT",
    code: "243111",
    name: "Entomology",
    bn: "এন্টোমোলজি",
    emoji: "🦋",
    grad: "linear-gradient(135deg,#BF360C,#D84315)",
    accent: "#BF360C",
    mid: "#E64A19",
    bg: "linear-gradient(145deg,#FBE9E7 0%,#FFF3E0 100%)",
    chapters: ENT_CHAPTERS,
  },
  {
    id: "FSB",
    code: "243113",
    name: "Fisheries Biology",
    bn: "ফিশারিজ বায়োলজি",
    emoji: "🐟",
    grad: "linear-gradient(135deg,#01579B,#0277BD)",
    accent: "#01579B",
    mid: "#0288D1",
    bg: "linear-gradient(145deg,#E1F5FE 0%,#E0F7FA 100%)",
    chapters: FSB_CHAPTERS,
  },
  {
    id: "WLB",
    code: "243115",
    name: "Wildlife Biology",
    bn: "ওয়াইল্ডলাইফ বায়োলজি",
    emoji: "🦁",
    grad: "linear-gradient(135deg,#33691E,#558B2F)",
    accent: "#33691E",
    mid: "#689F38",
    bg: "linear-gradient(145deg,#F1F8E9 0%,#E8F5E9 100%)",
    chapters: WLB_CHAPTERS,
  },
];

// Map for quick ID-based access
export const DATA: Record<string, ChapterItem[]> = {
  AEZ: AEZ_CHAPTERS,
  GEB: GEB_CHAPTERS,
  BSR: BSR_CHAPTERS,
  MRB: MRB_CHAPTERS,
  PAR: PAR_CHAPTERS,
  ENT: ENT_CHAPTERS,
  FSB: FSB_CHAPTERS,
  WLB: WLB_CHAPTERS,
};
