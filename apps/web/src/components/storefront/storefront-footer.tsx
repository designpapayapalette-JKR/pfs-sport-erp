"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Truck,
  Phone,
  Mail,
  MapPin,
  FileCheck,
} from "lucide-react";

export function StorefrontFooter() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Trust strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-slate-100">
          {[
            { icon: Award, title: "ITF, World Athletics & World Padel Tour Approved", desc: "Court Pace rated systems" },
            { icon: Truck, title: "95+ Countries Served", desc: "50,000+ projects delivered globally" },
            { icon: ShieldCheck, title: "ISO, CE & SGS Certified", desc: "25+ years of manufacturing experience" },
            { icon: FileCheck, title: "B2B GST Ready", desc: "Instant e-invoices, 18% input credit (India)" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-2xl bg-[#EAF1FB] flex items-center justify-center text-[#0A2A57] shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-900">{title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/pfs-logo.png" alt="PFS Sport" className="h-9 w-9 object-contain" />
              <span className="font-extrabold text-base text-slate-900">PFS SPORT</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              A global manufacturer of precision-engineered padel, pickleball, acrylic,
              polyurethane and EPDM sports surfacing systems, serving distributors and
              contractors in 95+ countries.
            </p>
            <div className="space-y-1.5 text-slate-600 text-sm">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#0A2A57]" /> +91 98 860-98386 (India)</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#0A2A57]" /> sales@pfs-sport.com</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#0A2A57]" /> Regional hubs across India, UAE, Saudi Arabia &amp; Poland</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-slate-900">Product Lines</h4>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/shop" className="hover:text-slate-900 transition-colors">PFS Padel™</Link></li>
              <li><Link href="/shop" className="hover:text-slate-900 transition-colors">PFS Pickleball™</Link></li>
              <li><Link href="/shop" className="hover:text-slate-900 transition-colors">Acrylic Systems</Link></li>
              <li><Link href="/shop" className="hover:text-slate-900 transition-colors">Polyurethane Systems</Link></li>
              <li><Link href="/shop" className="hover:text-slate-900 transition-colors">EPDM Granules</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-slate-900">Interactive Tools</h4>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/visualiser" className="hover:text-slate-900 transition-colors">3D Court Visualiser</Link></li>
              <li><Link href="/estimator" className="hover:text-slate-900 transition-colors">Turnkey Cost Estimator</Link></li>
              <li><Link href="/shop" className="hover:text-slate-900 transition-colors">Technical Data Sheets</Link></li>
              <li><Link href="/checkout?item=sample-box" className="hover:text-slate-900 transition-colors">Request Swatch Kit</Link></li>
              <li><Link href="/login" className="hover:text-slate-900 transition-colors">Dealer Login</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-slate-900">Global Offices</h4>
            <div className="space-y-2 text-slate-500 text-sm">
              <div><strong className="text-slate-700 block font-medium">Headquarters:</strong> McLean, Virginia, USA</div>
              <div><strong className="text-slate-700 block font-medium">Regional Offices:</strong> India, UAE, Saudi Arabia, Poland</div>
              <div><strong className="text-slate-700 block font-medium">Distributor Network:</strong> 2,000+ partners worldwide</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 PFS Sport Infrastructure. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/dealer/dashboard" className="hover:text-slate-700">ERP Status: <span className="text-emerald-600 font-semibold">Online</span></Link>
            <Link href="/login" className="text-[#0A2A57] hover:underline font-semibold">Staff &amp; Dealer Sign In</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
