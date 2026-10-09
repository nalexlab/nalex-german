"use server";

import "server-only";
import nodemailer from "nodemailer";

type WithdrawalInput = { fullName: string; email: string; bookingReference: string; message?: string; website?: string; locale?: "en"|"de" };
type WithdrawalResult = { error?: string; success?: true };

const value = (input: string | undefined) => input?.trim() ?? "";
const emailPattern = /^\S+@\S+\.\S+$/;
const contactEmail = "info@nalex-german.de";
const smtpTimeoutMs = 12_000;

class SmtpTimeoutError extends Error {
  constructor() {
    super(`SMTP operation exceeded ${smtpTimeoutMs} ms.`);
    this.name = "SmtpTimeoutError";
  }
}

function smtpConfig() {
  const host = value(process.env.SMTP_HOST);
  const port = Number(value(process.env.SMTP_PORT));
  const secureValue = value(process.env.SMTP_SECURE).toLowerCase();
  const user = value(process.env.SMTP_USER);
  const password = process.env.SMTP_PASSWORD?.trim() ?? "";
  if (!host || !Number.isInteger(port) || port <= 0 || !user || !password || !["true", "false"].includes(secureValue)) return null;
  return { host, port, secure: secureValue === "true", user, password };
}

export async function submitWithdrawal(input: WithdrawalInput): Promise<WithdrawalResult> {
  const fullName = value(input.fullName);
  const email = value(input.email);
  const bookingReference = value(input.bookingReference);
  const message = value(input.message);
  const de=input.locale==="de";
  if (value(input.website)) return { success: true };
  if (!fullName || !email || !bookingReference) return { error: de?"Bitte füllen Sie alle Pflichtfelder aus.":"Please complete all required fields." };
  if (!emailPattern.test(email)) return { error: de?"Bitte geben Sie eine gültige E-Mail-Adresse ein.":"Please enter a valid email address." };
  if (message.length > 5000) return { error: de?"Bitte begrenzen Sie Ihre optionale Nachricht auf 5.000 Zeichen.":"Please limit your optional message to 5,000 characters." };
  const config = smtpConfig();
  if (!config) return { error: de?"Das Widerrufsformular ist vorübergehend nicht verfügbar. Bitte schreiben Sie uns direkt an info@nalex-german.de.":"The withdrawal form is temporarily unavailable. Please email us directly at info@nalex-german.de." };

  const receivedAt = new Date();
  const dateOfReceipt = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "Europe/Berlin" }).format(receivedAt);
  const timeOfReceipt = new Intl.DateTimeFormat("en-GB", { timeStyle: "medium", timeZone: "Europe/Berlin", hour12: false }).format(receivedAt);
  const declaration = [
    de?"Widerrufserklärung":"Withdrawal declaration",
    "",
    `${de?"Vollständiger Name":"Full name"}: ${fullName}`,
    `${de?"E-Mail-Adresse":"Email address"}: ${email}`,
    `${de?"Buchungsnummer oder Kurs":"Booking number or course"}: ${bookingReference}`,
    `${de?"Optionale Nachricht":"Optional message"}: ${message || (de?"Keine":"None")}`,
    "",
    `${de?"Eingangsdatum":"Date of receipt"}: ${dateOfReceipt}`,
    `${de?"Eingangszeit":"Time of receipt"}: ${timeOfReceipt} (Europe/Berlin)`,
  ].join("\n");
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 10_000,
  });

  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const delivery = Promise.all([
      transporter.sendMail({ from: `NALEX LAB <${contactEmail}>`, to: contactEmail, replyTo: email, subject: `${de?"Widerruf eingegangen":"Withdrawal received"} – ${bookingReference}`, text: declaration }),
      transporter.sendMail({ from: `NALEX LAB <${contactEmail}>`, to: email, replyTo: contactEmail, subject: de?"Bestätigung Ihres Widerrufs":"Confirmation of your withdrawal", text: [de?"Wir bestätigen den Eingang Ihrer Widerrufserklärung.":"We confirm receipt of your withdrawal declaration.", "", declaration, "", "NALEX LAB", "Inh. Tatiana Beckmann", "Luhnenstraße 7", "30559 Hannover", "Deutschland", contactEmail, "0511 901223702"].join("\n") }),
    ]);
    const hardTimeout = new Promise<never>((_, reject) => {
      timeout = setTimeout(() => {
        transporter.close();
        reject(new SmtpTimeoutError());
      }, smtpTimeoutMs);
    });
    await Promise.race([delivery, hardTimeout]);
    return { success: true };
  } catch (error) {
    console.error("[withdrawal] SMTP delivery failed", error instanceof Error ? error.message : "Unknown SMTP error");
    return { error: de?"Ihr Widerruf konnte nicht übermittelt werden. Bitte schreiben Sie uns direkt an info@nalex-german.de.":"Your withdrawal could not be submitted. Please email us directly at info@nalex-german.de." };
  } finally {
    if (timeout) clearTimeout(timeout);
    transporter.close();
  }
}
