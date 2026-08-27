"use client";

import * as React from "react";
import { DealerLayout } from "@/components/layout";
import { useERP } from "@/context/erp-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Input,
} from "@pfs/ui";
import {
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  FileQuestion,
  BookOpen,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function HelpPage() {
  const [ticketSubmitted, setTicketSubmitted] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setSubject("");
      setMessage("");
    }, 2500);
  };

  return (
    <DealerLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Dealer Help & Technical Support
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Access application guidelines, subfloor testing procedures, or submit a support ticket to our technical engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white border border-surfaceBorder shadow-xs space-y-2">
            <div className="h-9 w-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900">Technical Hotline</h3>
            <p className="text-xs text-neutral-500">Mon - Sat: 9 AM - 7 PM IST</p>
            <p className="text-xs font-mono font-bold text-primary">+91 (22) 6902-8800</p>
          </Card>

          <Card className="p-4 bg-white border border-surfaceBorder shadow-xs space-y-2">
            <div className="h-9 w-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900">WhatsApp Engineering</h3>
            <p className="text-xs text-neutral-500">Fast response on site queries</p>
            <p className="text-xs font-mono font-bold text-emerald-700">+91 98201 44521</p>
          </Card>

          <Card className="p-4 bg-white border border-surfaceBorder shadow-xs space-y-2">
            <div className="h-9 w-9 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900">Dealer Desk Email</h3>
            <p className="text-xs text-neutral-500">Order & commercial support</p>
            <p className="text-xs font-bold text-primary">support@pfs-sport.com</p>
          </Card>
        </div>

        {/* Submit Ticket Form */}
        <Card className="p-6 bg-white border border-surfaceBorder shadow-xs">
          <CardTitle className="text-base font-bold text-neutral-900 mb-4">
            Submit a Technical / Warranty Support Ticket
          </CardTitle>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                Subject / Project In Question
              </label>
              <Input
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Subfloor moisture test query for Pune Tennis Club"
              />
            </div>

            <div>
              <label className="font-semibold text-neutral-700 block mb-1">
                Issue Details & Site Notes
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe site conditions, slope measurements, or specific technical assistance needed..."
                className="w-full rounded-lg border border-surfaceBorder bg-surface p-3 text-xs text-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <Button type="submit" variant="accent" disabled={ticketSubmitted}>
              {ticketSubmitted ? (
                <>
                  <CheckCircle2 className="mr-1.5 h-4 w-4" /> Ticket #TKT-8821 Created!
                </>
              ) : (
                <>
                  <Send className="mr-1.5 h-4 w-4" /> Submit Support Request
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </DealerLayout>
  );
}
