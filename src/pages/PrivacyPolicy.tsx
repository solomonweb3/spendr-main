import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

const SERIF = "'Cormorant Garamond', serif";
const SANS = "'DM Sans', sans-serif";
const OFF_WHITE = "#f0ede6";
const MUTED = "rgba(255,255,255,0.60)";
const MUTED_LIGHT = "rgba(255,255,255,0.72)";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CONTACT_EMAIL = "spendrbusiness@gmail.com";
const COMPANY_NAME = "Spendr";
const LAST_UPDATED = "June 22, 2026";

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-white/[0.06] pt-10 pb-4">
      <h2
        className="font-light text-[22px] md:text-[26px] mb-6"
        style={{ fontFamily: SERIF, color: OFF_WHITE }}
      >
        {title}
      </h2>
      <div
        className="space-y-4 text-[14px] font-light leading-relaxed"
        style={{ fontFamily: SANS, color: MUTED_LIGHT }}
      >
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="px-8 md:px-14 pt-10 pb-6 flex items-center justify-between">
        <Logo color="white" size={16} onClick={() => navigate("/")} />
        <button
          onClick={() => navigate(-1)}
          className="text-[11px] tracking-[0.15em] uppercase font-light border border-white/25 px-6 py-2.5 text-white hover:bg-white hover:text-black transition-all duration-300"
          style={{ fontFamily: SANS }}
        >
          Back
        </button>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-14 pt-16 pb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-[10px] tracking-[0.35em] uppercase font-light mb-6"
          style={{ fontFamily: SANS, color: "rgba(255,255,255,0.25)" }}
        >
          Legal
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="font-light leading-[0.9]"
          style={{ fontFamily: SERIF, fontSize: "clamp(48px, 8vw, 100px)", color: OFF_WHITE }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-[13px] tracking-[0.1em] font-light"
          style={{ fontFamily: SANS, color: MUTED }}
        >
          Last Updated: {LAST_UPDATED}
        </motion.p>
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="px-8 md:px-14 pb-20 max-w-3xl space-y-2"
      >
        {/* Intro */}
        <p
          className="text-[14px] font-light leading-relaxed pb-8"
          style={{ fontFamily: SANS, color: MUTED_LIGHT }}
        >
          {COMPANY_NAME} ("{COMPANY_NAME}," "we," "us," or "our") operates a luxury directory and
          affiliate website that lists third-party merchants accepting cryptocurrency. We do not
          process payments, custody cryptocurrency, or hold any funds. When you click through to a
          merchant, you transact directly with that merchant on their own website.{" "}
          {COMPANY_NAME} may earn affiliate or referral commissions from some links. This Privacy
          Policy explains how we collect, use, disclose, and protect your personal information when
          you visit our website.
        </p>

        {/* 1 */}
        <Section id="information-we-collect" title="1. Information We Collect">
          <p className="font-medium" style={{ color: OFF_WHITE }}>
            Information you provide directly:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>
              <strong style={{ color: OFF_WHITE }}>Email address</strong> — when you create an
              account, sign up for our newsletter, or contact us.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Account credentials</strong> — username and
              password used to access your {COMPANY_NAME} account.
            </li>
          </ul>

          <p className="font-medium pt-4" style={{ color: OFF_WHITE }}>
            Information collected automatically:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>
              <strong style={{ color: OFF_WHITE }}>IP address</strong> — collected with every
              request to our servers.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Browser &amp; device information</strong> —
              browser type and version, operating system, device type, screen resolution, and
              language preferences.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Cookies &amp; similar technologies</strong> —
              session cookies, persistent cookies, and local storage used for authentication,
              preferences, and analytics.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Analytics data</strong> — pages visited,
              referral URLs, time on site, click patterns, and interactions with listings and
              affiliate links.
            </li>
          </ul>

          <p className="pt-4">
            We do <strong style={{ color: OFF_WHITE }}>not</strong> collect financial information,
            cryptocurrency wallet addresses, or payment details. Any transaction you make occurs
            entirely on the third-party merchant's website under their own privacy policy.
          </p>
        </Section>

        {/* 2 */}
        <Section id="how-we-use" title="2. How We Use Your Information">
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>To provide, maintain, and improve the {COMPANY_NAME} directory and website.</li>
            <li>To create and manage your account and authenticate your sessions.</li>
            <li>To send you service-related communications (e.g., account verification, security alerts).</li>
            <li>To send marketing communications you have opted into (you may unsubscribe at any time).</li>
            <li>To analyze usage patterns and improve user experience through analytics.</li>
            <li>To detect and prevent fraud, abuse, and security incidents.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </Section>

        {/* 3 */}
        <Section id="legal-bases" title="3. Legal Bases for Processing (GDPR)">
          <p>
            If you are located in the European Economic Area (EEA) or the United Kingdom, we
            process your personal data under the following legal bases:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>
              <strong style={{ color: OFF_WHITE }}>Consent</strong> — for marketing emails and
              non-essential cookies. You may withdraw consent at any time.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Contractual necessity</strong> — to provide
              account services you have requested.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Legitimate interests</strong> — to operate
              and improve our website, analyze usage, and prevent fraud, where these interests
              are not overridden by your data protection rights.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Legal obligation</strong> — to comply with
              applicable laws and regulations.
            </li>
          </ul>
        </Section>

        {/* 4 */}
        <Section id="sharing" title="4. Who We Share Your Information With">
          <p>
            We do not sell your personal information. We share data only with the following
            categories of service providers who assist us in operating the website:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>
              <strong style={{ color: OFF_WHITE }}>Analytics providers</strong> — to help us
              understand how visitors use the site (e.g., Google Analytics or similar services).
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Email service providers</strong> — to deliver
              transactional and marketing emails on our behalf.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Hosting &amp; infrastructure providers</strong>{" "}
              — to store and serve website content and databases (e.g., Supabase, Vercel, or
              similar platforms).
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Affiliate networks &amp; merchants</strong> —
              when you click an affiliate link, the destination merchant may receive a referral
              identifier. We do not share your name or email with merchants.
            </li>
          </ul>
          <p className="pt-2">
            We may also disclose information if required by law, court order, or governmental
            request, or to protect the rights, safety, or property of {COMPANY_NAME} or others.
          </p>
        </Section>

        {/* 5 */}
        <Section id="cookies" title="5. Cookies &amp; Tracking Technologies">
          <p>We use the following types of cookies and similar technologies:</p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>
              <strong style={{ color: OFF_WHITE }}>Essential cookies</strong> — required for
              authentication, session management, and core site functionality. These cannot be
              disabled.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Analytics cookies</strong> — help us
              understand traffic patterns, popular listings, and user journeys. Data is
              aggregated where possible.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Preference cookies</strong> — store your
              display preferences (e.g., theme settings).
            </li>
          </ul>
          <p className="pt-2">
            You can control cookies through your browser settings. Disabling non-essential cookies
            will not affect core site functionality but may limit analytics-driven improvements.
          </p>
        </Section>

        {/* 6 */}
        <Section id="retention" title="6. Data Retention">
          <p>We retain your personal information as follows:</p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>
              <strong style={{ color: OFF_WHITE }}>Account data</strong> — retained for as long
              as your account is active. If you delete your account, we will delete or anonymize
              your data within 30 days, unless retention is required by law.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Analytics data</strong> — retained in
              aggregated or anonymized form for up to 26 months.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Server logs (IP addresses)</strong> — retained
              for up to 90 days for security and debugging purposes.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Marketing preferences</strong> — retained
              until you unsubscribe or request deletion.
            </li>
          </ul>
        </Section>

        {/* 7 */}
        <Section id="ccpa" title="7. Your California Privacy Rights (CCPA/CPRA)">
          <p>
            If you are a California resident, the California Consumer Privacy Act (CCPA) and the
            California Privacy Rights Act (CPRA) provide you with the following rights:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Know</strong> — you may request the
              categories and specific pieces of personal information we have collected about you.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Delete</strong> — you may request
              that we delete the personal information we have collected from you, subject to
              certain exceptions.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Correct</strong> — you may request
              that we correct inaccurate personal information we maintain about you.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Opt Out of Sale/Sharing</strong> —
              you may opt out of the "sale" or "sharing" of your personal information as those
              terms are defined under the CCPA/CPRA.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Non-Discrimination</strong> — we
              will not discriminate against you for exercising any of your privacy rights.
            </li>
          </ul>
          <p className="pt-2">
            {COMPANY_NAME} does not "sell" personal information in the traditional sense. However,
            certain analytics and advertising activities may constitute a "sale" or "sharing"
            under the broad CCPA/CPRA definitions. To exercise your right to opt out:
          </p>
          <div className="pt-4">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Do%20Not%20Sell%20or%20Share%20My%20Personal%20Information`}
              className="inline-block text-[12px] tracking-[0.2em] uppercase font-light border border-white/25 px-8 py-3.5 text-white hover:bg-white hover:text-black transition-all duration-300"
              style={{ fontFamily: SANS }}
            >
              Do Not Sell or Share My Personal Information
            </a>
          </div>
          <p className="pt-4">
            You may also submit a request by emailing us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4" style={{ color: OFF_WHITE }}>
              {CONTACT_EMAIL}
            </a>{" "}
            with the subject line "CCPA Request." We will verify your identity before fulfilling
            any request and respond within 45 days.
          </p>
        </Section>

        {/* 8 */}
        <Section id="gdpr" title="8. Your Rights Under GDPR (EEA &amp; UK Visitors)">
          <p>
            If you are located in the European Economic Area or the United Kingdom, you have the
            following rights under the General Data Protection Regulation:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>
              <strong style={{ color: OFF_WHITE }}>Right of Access</strong> — request a copy of
              the personal data we hold about you.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Rectification</strong> — request
              correction of inaccurate or incomplete data.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Erasure</strong> — request deletion
              of your personal data ("right to be forgotten").
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Data Portability</strong> — receive
              your data in a structured, machine-readable format.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Object</strong> — object to
              processing based on legitimate interests, including profiling.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Restrict Processing</strong> —
              request that we limit how we use your data in certain circumstances.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Right to Withdraw Consent</strong> — where
              processing is based on consent, you may withdraw it at any time without affecting
              the lawfulness of prior processing.
            </li>
          </ul>
          <p className="pt-2">
            To exercise any of these rights, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4" style={{ color: OFF_WHITE }}>
              {CONTACT_EMAIL}
            </a>
            . We will respond within 30 days. If you are unsatisfied with our response, you have
            the right to lodge a complaint with your local data protection authority.
          </p>
        </Section>

        {/* 9 */}
        <Section id="international" title="9. International Data Transfers">
          <p>
            {COMPANY_NAME} is based in Los Angeles, California, United States. If you access our
            website from outside the United States, your information may be transferred to,
            stored, and processed in the United States, where data protection laws may differ from
            those in your jurisdiction. By using our website, you consent to such transfers. Where
            required by applicable law, we implement appropriate safeguards (such as standard
            contractual clauses) for cross-border data transfers.
          </p>
        </Section>

        {/* 10 */}
        <Section id="security" title="10. Security">
          <p>
            We use commercially reasonable administrative, technical, and physical safeguards to
            protect your personal information. These include encrypted connections (TLS/SSL),
            secure hosting infrastructure, and access controls. However, no method of transmission
            or storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        {/* 11 */}
        <Section id="third-party" title="11. Third-Party Websites">
          <p>
            Our directory contains links to third-party merchant websites. When you click on a
            listing or affiliate link, you leave {COMPANY_NAME} and are subject to the privacy
            policy and terms of the third-party merchant. We are not responsible for the privacy
            practices, content, or security of any third-party website. We encourage you to review
            the privacy policy of every site you visit.
          </p>
        </Section>

        {/* 12 */}
        <Section id="children" title="12. Children's Privacy">
          <p>
            {COMPANY_NAME} is not directed at individuals under the age of 18. We do not
            knowingly collect personal information from children. If we become aware that we have
            collected data from a child under 18, we will delete it promptly. If you believe a
            child has provided us with personal information, please contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4" style={{ color: OFF_WHITE }}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        {/* 13 */}
        <Section id="changes" title="13. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the
            "Last Updated" date at the top of this page. If we make material changes, we will
            notify you by email or by posting a prominent notice on our website. Your continued
            use of {COMPANY_NAME} after any changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        {/* 14 */}
        <Section id="contact" title="14. Contact Us">
          <p>
            If you have questions about this Privacy Policy, wish to exercise your privacy rights,
            or have concerns about how we handle your data, please contact us:
          </p>
          <div className="pt-2 space-y-1">
            <p>
              <strong style={{ color: OFF_WHITE }}>{COMPANY_NAME}</strong>
            </p>
            <p>Los Angeles, California, United States</p>
            <p>
              Email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4" style={{ color: OFF_WHITE }}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </Section>

      </motion.div>
      <SiteFooter />
    </div>
  );
}
