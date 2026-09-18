import Link from "next/link";
import { site } from "@/lib/site";
export default function Footer(){return <footer className="footer"><div className="wrap footer-grid"><div><strong>{site.name}</strong><p>{site.tagline}</p></div><div className="footer-links"><Link href="/learn">Curriculum</Link><Link href="/reports">Reports</Link><Link href="/cv">CV</Link></div><p className="fineprint">Independent educational companion. Oxford is a registered trade mark of Oxford University Press; this website is not affiliated with or endorsed by OUP.</p></div></footer>}
