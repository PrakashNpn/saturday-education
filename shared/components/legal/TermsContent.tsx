import LegalPageLayout from './LegalPageLayout'

export default function TermsContent() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="June 2026"
      intro="These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the Saturday Education Consulting website and consulting services. By using our website or booking a consultation with us, you agree to these Terms."
      sections={[
        {
          heading: '1. Our Services',
          body: (
            <p>
              Saturday Education Consulting provides study-abroad guidance, including university and program matching,
              application support, visa guidance, scholarship guidance, and predeparture and arrival assistance. Our
              services are advisory in nature — final admission, visa, and scholarship decisions are made solely by
              the relevant universities, institutions, and government authorities.
            </p>
          ),
        },
        {
          heading: '2. Booking a Consultation',
          body: (
            <p>
              When you submit a consultation request through our website, you agree to provide accurate and complete
              information so that we can best assist you. We will use the details you provide to contact you and
              follow up on your study-abroad plans.
            </p>
          ),
        },
        {
          heading: '3. No Guarantee of Outcome',
          body: (
            <p>
              While we do our best to guide you toward suitable universities and programs, we cannot guarantee
              admission, visa approval, or scholarship awards, as these decisions rest entirely with third-party
              institutions and authorities.
            </p>
          ),
        },
        {
          heading: '4. AI Advisor',
          body: (
            <p>
              Our website includes an AI-powered advisor chat to help answer general questions about studying abroad.
              Responses are provided for informational purposes only and should not be treated as a substitute for
              personalized advice from our consulting team.
            </p>
          ),
        },
        {
          heading: '5. Intellectual Property',
          body: (
            <p>
              All content on this website — including text, graphics, logos, and the Saturday Education brand — is the
              property of Saturday Education Consulting and may not be copied, reproduced, or used without our prior
              written permission.
            </p>
          ),
        },
        {
          heading: '6. Limitation of Liability',
          body: (
            <p>
              Saturday Education Consulting is not liable for any indirect or consequential loss arising from your use
              of our website or services, including decisions made by universities, immigration authorities, or other
              third parties.
            </p>
          ),
        },
        {
          heading: '7. Changes to These Terms',
          body: (
            <p>
              We may update these Terms from time to time. Continued use of our website or services after changes are
              posted means you accept the updated Terms.
            </p>
          ),
        },
        {
          heading: '8. Contact Us',
          body: (
            <p>
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:info@saturdayeducation.com" className="text-brand-purple hover:underline">
                info@saturdayeducation.com
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  )
}
