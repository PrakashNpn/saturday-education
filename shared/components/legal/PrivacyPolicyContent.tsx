import LegalPageLayout from './LegalPageLayout'

export default function PrivacyPolicyContent() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="June 2026"
      intro="Saturday Education Consulting (&ldquo;Saturday Education&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy of students, parents, and visitors who use our website and study-abroad consulting services. This Privacy Policy explains what information we collect, how we use it, and the choices you have."
      sections={[
        {
          heading: '1. Information We Collect',
          body: (
            <>
              <p>When you book a free consultation, use our AI advisor, or otherwise contact us, we may collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your full name, email address, and phone number</li>
                <li>Your target study destination, preferred consultation type, and any inquiry details you share with us</li>
                <li>Messages you exchange with our AI advisor chat widget</li>
                <li>Basic technical data such as browser type and device information, used to keep our website secure and functioning correctly</li>
              </ul>
            </>
          ),
        },
        {
          heading: '2. How We Use Your Information',
          body: (
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to your consultation request and provide personalized study-abroad guidance</li>
              <li>To match you with suitable universities, programs, and scholarship opportunities</li>
              <li>To communicate with you via email, phone, WhatsApp, or Messenger about your application journey</li>
              <li>To improve our website, services, and AI advisor based on how they are used</li>
            </ul>
          ),
        },
        {
          heading: '3. How We Protect Your Information',
          body: (
            <p>
              We store your information on secure, access-controlled systems and only share it with trusted partner
              universities or institutions when necessary to process your application — and only with your knowledge.
              We do not sell your personal information to third parties.
            </p>
          ),
        },
        {
          heading: '4. Your Choices',
          body: (
            <p>
              You may ask us to access, update, or delete the personal information we hold about you at any time by
              contacting us at{' '}
              <a href="mailto:info@saturdayeducation.com" className="text-brand-purple hover:underline">
                info@saturdayeducation.com
              </a>
              . You may also opt out of receiving non-essential communications from us at any time.
            </p>
          ),
        },
        {
          heading: '5. Cookies',
          body: (
            <p>
              Our website may use cookies and similar technologies to remember your preferences (such as language) and
              understand how visitors use our site, helping us improve your experience.
            </p>
          ),
        },
        {
          heading: '6. Changes to This Policy',
          body: (
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal
              reasons. We encourage you to review this page periodically for the latest information.
            </p>
          ),
        },
        {
          heading: '7. Contact Us',
          body: (
            <p>
              If you have any questions about this Privacy Policy or how we handle your information, please reach out
              to us at{' '}
              <a href="mailto:info@saturdayeducation.com" className="text-brand-purple hover:underline">
                info@saturdayeducation.com
              </a>{' '}
              or through our consultation form.
            </p>
          ),
        },
      ]}
    />
  )
}
