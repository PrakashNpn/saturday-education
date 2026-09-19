import LegalPageLayout from './LegalPageLayout'
import { Link } from '@/i18n/navigation'

const EMAIL = 'info@saturdayeducation.com'

function Mail() {
  return (
    <a href={`mailto:${EMAIL}`} className="text-action hover:underline">
      {EMAIL}
    </a>
  )
}

function PrivacyLink() {
  return (
    <Link href="/privacy" className="text-action hover:underline">
      Privacy Policy
    </Link>
  )
}

export default function TermsContent() {
  return (
    <LegalPageLayout
      title="Terms &amp; Conditions"
      lastUpdated="16 June 2026"
      centerTitle
      intro="These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the Saturday Education Consulting website and our study-abroad consulting services. They apply alongside our Privacy Policy. By using our website, booking a consultation, or engaging our services, you agree to these Terms. Please read them carefully."
      sections={[
        {
          heading: '1. About These Terms',
          body: (
            <>
              <p>
                Saturday Education Consulting (&ldquo;Saturday Education&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
                or &ldquo;our&rdquo;) provides study-abroad consulting services to students and parents, primarily
                across Asia. These Terms work together with our <PrivacyLink />, which explains how we handle your
                personal information.
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
                  <strong>Contact:</strong> <Mail />
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: '2. Eligibility',
          body: (
            <p>
              Our services are intended for users aged 16 and over. If you are under 18, you may use our website
              and services only with the knowledge and involvement of a parent or guardian. By using our website
              or engaging our services, you confirm that you meet these requirements.
            </p>
          ),
        },
        {
          heading: '3. Our Services',
          body: (
            <p>
              Saturday Education Consulting provides study-abroad guidance, including university and program
              matching, application support, visa guidance, scholarship guidance, and predeparture and arrival
              assistance. Our services are advisory in nature. Final admission, visa, and scholarship decisions
              are made solely by the relevant universities, institutions, and government authorities.
            </p>
          ),
        },
        {
          heading: '4. Booking a Consultation',
          body: (
            <p>
              When you submit a consultation request through our website, you agree to provide accurate and
              complete information so that we can best assist you. We will use the details you provide to contact
              you and follow up on your study-abroad plans, in line with our <PrivacyLink />.
            </p>
          ),
        },
        {
          heading: '5. Fees and Payment',
          body: (
            <p>
              Your initial consultation is free. Some services, such as application support, visa guidance, and
              scholarship assistance, may be chargeable. Where a service is chargeable, we will set out the fees
              and payment terms in writing and agree them with you before any paid work begins. Unless we state
              otherwise, our fees do not include third-party costs (such as university application fees, visa
              fees, or test fees), which you pay directly to the relevant organisation.
            </p>
          ),
        },
        {
          heading: '6. Cancellations and Refunds',
          body: (
            <p>
              You may cancel a free consultation at any time at no cost. For paid services, the cancellation and
              refund terms will be set out in the written agreement for that service. Where we have already
              carried out work, the fees for that work may be non-refundable.
            </p>
          ),
        },
        {
          heading: '7. Your Responsibilities',
          body: (
            <>
              <p>When you use our website and services, you agree to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>provide accurate, complete, and truthful information and documents;</li>
                <li>not submit false, misleading, or fraudulent documents;</li>
                <li>
                  comply with applicable laws and the requirements of the universities and authorities you apply
                  to; and
                </li>
                <li>
                  use our website only for lawful purposes, and not attempt to gain unauthorised access,
                  introduce malicious code, or disrupt its operation.
                </li>
              </ul>
              <p>
                You are responsible for the accuracy of the information and documents you give us. We are not
                responsible for outcomes, such as a visa refusal, that result from inaccurate or incomplete
                information you provide.
              </p>
            </>
          ),
        },
        {
          heading: '8. No Guarantee of Outcome',
          body: (
            <p>
              While we do our best to guide you toward suitable universities and programs, we cannot guarantee
              admission, visa approval, or scholarship awards, as these decisions rest entirely with third-party
              institutions and authorities.
            </p>
          ),
        },
        {
          heading: '9. AI Advisor',
          body: (
            <p>
              Our website includes an AI-powered advisor chat to help answer general questions about studying
              abroad. Its responses are generated automatically, are provided for general information only, may
              not always be accurate or complete, and should not be relied upon as a substitute for personalised
              advice from our consulting team.
            </p>
          ),
        },
        {
          heading: '10. Intellectual Property',
          body: (
            <p>
              All content on this website, including text, graphics, logos, and the Saturday Education brand, is
              the property of Saturday Education Consulting or our licensors and is protected by intellectual
              property laws. You may not copy, reproduce, distribute, or use it without our prior written
              permission.
            </p>
          ),
        },
        {
          heading: '11. Third-Party Links and Services',
          body: (
            <p>
              Our website and services may refer or link to third-party websites, universities, and institutions
              that we do not control. We provide these for convenience and are not responsible for their content,
              products, services, or privacy practices. Any dealings you have with third parties are solely
              between you and them.
            </p>
          ),
        },
        {
          heading: '12. Disclaimers',
          body: (
            <>
              <p>
                We take reasonable care and skill in providing our services and running our website. However:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  We aim to keep our website available and working well, but we cannot guarantee that it will
                  always be uninterrupted or error-free, and we may occasionally update or pause parts of it to
                  maintain or improve the service.
                </li>
                <li>
                  Study-abroad information, such as university requirements, courses, fees, deadlines, and visa
                  rules, can change frequently and varies by institution and country. While we work to keep our
                  guidance accurate, we do not warrant that it is always complete or current, and you should
                  confirm important details with the relevant university, embassy, or official authority before
                  relying on them.
                </li>
                <li>
                  Our guidance, including any responses from our AI advisor, is provided for general information
                  only and does not constitute legal, immigration, or financial advice. Where appropriate, you
                  should seek independent professional advice.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: '13. Limitation of Liability',
          body: (
            <p>
              To the maximum extent permitted by law, Saturday Education Consulting is not liable for any
              indirect, incidental, or consequential loss, or for any loss arising from decisions made by
              universities, immigration authorities, or other third parties, or from inaccurate information you
              provide. Nothing in these Terms excludes or limits our liability where it would be unlawful to do
              so, including liability for fraud or personal injury caused by our negligence.
            </p>
          ),
        },
        {
          heading: '14. Governing Law and Jurisdiction',
          body: (
            <p>
              These Terms are governed by the laws of Myanmar. Any dispute arising out of or in connection with
              these Terms or our services will be subject to the exclusive jurisdiction of the courts of Myanmar.
            </p>
          ),
        },
        {
          heading: '15. Changes to These Terms',
          body: (
            <p>
              We may update these Terms from time to time. When we do, we will update the &ldquo;Last
              updated&rdquo; date at the top of this page. Continued use of our website or services after changes
              are posted means you accept the updated Terms.
            </p>
          ),
        },
        {
          heading: '16. General',
          body: (
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions
              will continue in full force. These Terms, together with our <PrivacyLink />, make up the entire
              agreement between you and us regarding your use of our website and services.
            </p>
          ),
        },
        {
          heading: '17. Contact Us',
          body: (
            <p>
              If you have any questions about these Terms, please contact us at <Mail /> or using the details in
              Section 1.
            </p>
          ),
        },
      ]}
    />
  )
}
