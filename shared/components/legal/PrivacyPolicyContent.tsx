import LegalPageLayout from './LegalPageLayout'

const EMAIL = 'info@saturdayeducation.com'

function Mail() {
  return (
    <a href={`mailto:${EMAIL}`} className="text-brand-purple hover:underline">
      {EMAIL}
    </a>
  )
}

export default function PrivacyPolicyContent() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="16 June 2026"
      centerTitle
      intro="Saturday Education Consulting (&ldquo;Saturday Education&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy of students, parents, and visitors who use our website and study-abroad consulting services. This Privacy Policy explains who we are, what personal information we collect, why and how we use it, who we share it with, how long we keep it, and the rights and choices you have. We have prepared it in line with the guidance of the UK Information Commissioner&rsquo;s Office (ICO), as updated by the Data (Use and Access) Act 2025, and with applicable data protection laws in the countries where we operate."
      sections={[
        {
          heading: '1. Who We Are and How to Contact Us',
          body: (
            <>
              <p>
                Saturday Education Consulting is the &ldquo;controller&rdquo; responsible for the personal
                information described in this policy. We provide study-abroad consulting services to students
                and parents, primarily across Asia.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Registered business name:</strong> Saturday Education Consulting
                </li>
                <li>
                  <strong>Address:</strong> Shine Tower, 5th Floor, 20, 22 Alan Pya Pagoda Street, Yangon,
                  Myanmar (Burma)
                </li>
                <li>
                  <strong>Data protection contact:</strong> <Mail />
                </li>
              </ul>
              <p>
                If you have any question about this policy or about how we handle your information, please
                contact us using the details above. We do not have a statutory Data Protection Officer, but the
                contact above is responsible for privacy matters and will handle your request.
              </p>
            </>
          ),
        },
        {
          heading: '2. The Information We Collect',
          body: (
            <>
              <p>
                When you book a free consultation, take our career assessment, use our AI advisor, or otherwise
                contact us, we may collect:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Identity and contact details:</strong> your full name, email address, and phone
                  number.
                </li>
                <li>
                  <strong>Enquiry details:</strong> your target study destination, education level, preferred
                  consultation type, and anything you choose to tell us about your goals.
                </li>
                <li>
                  <strong>AI advisor messages:</strong> the messages you exchange with our AI advisor chat
                  widget.
                </li>
                <li>
                  <strong>Career assessment data:</strong> the answers you give in our assessment and the
                  personalised results we generate from them.
                </li>
                <li>
                  <strong>Technical and usage data:</strong> basic information such as browser type, device
                  information, and how you use our site, used to keep our website secure and working correctly.
                </li>
              </ul>
              <p>
                We do not intentionally collect special category data (such as health, religion, or ethnicity).
                Please do not share such information with us unless it is necessary for your application.
              </p>
              <p>
                Providing this information is voluntary, but if you choose not to, we may not be able to respond
                to your enquiry or provide our services.
              </p>
            </>
          ),
        },
        {
          heading: '3. How We Use Your Information and Our Lawful Bases',
          body: (
            <>
              <p>We use your personal information for the following purposes, relying on the lawful bases shown:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>To respond to your enquiry and provide consultation and assessment services:</strong>{' '}
                  on the basis of taking steps at your request before entering into a contract, and our
                  legitimate interests in responding to you.
                </li>
                <li>
                  <strong>To match you with suitable universities, programs, and scholarships:</strong> on the
                  basis of our legitimate interests in providing useful, personalised guidance.
                </li>
                <li>
                  <strong>To communicate with you</strong> by email, phone, WhatsApp, or Messenger about your
                  application journey: to provide the service you asked for, and, for any marketing or
                  newsletters, on the basis of your consent.
                </li>
                <li>
                  <strong>To keep our website secure and to improve our services and AI advisor:</strong> on the
                  basis of our legitimate interests in running and improving a safe, effective service.
                </li>
                <li>
                  <strong>To measure our advertising and reach people who have visited our site:</strong> on the
                  basis of your consent, given through our cookie banner. This applies only if you accept
                  marketing cookies, and you can withdraw that consent at any time.
                </li>
              </ul>
              <p>
                Where we rely on consent (for example, for marketing messages), you can withdraw it at any time.
                See &ldquo;Your Rights and Choices&rdquo; below.
              </p>
            </>
          ),
        },
        {
          heading: '4. Our Legitimate Interests',
          body: (
            <p>
              Where we rely on legitimate interests, those interests are: responding to and supporting people
              who contact us; providing relevant study-abroad guidance and university matches; keeping our
              website and systems secure; and understanding and improving how our services and AI advisor are
              used. We balance these interests against your rights, and you can object to this processing at any
              time (see below).
            </p>
          ),
        },
        {
          heading: '5. Automated Processing and the Career Assessment',
          body: (
            <p>
              Our career assessment uses automated processing (including profiling) to analyse your answers and
              generate suggested career directions, university fields, and a personalised report. This is
              designed to give you helpful starting points. It is not a solely automated decision that produces
              legal or similarly significant effects for you, and a human counsellor is involved in any advice or
              recommendations we give. You can ask us about the logic involved, ask a person to review your
              results, or object to this processing by contacting us at <Mail />.
            </p>
          ),
        },
        {
          heading: '6. Who We Share Your Information With',
          body: (
            <>
              <p>We do not sell your personal information. We share it only where necessary, with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Partner universities and institutions:</strong> only when needed to process your
                  application, and only with your knowledge.
                </li>
                <li>
                  <strong>Trusted service providers who process data on our behalf:</strong> our AI, email
                  delivery, website hosting, and database providers, under contract and only on our
                  instructions.
                </li>
                <li>
                  <strong>Advertising platforms, only if you accept marketing cookies:</strong> where you have
                  consented, the Meta Pixel shares your visit to our site with Meta Platforms so that we can
                  measure our advertising. Meta uses this data for its own purposes as well as ours. If you do
                  not accept marketing cookies, nothing is shared with Meta.
                </li>
              </ul>
              <p>
                We may also disclose information where required by law, or to protect the rights, safety, or
                security of our users and our organisation.
              </p>
            </>
          ),
        },
        {
          heading: '7. International Data Transfers',
          body: (
            <p>
              Some of the providers we use process data outside the countries where we operate. This includes the{' '}
              <strong>United States</strong>, where our AI, email delivery, website hosting, and, where you have
              accepted marketing cookies, our advertising providers operate, and <strong>Japan</strong>, where our
              database is hosted. When we use these providers, we put data
              processing agreements in place that require recognised safeguards, such as the Standard Contractual
              Clauses (including the UK Addendum where relevant). Where Thailand&rsquo;s Personal Data Protection
              Act (PDPA) applies, we make these transfers in line with its cross-border transfer rules. You can
              ask us for more detail about these safeguards using the contact details above.
            </p>
          ),
        },
        {
          heading: '8. How Long We Keep Your Information',
          body: (
            <p>
              We keep your personal information only for as long as we need it. As a general rule, we keep
              enquiry, consultation, and assessment records for up to <strong>24 months</strong> after our last
              meaningful interaction with you, after which we delete or anonymise them, unless you ask us to
              delete them sooner, or we are required to keep them longer for legal or accounting reasons.
            </p>
          ),
        },
        {
          heading: '9. How We Protect Your Information',
          body: (
            <p>
              We store your information on secure, access-controlled systems, and we use encryption in transit to
              protect it as it travels over the internet. We limit access to those who need it to help you, and
              we work only with reputable service providers who are contractually required to protect your data.
            </p>
          ),
        },
        {
          heading: '10. Your Rights and Choices',
          body: (
            <>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>access the personal information we hold about you;</li>
                <li>ask us to correct information that is inaccurate or incomplete;</li>
                <li>ask us to delete your information (the right to erasure);</li>
                <li>ask us to restrict how we use your information;</li>
                <li>object to processing based on our legitimate interests, and to direct marketing;</li>
                <li>ask us to transfer your information to you or another provider (data portability); and</li>
                <li>withdraw your consent at any time, where we rely on consent.</li>
              </ul>
              <p>
                You can also opt out of non-essential communications from us at any time. To exercise any of
                these rights, contact us at <Mail />. We will respond within one month. Exercising your rights is
                free, and it will not affect the service we provide to you.
              </p>
            </>
          ),
        },
        {
          heading: '11. Cookies and Analytics',
          body: (
            <>
              <p>We keep our use of cookies to a minimum and group them as follows:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Strictly necessary:</strong> one functional cookie that remembers your language
                  preference. This is always on, because the site needs it to work.
                </li>
                <li>
                  <strong>Analytics:</strong> with your consent, we use Google Analytics to understand how
                  visitors use our site so that we can improve it. These cookies are set only after you accept
                  them. We also use Vercel&rsquo;s privacy-friendly analytics, which does not use cookies.
                </li>
                <li>
                  <strong>Marketing:</strong> with your consent, we use the Meta Pixel, an advertising and
                  measurement tool provided by Meta Platforms (the company behind Facebook and Instagram). It
                  sets cookies that allow us to measure how well our advertising works, and to show our adverts
                  to people who have visited our site. It records that you visited a page on our site, along
                  with your IP address and browser information, and shares that with Meta. It is set only after
                  you accept marketing cookies, and it is switched off by default.
                </li>
              </ul>
              <p>
                Analytics and marketing cookies are separate choices. When you first visit, our cookie banner
                lets you <strong>accept</strong> or <strong>reject</strong> all non-essential cookies with equal
                ease, and <strong>&ldquo;Customize&rdquo;</strong> lets you accept analytics without accepting
                marketing, or the other way round. You can change your choice at any time using the{' '}
                <strong>&ldquo;Cookie settings&rdquo;</strong> link in our website footer. If you withdraw
                consent, we delete the relevant cookies. You can also block or delete cookies through your
                browser settings, and you can control how Meta uses your data for advertising in your{' '}
                <a
                  href="https://www.facebook.com/adpreferences"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-purple hover:underline"
                >
                  Facebook ad preferences
                </a>
                .
              </p>
            </>
          ),
        },
        {
          heading: '12. Children and Young People',
          body: (
            <p>
              Our services are intended for students aged 16 and over. If you are under 18, we ask that a parent
              or guardian is aware of, and involved in, your use of our services. We do not knowingly collect
              information from children under 16 without the involvement of a parent or guardian. If you believe
              a child has provided us with personal information without appropriate consent, please contact us
              and we will delete it.
            </p>
          ),
        },
        {
          heading: '13. How to Make a Complaint',
          body: (
            <>
              <p>
                If you are concerned about how we have handled your personal information, please tell us first so
                we can put things right. You can raise a complaint with us at <Mail />. We will acknowledge your
                complaint within <strong>30 days</strong> and aim to resolve it within three months, and we will
                explain the outcome to you in plain language.
              </p>
              <p>
                If you are not satisfied with our response, you have the right to complain to the UK Information
                Commissioner&rsquo;s Office (ICO) at{' '}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-purple hover:underline"
                >
                  ico.org.uk
                </a>{' '}
                (helpline 0303 123 1113), or to the data protection authority in your own country, for example
                Thailand&rsquo;s Personal Data Protection Committee (PDPC). We would, however, welcome the chance
                to address your concerns before you approach a regulator.
              </p>
            </>
          ),
        },
        {
          heading: '14. Changes to This Policy',
          body: (
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for
              legal reasons. When we make significant changes, we will update the &ldquo;Last updated&rdquo; date
              at the top of this page. If we plan to use your information for a new purpose, we will update this
              policy and tell you before we start. We encourage you to review this page periodically for the
              latest information.
            </p>
          ),
        },
        {
          heading: '15. Contact Us',
          body: (
            <p>
              If you have any questions about this Privacy Policy or how we handle your information, please reach
              out to us at <Mail /> or through our consultation form.
            </p>
          ),
        },
      ]}
    />
  )
}
