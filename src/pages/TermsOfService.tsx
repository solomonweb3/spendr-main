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

export default function TermsOfService() {
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
          Terms of Service
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
          Welcome to {COMPANY_NAME}. These Terms of Service ("Terms") govern your access to and
          use of the {COMPANY_NAME} website and services. By accessing or using our website, you
          agree to be bound by these Terms. If you do not agree, you must not use our website.
          Please read these Terms carefully before using {COMPANY_NAME}.
        </p>

        {/* 1 */}
        <Section id="acceptance" title="1. Acceptance of Terms">
          <p>
            By accessing, browsing, or using the {COMPANY_NAME} website (the "Site"), you
            acknowledge that you have read, understood, and agree to be bound by these Terms of
            Service and our{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-white/80 transition-colors"
              style={{ color: OFF_WHITE }}
            >
              Privacy Policy
            </a>
            , which is incorporated herein by reference. If you are using the Site on behalf of an
            organization, you represent and warrant that you have authority to bind that
            organization to these Terms.
          </p>
          <p>
            You must be at least 18 years of age to use this Site. By using {COMPANY_NAME}, you
            represent that you are at least 18 years old and have the legal capacity to enter into
            these Terms.
          </p>
        </Section>

        {/* 2 */}
        <Section id="description" title="2. Description of Service">
          <p>
            {COMPANY_NAME} is an <strong style={{ color: OFF_WHITE }}>informational directory
            and affiliate website</strong> that lists third-party merchants offering luxury goods
            and services — including yacht charters, villa rentals, luxury vehicles, and
            experiences — that accept cryptocurrency as a form of payment. We provide curated
            listings, descriptions, and links that direct you to the merchants' own websites.
          </p>
          <p className="font-medium pt-2" style={{ color: OFF_WHITE }}>
            {COMPANY_NAME} expressly does NOT:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>Process, facilitate, or intermediate any payments or transactions.</li>
            <li>Custody, hold, transmit, or exchange any cryptocurrency, fiat currency, or other funds.</li>
            <li>Act as a party, agent, broker, or intermediary in any transaction between you and any merchant.</li>
            <li>Operate as a financial institution, money services business, virtual asset service provider, or payment processor.</li>
            <li>Guarantee, underwrite, or insure any product, service, or transaction offered by any listed merchant.</li>
          </ul>
          <p className="pt-2">
            When you click a listing or affiliate link on {COMPANY_NAME}, you leave our Site and
            interact directly with the third-party merchant. Any transaction, agreement, or
            relationship you enter into is exclusively between you and that merchant.{" "}
            {COMPANY_NAME} is a signpost — not a counterparty.
          </p>
        </Section>

        {/* 3 */}
        <Section id="third-party" title="3. Third-Party Merchants — Disclaimer">
          <p>
            {COMPANY_NAME} does not own, operate, control, endorse, verify, or guarantee any
            merchant, product, service, or listing displayed on the Site. The inclusion of any
            merchant on {COMPANY_NAME} does not constitute an endorsement, recommendation, or
            certification by {COMPANY_NAME}.
          </p>
          <p className="font-medium pt-2" style={{ color: OFF_WHITE }}>
            You expressly acknowledge and agree that:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>
              All bookings, purchases, payments, refunds, cancellations, and disputes are solely
              between you and the third-party merchant. {COMPANY_NAME} has no role in, control
              over, or liability for any such matters.
            </li>
            <li>
              {COMPANY_NAME} is not responsible or liable for any merchant's conduct, pricing,
              availability, service quality, delivery, accuracy of descriptions, compliance with
              applicable laws, or any other aspect of their business.
            </li>
            <li>
              {COMPANY_NAME} is not liable for any loss, damage, cost, expense, claim, or injury
              — whether direct, indirect, incidental, consequential, or otherwise — arising from
              or related to your interaction with any third-party merchant, including but not
              limited to failed transactions, non-delivery, fraud, property damage, personal
              injury, or financial loss.
            </li>
            <li>
              Merchant listings may contain errors, inaccuracies, or outdated information.{" "}
              {COMPANY_NAME} makes no warranty as to the accuracy, completeness, or currentness
              of any listing.
            </li>
            <li>
              You are solely responsible for performing your own due diligence before engaging
              with any merchant, including verifying the merchant's identity, legitimacy,
              licensing, and the terms of any transaction.
            </li>
          </ul>
        </Section>

        {/* 4 */}
        <Section id="no-financial-advice" title="4. No Financial or Investment Advice">
          <p>
            Nothing on the {COMPANY_NAME} Site constitutes financial advice, investment advice,
            tax advice, legal advice, or any other form of professional advice.{" "}
            {COMPANY_NAME} is not a financial advisor, investment advisor, broker-dealer,
            exchange, custodian, money services business, or money transmitter.
          </p>
          <p>
            Any references to cryptocurrency, digital assets, or blockchain technology on the Site
            are provided for informational purposes only. The value of cryptocurrencies is highly
            volatile and unpredictable. You should consult a qualified financial advisor before
            making any financial decisions. {COMPANY_NAME} is not responsible for any financial
            losses you may incur.
          </p>
        </Section>

        {/* 5 */}
        <Section id="affiliate" title="5. Affiliate Disclosure">
          <p
            className="font-medium text-[15px]"
            style={{ color: OFF_WHITE }}
          >
            {COMPANY_NAME} may earn affiliate commissions, referral fees, or other compensation
            when you click on certain links on the Site and subsequently make a purchase or
            complete a transaction on a third-party merchant's website.
          </p>
          <p>
            In accordance with the Federal Trade Commission's (FTC) Guides Concerning the Use of
            Endorsements and Testimonials in Advertising (16 CFR Part 255), we disclose the
            following:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>
              <strong style={{ color: OFF_WHITE }}>Material connection</strong> —{" "}
              {COMPANY_NAME} has a financial relationship with some of the merchants listed on
              the Site. When you click an affiliate link and transact on the merchant's website,{" "}
              {COMPANY_NAME} may receive a commission or referral fee at no additional cost to
              you.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>No effect on price</strong> — the price you
              pay for any product or service is set entirely by the third-party merchant. Using
              an affiliate link does not increase the price you pay.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>No endorsement</strong> — the presence of an
              affiliate link does not constitute an endorsement, recommendation, or guarantee of
              any merchant, product, or service. All listings are provided for informational
              purposes.
            </li>
            <li>
              <strong style={{ color: OFF_WHITE }}>Listing order</strong> — affiliate
              relationships do not determine which merchants are listed. However, they may
              influence the placement or prominence of certain listings on the Site.
            </li>
          </ul>
          <p className="pt-2">
            You are under no obligation to use any affiliate link. You may navigate directly to
            any merchant's website independently. We encourage you to make purchasing decisions
            based on your own research and judgment.
          </p>
        </Section>

        {/* 6 */}
        <Section id="acceptable-use" title="6. Acceptable Use">
          <p>You agree not to use the Site to:</p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>Violate any applicable local, state, national, or international law or regulation.</li>
            <li>
              Engage in any fraudulent, deceptive, or misleading activity, including creating
              fake accounts or impersonating any person or entity.
            </li>
            <li>
              Interfere with or disrupt the Site's infrastructure, security, or functionality,
              including through the use of bots, scrapers, crawlers, or denial-of-service
              attacks.
            </li>
            <li>
              Attempt to gain unauthorized access to any portion of the Site, other users'
              accounts, or any systems connected to the Site.
            </li>
            <li>
              Reproduce, distribute, modify, create derivative works of, or publicly display any
              content from the Site without prior written consent from {COMPANY_NAME}.
            </li>
            <li>
              Use the Site for any purpose that is unlawful, harmful, or otherwise objectionable
              as determined by {COMPANY_NAME} in its sole discretion.
            </li>
          </ul>
          <p className="pt-2">
            {COMPANY_NAME} reserves the right to suspend or terminate your access to the Site at
            any time, without notice, for any violation of these Terms.
          </p>
        </Section>

        {/* 7 */}
        <Section id="intellectual-property" title="7. Intellectual Property">
          <p>
            All content on the Site — including but not limited to text, graphics, logos,
            trademarks, icons, images, design elements, software, and the overall look and feel
            of the Site — is the property of {COMPANY_NAME} or its licensors and is protected by
            United States and international copyright, trademark, and other intellectual property
            laws.
          </p>
          <p>
            You are granted a limited, non-exclusive, non-transferable, revocable license to
            access and use the Site for personal, non-commercial purposes. This license does not
            include the right to copy, reproduce, distribute, modify, display, perform, publish,
            license, create derivative works from, or sell any content from the Site.
          </p>
          <p>
            Merchant logos, names, and images displayed on the Site belong to their respective
            owners and are used for directory and identification purposes only.
          </p>
        </Section>

        {/* 8 */}
        <Section id="disclaimer" title="8. Disclaimer of Warranties">
          <p
            className="uppercase tracking-wide text-[13px]"
            style={{ color: OFF_WHITE }}
          >
            The Site and all content, information, listings, links, and services provided through
            the Site are offered on an "as is" and "as available" basis without warranties of any
            kind, whether express, implied, or statutory.
          </p>
          <p className="pt-2">
            To the fullest extent permitted by applicable law, {COMPANY_NAME} expressly disclaims
            all warranties, including but not limited to:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
            <li>
              Warranties that the Site will be uninterrupted, error-free, secure, or free of
              viruses or other harmful components.
            </li>
            <li>
              Warranties regarding the accuracy, reliability, completeness, or timeliness of any
              content, listings, or information on the Site.
            </li>
            <li>
              Warranties regarding the quality, safety, legality, or availability of any
              third-party merchant's products or services.
            </li>
          </ul>
          <p className="pt-2">
            You use the Site at your own risk. {COMPANY_NAME} is not responsible for any
            decisions you make based on information found on the Site.
          </p>
        </Section>

        {/* 9 */}
        <Section id="liability" title="9. Limitation of Liability">
          <p
            className="uppercase tracking-wide text-[13px]"
            style={{ color: OFF_WHITE }}
          >
            To the maximum extent permitted by applicable law, {COMPANY_NAME}, its officers,
            directors, employees, agents, affiliates, and licensors shall not be liable for any
            indirect, incidental, special, consequential, punitive, or exemplary damages,
            including but not limited to damages for loss of profits, revenue, data, goodwill, or
            other intangible losses, arising out of or in connection with:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5 pt-4">
            <li>Your use of, or inability to use, the Site.</li>
            <li>Any transaction, interaction, or dispute between you and any third-party merchant.</li>
            <li>Any content, information, or listings on the Site, whether or not provided by {COMPANY_NAME}.</li>
            <li>Unauthorized access to or alteration of your data or transmissions.</li>
            <li>Any losses related to cryptocurrency transactions, including price volatility, failed transactions, or fraud.</li>
            <li>Any other matter relating to the Site.</li>
          </ul>
          <p className="pt-4">
            In no event shall {COMPANY_NAME}'s total aggregate liability to you for all claims
            arising out of or relating to these Terms or your use of the Site exceed the greater
            of (a) one hundred US dollars ($100.00) or (b) the total amount of affiliate
            commissions {COMPANY_NAME} received as a result of your use of the Site in the twelve
            (12) months preceding the claim.
          </p>
          <p className="pt-2">
            Some jurisdictions do not allow the exclusion or limitation of certain damages. In
            such jurisdictions, our liability shall be limited to the fullest extent permitted by
            law.
          </p>
        </Section>

        {/* 10 */}
        <Section id="indemnification" title="10. Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless {COMPANY_NAME}, its officers,
            directors, employees, agents, affiliates, and licensors from and against any and all
            claims, damages, losses, liabilities, costs, and expenses (including reasonable
            attorneys' fees) arising out of or related to:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-1.5">
            <li>Your use of the Site or any content obtained from the Site.</li>
            <li>Your violation of these Terms.</li>
            <li>Your violation of any applicable law or regulation.</li>
            <li>Your interaction or transaction with any third-party merchant.</li>
            <li>Any claim that your use of the Site infringed the rights of a third party.</li>
          </ul>
        </Section>

        {/* 11 */}
        <Section id="governing-law" title="11. Governing Law &amp; Dispute Resolution">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            State of California, United States, without regard to its conflict of law principles.
          </p>
          <p>
            Any dispute, controversy, or claim arising out of or relating to these Terms or your
            use of the Site shall first be attempted to be resolved through good-faith
            negotiation. If the dispute cannot be resolved through negotiation within thirty (30)
            days, it shall be resolved by binding arbitration administered by JAMS in Los Angeles,
            California, in accordance with its Streamlined Arbitration Rules and Procedures. The
            arbitration shall be conducted by a single arbitrator, and the arbitrator's decision
            shall be final and binding.
          </p>
          <p>
            You agree that any dispute resolution proceedings will be conducted only on an
            individual basis and not in a class, consolidated, or representative action. You
            waive any right to participate in a class action lawsuit or class-wide arbitration
            against {COMPANY_NAME}.
          </p>
          <p>
            Notwithstanding the foregoing, {COMPANY_NAME} may seek injunctive or other equitable
            relief in any court of competent jurisdiction to prevent the actual or threatened
            infringement of its intellectual property rights.
          </p>
        </Section>

        {/* 12 */}
        <Section id="modifications" title="12. Modifications &amp; Termination">
          <p>
            {COMPANY_NAME} reserves the right to modify, update, or revise these Terms at any
            time and in its sole discretion. When we make changes, we will update the "Last
            Updated" date at the top of this page. If we make material changes, we will provide
            notice through the Site or by other means. Your continued use of the Site after any
            modifications constitutes your acceptance of the revised Terms.
          </p>
          <p>
            {COMPANY_NAME} reserves the right to suspend, restrict, or terminate your access to
            the Site at any time, with or without cause, and with or without notice. Upon
            termination, your right to use the Site ceases immediately. Sections of these Terms
            that by their nature should survive termination — including but not limited to
            disclaimers, limitations of liability, indemnification, and governing law — shall
            survive.
          </p>
        </Section>

        {/* 13 */}
        <Section id="contact" title="13. Contact Us">
          <p>
            If you have questions or concerns about these Terms of Service, please contact us:
          </p>
          <div className="pt-2 space-y-1">
            <p>
              <strong style={{ color: OFF_WHITE }}>{COMPANY_NAME}</strong>
            </p>
            <p>Los Angeles, California, United States</p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline underline-offset-4"
                style={{ color: OFF_WHITE }}
              >
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
