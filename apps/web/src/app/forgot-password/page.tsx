"use client";

import * as React from "react";
import Link from "next/link";
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
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
          Reset Portal Password
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          Secure transactional reset link dispatched via ZeptoMail
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <Card className="p-6 bg-white border border-surfaceBorder shadow-md">
          {isSent ? (
            <div className="text-center space-y-3 py-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-neutral-900">Reset Email Dispatched</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                If an authorized dealer or staff account exists for <strong>{email}</strong>, a time-limited single-use reset link has been delivered.
              </p>
              <div className="pt-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="text-xs">
                    <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">
                  Registered Email Address
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@company.com"
                  leftIcon={<Mail className="h-4 w-4" />}
                />
              </div>

              <Button type="submit" variant="accent" className="w-full h-10 text-xs font-semibold">
                Send Reset Instructions
              </Button>

              <div className="text-center pt-2">
                <Link href="/login" className="text-xs text-neutral-500 hover:text-neutral-900 font-medium">
                  ← Return to Sign In
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
