import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — PoltuReform',
  description:
    'How PoltuReform collects, uses, shares, and protects your personal data, aligned with India’s Digital Personal Data Protection Act, 2023.',
}

export default function PrivacyPage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <span className="text-sm font-bold tracking-tight">
              PoltuReform
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Poltu — Privacy Policy
        </h1>
        <div className="mt-4 flex flex-col gap-1 text-sm text-muted-foreground">
          <p>
            <strong className="font-semibold text-foreground">
              Effective Date:
            </strong>{' '}
            July 4, 2026
          </p>
          <p>
            <strong className="font-semibold text-foreground">
              Last Updated:
            </strong>{' '}
            July 4, 2026
          </p>
        </div>

        <div
          className="mt-10 text-[0.95rem] leading-relaxed text-muted-foreground
            [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/40 [&_a]:underline-offset-4 hover:[&_a]:text-primary/80
            [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:md:text-2xl
            [&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground
            [&_hr]:my-12 [&_hr]:border-border
            [&_li]:mt-2
            [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6
            [&_p]:mt-4
            [&_strong]:font-semibold [&_strong]:text-foreground
            [&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
            [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top
            [&_th]:border [&_th]:border-border [&_th]:bg-card [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground
            [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"
        >
          <p>
            This Privacy Policy explains how [Insert Legal Entity Name] (&ldquo;
            <strong>Poltu</strong>,&rdquo; &ldquo;<strong>Company</strong>,&rdquo;
            &ldquo;<strong>we</strong>,&rdquo; &ldquo;<strong>us</strong>&rdquo;),
            as the Data Fiduciary, collects, uses, shares, and protects personal
            data through the Poltu platform, mobile application, and website (the
            &ldquo;<strong>Platform</strong>&rdquo;).
          </p>
          <p>
            This Policy is built around the Digital Personal Data Protection Act,
            2023 (&ldquo;<strong>DPDP Act</strong>&rdquo;) and the DPDP Rules,
            2025, notified on 13 November 2025. The DPDP Act&rsquo;s core
            operational obligations — notice and consent standards, security
            safeguards, breach notification, and data-principal rights — are being
            phased in, with full compliance required by 13 May 2027. In the
            interim, we also continue to observe the Information Technology Act,
            2000 and the Information Technology (Reasonable Security Practices and
            Sensitive Personal Data or Information) Rules, 2011, which remain in
            force.
          </p>

          <hr />

          <h2>1. What Makes Poltu&rsquo;s Privacy Different</h2>
          <p>
            Poltu&rsquo;s transparency mission means{' '}
            <strong>some of the data below is, by design, made public</strong>. We
            want to be upfront about this before you use the Platform:
          </p>
          <ul>
            <li>
              <strong>Candidate and Party disclosures</strong> (Section 3) are
              published publicly, mirroring information required in Election
              Commission of India nomination affidavits.
            </li>
            <li>
              <strong>Fund-release approvals</strong> — how a Donor pool voted on
              a proposed use of funds — may be visible to other Donors in that
              pool, and aggregate outcomes may be shown publicly, even where
              individual identities are not.
            </li>
            <li>
              <strong>Community content</strong> you post (comments, issue pages,
              discourse-column submissions, idea-sponsorship profiles) is public
              by nature.
            </li>
          </ul>
          <p>
            Everything else — your contact details, payment information, donation
            history tied to your identity, and your self-declared ideological
            preferences — is treated as private data under this Policy and is{' '}
            <strong>not</strong> published, subject to Section 6.
          </p>

          <h2>2. Data Fiduciary and Contact</h2>
          <p>
            <strong>Data Fiduciary:</strong> [Legal Entity Name]
            <br />
            <strong>Registered Office:</strong> [Address]
            <br />
            <strong>Privacy / Grievance Contact:</strong>{' '}
            <a href="mailto:support.poltu@gmail.com">support.poltu@gmail.com</a>
          </p>

          <h2>3. Personal Data We Collect</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Examples</th>
                <th>Collected from</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identity &amp; contact data</td>
                <td>Name, phone number, email, address</td>
                <td>You, at registration</td>
              </tr>
              <tr>
                <td>Government ID / KYC data</td>
                <td>
                  Voter ID, PAN, passport; where Aadhaar-based e-KYC is used, only
                  through UIDAI-permitted authentication methods
                </td>
                <td>You, our KYC/verification partner</td>
              </tr>
              <tr>
                <td>Financial data</td>
                <td>
                  Payment instrument details (tokenized by our payment partner),
                  donation amounts and history
                </td>
                <td>You, our payment partner</td>
              </tr>
              <tr>
                <td>Candidate disclosure data</td>
                <td>
                  Criminal antecedents (if any), assets/liabilities, educational
                  qualifications, prior public office
                </td>
                <td>Candidates, at registration</td>
              </tr>
              <tr>
                <td>Ideological/preference data</td>
                <td>
                  Self-declared political or ideological alignment used for
                  candidate/Party/Influencer matching
                </td>
                <td>You, if you choose to provide it</td>
              </tr>
              <tr>
                <td>Location data</td>
                <td>
                  Constituency/area, and precise location if you enable it, for
                  hyper-local ad delivery and candidate matching
                </td>
                <td>Your device, if permitted</td>
              </tr>
              <tr>
                <td>Usage &amp; device data</td>
                <td>Log data, device identifiers, cookies (Section 10)</td>
                <td>Automatically</td>
              </tr>
              <tr>
                <td>User-generated content</td>
                <td>
                  Posts, comments, issue pages, discourse submissions,
                  idea-sponsorship profiles
                </td>
                <td>You</td>
              </tr>
              <tr>
                <td>Communications</td>
                <td>Messages to support/grievance contacts</td>
                <td>You</td>
              </tr>
            </tbody>
          </table>
          <p>
            We collect only what is reasonably necessary for the purposes in
            Section 4, consistent with the DPDP Act&rsquo;s data-minimization
            principle.
          </p>

          <h2>4. How We Use Personal Data</h2>
          <p>We process personal data to:</p>
          <ol>
            <li>create and verify accounts (Donor, Candidate, Influencer, Party);</li>
            <li>
              process Contributions and operate the escrow/fund-release workflow,
              including donor-approval voting;
            </li>
            <li>
              display Candidate/Party disclosures and community-validation
              signals;
            </li>
            <li>
              power ideological matching between Donors, Influencers, Candidates,
              and Parties;
            </li>
            <li>
              deliver constituency-geofenced advertising to eligible pre-funding
              Candidates;
            </li>
            <li>
              operate community features (issue pages, discourse columns, idea
              sponsorship);
            </li>
            <li>coordinate print/outdoor distribution logistics, where relevant;</li>
            <li>
              prevent fraud and meet KYC/AML and election-law obligations;
            </li>
            <li>
              respond to your requests and communicate with you about your account
              (and, only with your separate opt-in, other updates); and
            </li>
            <li>improve and secure the Platform.</li>
          </ol>

          <h2>5. Legal Basis</h2>
          <p>
            Where required, we process personal data on the basis of your consent,
            which we seek through clear, itemized notice at the point of
            collection. Some processing (for example, to comply with a legal
            obligation such as an ECI or tax-authority request, or to respond to a
            medical emergency) may proceed under the &ldquo;legitimate uses&rdquo;
            recognized by the DPDP Act without separate consent. You may withdraw
            consent at any time as described in Section 8, as easily as you gave
            it.
          </p>

          <h2>6. Ideological and Preference Data — Special Care</h2>
          <p>
            Because political opinion is sensitive, we treat your self-declared
            ideological alignment with particular care:
          </p>
          <ul>
            <li>
              Providing it is <strong>optional</strong>; you can use core Platform
              features without it, though matching features will be limited.
            </li>
            <li>
              It is used only for the matching purposes in Section 4 and is{' '}
              <strong>not</strong> shared with advertisers or used outside the
              Platform for unrelated purposes.
            </li>
            <li>
              You can review, change, or delete it at any time in your privacy
              settings, or by contacting us (Section 9).
            </li>
          </ul>

          <h2>7. Sharing and Disclosure</h2>
          <p>We share personal data only as follows:</p>
          <ul>
            <li>
              <strong>With Recipients and Donor pools</strong>, to the extent
              necessary to operate the escrow/approval workflow described in our
              Terms of Service (for example, a Candidate sees that &ldquo;50% of
              the pool approved,&rdquo; not necessarily each Donor&rsquo;s
              identity, unless you choose to be identified).
            </li>
            <li>
              <strong>With payment, KYC, and cloud/infrastructure service
              providers</strong>, under contracts that limit their use of your
              data to providing services to us.
            </li>
            <li>
              <strong>With government authorities, the Election Commission of
              India, courts, or regulators</strong>, where legally required or to
              establish, exercise, or defend legal claims.
            </li>
            <li>
              <strong>With Influencers</strong>, only in aggregate, non-identifying
              form, unless you separately opt to be identified to them.
            </li>
            <li>
              <strong>In a merger, acquisition, or asset transfer</strong>,
              subject to continued protection under a policy at least as protective
              as this one.
            </li>
          </ul>
          <p>
            <strong>We do not sell personal data</strong>, and we do not share it
            with third parties for their own independent marketing.
          </p>

          <h2>8. Your Rights</h2>
          <p>
            Consistent with the DPDP Act (as its provisions come into force), you
            have the right to:
          </p>
          <ul>
            <li>
              <strong>Access</strong> a summary of the personal data we hold about
              you and how we process it;
            </li>
            <li>
              <strong>Correct, complete, or update</strong> inaccurate or outdated
              data;
            </li>
            <li>
              <strong>Erase</strong> data no longer necessary for the purpose it
              was collected, subject to our legal retention obligations (Section
              9);
            </li>
            <li>
              <strong>Withdraw consent</strong> for consent-based processing (e.g.,
              ideological matching, marketing communications) at any time, without
              affecting processing already carried out — note that withdrawing
              consent for mandatory Candidate disclosures isn&rsquo;t possible
              while you&rsquo;re actively contesting an election, since that data
              is both core to the Platform&rsquo;s design and separately required
              by election law;
            </li>
            <li>
              <strong>Nominate</strong> another individual to exercise your rights
              in the event of your death or incapacity; and
            </li>
            <li>
              <strong>Register a grievance</strong> with us (Section 12) and, if
              unresolved, escalate to the Data Protection Board of India.
            </li>
          </ul>
          <p>
            To exercise these rights, contact us using the details in Section 12 or
            through in-app privacy settings, where available. We will respond
            within the timelines required by law.
          </p>

          <h2>9. Data Storage, Security, and Retention</h2>
          <p>
            9.1 We apply access controls, encryption in transit and at rest, and
            other reasonable security safeguards appropriate to the sensitivity of
            the data.
          </p>
          <p>
            9.2 We primarily store data on infrastructure located in India. Any
            cross-border processing (e.g., a cloud region outside India) will
            comply with the DPDP Act&rsquo;s rules on transfers outside India,
            including any country-specific restrictions the Government notifies.
          </p>
          <p>
            9.3 We retain data for as long as your account is active, plus any
            period required afterward for legal, tax, audit, or election-law
            purposes (financial and donation records are typically retained for
            several years to meet statutory requirements). Public disclosure data
            tied to a real candidacy (Section 1) may be retained longer to preserve
            the historical/transparency record, consistent with the Platform&rsquo;s
            purpose. We delete or anonymize other personal data once it&rsquo;s no
            longer needed, subject to your rights in Section 8.
          </p>

          <h2>10. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies for authentication, security,
            remembering preferences, and analytics. Where required, we present a
            cookie/consent banner letting you manage non-essential cookies. You can
            also control cookies through your browser or device settings.
          </p>

          <h2>11. Children</h2>
          <p>
            The Platform is intended for users aged 18 and above and is not
            directed at children. We do not knowingly collect personal data from
            anyone under 18. If we learn we have done so, we will delete it,
            consistent with the DPDP Act&rsquo;s requirements for processing
            children&rsquo;s data, including verifiable parental/guardian consent
            where any age-appropriate feature requires it.
          </p>

          <h2>12. Grievance / Privacy Contact</h2>
          <ul>
            <li>
              <strong>Grievance Officer:</strong> [Name]
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:support.poltu@gmail.com">
                support.poltu@gmail.com
              </a>
            </li>
            <li>
              <strong>Address:</strong> [Registered Office Address]
            </li>
          </ul>
          <p>
            We acknowledge requests promptly and aim to resolve them within the
            timeline prescribed under applicable law.
          </p>

          <h2>13. Third-Party Links and Integrations</h2>
          <p>
            The Platform may link to, or offer subscription access to, third-party
            tools (e.g., voter-analytics or campaign-consultancy platforms). Their
            own privacy policies govern any data you provide directly to them.
          </p>

          <h2>14. Data Breach Notification</h2>
          <p>
            If a personal data breach occurs, we will notify the Data Protection
            Board of India and affected Users as required under the DPDP Act and
            DPDP Rules, including any follow-up report within the prescribed
            window.
          </p>

          <h2>15. Changes to This Policy</h2>
          <p>
            We may update this Policy from time to time. We will post the revised
            Policy with a new &ldquo;Last Updated&rdquo; date and, for material
            changes, provide additional notice before the changes take effect.
          </p>

          <h2>16. Governing Law</h2>
          <p>This Policy is governed by the laws of India.</p>

          <h2>17. Contact Us</h2>
          <p>
            [Legal Entity Name]
            <br />
            [Registered Office Address]
            <br />
            <a href="mailto:support.poltu@gmail.com">
              support.poltu@gmail.com
            </a>
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
