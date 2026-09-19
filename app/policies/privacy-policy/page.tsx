import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const SHOPIFY_PRIVACY_URL = 'https://fenrisgaming.myshopify.com/policies/privacy-policy';
const CONTACT_EMAIL = 'fenrisgamingllc@gmail.com';
const PHYSICAL_ADDRESS = 'Fenris Gaming LLC, 11375 Robinwood Drive, Hagerstown, MD 21742';

export const metadata: Metadata = {
  title: 'Privacy Policy | Fenris Gaming',
  description:
    'Privacy information for Fenris Gaming LLC, including the Shopify store privacy policy, SMS/text messaging disclosure, and optional website chat practices.',
  alternates: {
    canonical: '/policies/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <div className="bg-[#0a0d18] border-b border-[#1f2535] py-20">
        <div className="max-w-4xl mx-auto px-5">
          <div className="uppercase text-xs tracking-[3px] text-[#c5a46e] font-semibold mb-3">
            POLICIES
          </div>
          <h1 className="text-6xl font-semibold tracking-[-3px] mb-5">Privacy Policy</h1>
          <p className="max-w-2xl text-xl text-[#94a3b8]">
            How Fenris Gaming LLC handles privacy for this website, store purchases on Shopify,
            marketing texts, and optional chat.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-16 space-y-10">
        <nav aria-label="Privacy policy sections" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#94a3b8]">
          <a href="#store-purchases" className="hover:text-[#c5a46e] transition-colors">
            Store purchases
          </a>
          <a href="#sms" className="hover:text-[#c5a46e] transition-colors">
            SMS / text messaging
          </a>
          <a href="#chat" className="hover:text-[#c5a46e] transition-colors">
            Store chat
          </a>
          <a href="#contact" className="hover:text-[#c5a46e] transition-colors">
            Contact
          </a>
        </nav>

        <section
          id="store-purchases"
          className="bg-[#11151f] border border-[#1f2535] rounded-3xl p-8 md:p-10 scroll-mt-28"
        >
          <div className="uppercase tracking-widest text-xs text-[#c5a46e] mb-2">SHOPIFY STORE</div>
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Store purchases</h2>
          <div className="space-y-4 text-[#cbd5e1] leading-relaxed">
            <p>
              Purchases, customer accounts, and shopping on the Fenris store are governed by the
              Fenris Gaming privacy policy hosted on Shopify. That live Shopify policy is the
              source of truth for store data. We do not reproduce Shopify’s legal text on this
              page.
            </p>
            <p>
              The Fenris store lives at{' '}
              <a
                href="https://fenrisgaming.myshopify.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c5a46e] hover:underline"
              >
                fenrisgaming.myshopify.com
              </a>
              . Please read the full store privacy policy before creating an account or placing an
              order.
            </p>
          </div>
          <a
            href={SHOPIFY_PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 px-8 h-12 text-sm"
          >
            Read the Shopify privacy policy
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </section>

        <section
          id="sms"
          className="bg-[#11151f] border border-[#1f2535] rounded-3xl p-8 md:p-10 scroll-mt-28"
        >
          <div className="uppercase tracking-widest text-xs text-[#c5a46e] mb-2">MESSAGING</div>
          <h2 className="text-3xl font-semibold tracking-tight mb-4">SMS / text messaging</h2>
          <div className="space-y-4 text-[#cbd5e1] leading-relaxed">
            <p>
              Fenris Gaming LLC may send automated marketing text messages about abandoned carts
              and offers only if you separately opt in (for example by checking an SMS marketing
              box and providing your mobile number). Message frequency varies. Consent is not a
              condition of purchase. Message and data rates may apply. Reply STOP to cancel, HELP
              for help. Marketing texts are sent Monday–Saturday 9:00 a.m.–8:00 p.m. Eastern Time;
              we do not send marketing SMS on Sundays.
            </p>
            <p>
              Email marketing opt-in is separate from SMS consent. Providing a phone number for
              shipping or account purposes alone is not SMS marketing consent.
            </p>
            <p>
              Commercial emails include our physical address: {PHYSICAL_ADDRESS}, and an
              unsubscribe link.
            </p>
          </div>
        </section>

        <section
          id="chat"
          className="bg-[#11151f] border border-[#1f2535] rounded-3xl p-8 md:p-10 scroll-mt-28"
        >
          <div className="uppercase tracking-widest text-xs text-[#c5a46e] mb-2">WEBSITE &amp; STORE</div>
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Store chat / AI assistant</h2>
          <div className="space-y-5 text-[#cbd5e1] leading-relaxed">
            <p>
              Fenris Gaming LLC (“Fenris,” “we”) may offer an optional chat assistant on our
              website or Shopify storefront to answer common questions about products, shipping as
              published on our site, store information, and similar topics.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">What we collect.</h3>
              <p>
                If you use the chat, we may collect the messages you send, the replies shown,
                technical data needed to run the chat (such as approximate time of the
                conversation), and—if you are logged into your customer account—information needed
                to show your own order status. Please do not send payment card numbers, passwords,
                or government ID numbers in chat.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">Order status.</h3>
              <p>
                Order status in chat is available only when you are logged into your Shopify
                customer account. We do not look up orders by order number and email alone. When
                order information is shown, we limit address detail to city and state (and shipping
                method); we do not display your full street address in chat.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">How we use chat data.</h3>
              <p>
                We use chat content to respond to you, improve our customer service, prevent abuse,
                and meet legal obligations. We do not sell your chat messages.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">Vendors.</h3>
              <p>
                The chat may be provided by a service provider under contract. That provider may
                process chat data for us under a data processing agreement. We require that Fenris
                chat content not be used to train public or foundation AI models unless we agree in
                writing. The specific vendor will be named here before the chat is turned on. Until
                a vendor is selected and contracted, this section describes our intended practices;
                the chatbot is not live solely because this page exists.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">Retention.</h3>
              <p>
                We keep chat transcripts for up to 90 days, then delete or anonymize them, unless
                we must keep a record longer for a dispute, chargeback, legal claim, or safety
                issue.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">Children under 13.</h3>
              <p>
                Our chat is not directed at children under 13. We do not knowingly collect personal
                information from children under 13 through chat. If you believe a child under 13
                has used the chat, contact us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#c5a46e] hover:underline">
                  {CONTACT_EMAIL}
                </a>{' '}
                and we will delete the information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">Contact / requests.</h3>
              <p>
                For privacy questions, deletion requests, or concerns about chat data, email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#c5a46e] hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>

            <p>
              <span className="font-semibold text-white">Physical mailing address:</span>{' '}
              {PHYSICAL_ADDRESS}
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="bg-[#11151f] border border-[#1f2535] rounded-3xl p-8 md:p-10 scroll-mt-28"
        >
          <div className="uppercase tracking-widest text-xs text-[#c5a46e] mb-2">QUESTIONS</div>
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Contact</h2>
          <div className="space-y-4 text-[#cbd5e1] leading-relaxed">
            <p>
              For privacy questions about this website, SMS, or chat, email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#c5a46e] hover:underline">
                {CONTACT_EMAIL}
              </a>
              . For store-account and purchase privacy requests, start with the{' '}
              <a
                href={SHOPIFY_PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c5a46e] hover:underline"
              >
                Shopify privacy policy
              </a>
              .
            </p>
            <p>{PHYSICAL_ADDRESS}</p>
          </div>
        </section>

        <div className="pt-4 text-center text-sm text-[#64748b] border-t border-[#1f2535]">
          <Link href="/contact" className="hover:text-[#c5a46e] transition-colors">
            Visit or write Fenris Gaming Hall
          </Link>
        </div>
      </div>
    </div>
  );
}
