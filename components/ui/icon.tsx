import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  Code,
  Compass,
  Cpu,
  Download,
  FlaskConical,
  Globe,
  GraduationCap,
  Heart,
  HeartHandshake,
  Landmark,
  Languages,
  Laptop,
  Leaf,
  Mail,
  MapPin,
  Megaphone,
  Mic,
  Monitor,
  Music,
  Newspaper,
  Palette,
  Phone,
  Puzzle,
  Receipt,
  ShieldCheck,
  Smile,
  Sparkles,
  Trophy,
  Users,
  Utensils,
  Youtube,
  type LucideIcon,
} from 'lucide-react'

/**
 * Icon registry.
 *
 * Content files reference icons by name, so a CMS editor can pick one without
 * touching code. Importing the set explicitly keeps tree-shaking predictable —
 * only these glyphs reach the bundle.
 */
const ICONS: Record<string, LucideIcon> = {
  activity: Activity,
  'arrow-right': ArrowRight,
  award: Award,
  'book-open': BookOpen,
  brain: Brain,
  briefcase: Briefcase,
  building: Building2,
  calculator: Calculator,
  calendar: Calendar,
  code: Code,
  compass: Compass,
  cpu: Cpu,
  download: Download,
  'flask-conical': FlaskConical,
  globe: Globe,
  'graduation-cap': GraduationCap,
  heart: Heart,
  'heart-handshake': HeartHandshake,
  landmark: Landmark,
  languages: Languages,
  laptop: Laptop,
  leaf: Leaf,
  mail: Mail,
  map: MapPin,
  'map-pin': MapPin,
  megaphone: Megaphone,
  mic: Mic,
  monitor: Monitor,
  music: Music,
  newspaper: Newspaper,
  palette: Palette,
  phone: Phone,
  puzzle: Puzzle,
  receipt: Receipt,
  'shield-check': ShieldCheck,
  smile: Smile,
  sparkles: Sparkles,
  trophy: Trophy,
  users: Users,
  utensils: Utensils,
  whatsapp: Phone,
  youtube: Youtube,
}

export function Icon({
  name,
  className,
  fallback = Sparkles,
}: {
  name: string
  className?: string
  fallback?: LucideIcon
}) {
  const Component = ICONS[name] ?? fallback
  return <Component className={className} aria-hidden />
}

export function hasIcon(name: string) {
  return name in ICONS
}
