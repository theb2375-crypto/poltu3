import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Terms of Service — PoltuReform',
  description:
    'The Terms of Service governing use of the Poltu platform for political crowdfunding, candidate support, and civic engagement in India.',
}

export default function TermsPage() {
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
          Poltu — Terms of Service
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
            These Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) are a
            binding agreement between you (&ldquo;<strong>User</strong>,&rdquo;
            &ldquo;<strong>you</strong>&rdquo;) and [Insert Legal Entity Name]
            (&ldquo;<strong>Poltu</strong>,&rdquo; &ldquo;
            <strong>Company</strong>,&rdquo; &ldquo;<strong>we</strong>,&rdquo;
            &ldquo;<strong>us</strong>&rdquo;), operator of the Poltu platform,
            mobile application, and website (together, the &ldquo;
            <strong>Platform</strong>&rdquo;) — a technology platform for
            political crowdfunding, candidate support, civic discussion, and
            voter engagement in India.
          </p>
          <p>
            By creating an account, making a donation, or registering as a
            Candidate, Influencer, or Party administrator, you agree to these
            Terms and to our Privacy Policy, which is incorporated by reference.
          </p>

          <hr />

          <h2>1. Who We Are and What Poltu Does</h2>
          <p>
            Poltu is a neutral technology intermediary. We are not a political
            party, and we do not endorse, support, or oppose any candidate,
            party, or ideology. Our role is to provide the infrastructure —
            crowdfunding, escrow-based fund management, candidate discovery,
            community discussion, and offline support — that lets any eligible
            Indian citizen contest an election on the strength of their ideas
            rather than their personal wealth or corporate backing.
          </p>
          <p>Through the Platform we offer:</p>
          <ul>
            <li>
              <strong>Political crowdfunding</strong> for individual candidates
              and political parties, with funds held pending donor-approved
              release.
            </li>
            <li>
              <strong>Candidate and party profiles</strong>, including mandatory
              public disclosures modeled on the Election Commission of
              India&rsquo;s nomination-affidavit requirements.
            </li>
            <li>
              <strong>Community tools</strong>, including issue-tracking pages,
              discourse columns, and &ldquo;idea sponsorship&rdquo; profiles for
              policy proposals.
            </li>
            <li>
              <strong>Influencer fundraising IDs</strong>, letting public figures
              pool donations from their audience and direct them to candidates
              whose platform aligns with their stated ideology.
            </li>
            <li>
              <strong>Voter mobilization tools</strong>, including referral-based
              messaging supporters can share within their own networks.
            </li>
            <li>
              <strong>Offline/O2O infrastructure</strong> — subsidized,
              constituency-geofenced digital advertising for pre-funding
              candidates, free print newspapers and magazines, rotating outdoor
              posters/banners, and public auditoriums.
            </li>
            <li>
              <strong>Small-scale virtual elections</strong> for institutions
              such as universities, using verified identity credentials.
            </li>
          </ul>
          <p>
            We may add, modify, or discontinue features at our discretion, with
            notice where reasonably practicable.
          </p>

          <h2>2. Definitions</h2>
          <ul>
            <li>
              <strong>&ldquo;Candidate&rdquo;</strong> — a User who registers to
              contest, or is contesting, an election at any level
              (institutional, Gram Panchayat, Vidhan Sabha, Lok Sabha, or
              otherwise).
            </li>
            <li>
              <strong>&ldquo;Donor&rdquo;</strong> — a User who makes a monetary
              contribution through the Platform.
            </li>
            <li>
              <strong>&ldquo;Influencer&rdquo;</strong> — a User who registers an
              Influencer ID to aggregate contributions from their audience.
            </li>
            <li>
              <strong>&ldquo;Party&rdquo;</strong> — a political grouping formed
              by Users on the Platform around shared ideological principles.
            </li>
            <li>
              <strong>&ldquo;Contribution&rdquo;</strong> or{' '}
              <strong>&ldquo;Donation&rdquo;</strong> — any monetary sum
              submitted through the Platform by a Donor.
            </li>
            <li>
              <strong>&ldquo;Escrow Account&rdquo;</strong> — the account(s) in
              which Contributions are held pending release, as described in
              Section 6.
            </li>
            <li>
              <strong>&ldquo;Content&rdquo;</strong> — any text, image, audio,
              video, or other material submitted to the Platform by a User.
            </li>
            <li>
              <strong>&ldquo;Recipient&rdquo;</strong> — the Candidate, Party, or
              Influencer for whom a Contribution is designated.
            </li>
          </ul>

          <h2>3. Eligibility</h2>
          <p>
            3.1 You must be at least 18 years old and legally capable of entering
            a binding contract under the Indian Contract Act, 1872, to register
            an account.
          </p>
          <p>
            3.2 Making a political contribution, registering as a Candidate, or
            forming/administering a Party is restricted to Indian citizens and to
            other persons or entities lawfully permitted to make political
            contributions under Indian law.{' '}
            <strong>
              We do not knowingly accept political contributions from foreign
              nationals, foreign entities, or other prohibited sources under the
              Foreign Contribution (Regulation) Act, 2010, the Representation of
              the People Act, 1951, or the Companies Act, 2013.
            </strong>{' '}
            You represent that your contribution does not originate, directly or
            indirectly, from a prohibited source.
          </p>
          <p>
            3.3 We may require identity verification (KYC) before permitting you
            to donate or register as a Candidate, Influencer, or Party
            administrator, and may refuse or revoke registration at our
            discretion, including where verification fails or information appears
            false.
          </p>
          <p>
            3.4 By using the Platform, you represent that all information you
            provide is accurate and that you will keep it updated.
          </p>

          <h2>4. Account Registration and Verification</h2>
          <p>
            4.1 <strong>Donors</strong> must complete identity and payment
            verification as required by our payment partner(s) and applicable
            law.
          </p>
          <p>
            4.2 <strong>Candidates</strong> must, before their profile becomes
            active, submit the comprehensive disclosures we require, mirroring
            the information required in the Election Commission of India&rsquo;s
            candidate nomination affidavit (Form 26 under the Conduct of Election
            Rules, 1961) — including personal and contact details, educational
            qualifications, criminal antecedents (pending cases and convictions,
            if any), assets and liabilities, PAN details, and prior public office
            held.{' '}
            <strong>
              You are solely responsible for the truthfulness of these
              disclosures.
            </strong>{' '}
            Submitting false information in connection with an actual election
            may expose you to legal consequences independent of the Platform,
            including under the Representation of the People Act, 1951.
          </p>
          <p>
            4.3 <strong>Community validation.</strong> We may let other Users
            flag or corroborate disclosed information (e.g., a Candidate&rsquo;s
            prior legislative record). Community validation is a crowd-sourced
            signal only — it is <strong>not</strong> verification, endorsement,
            or a guarantee of accuracy by Poltu.
          </p>
          <p>
            4.4 <strong>Influencers</strong> must complete identity verification
            and, where applicable, demonstrate their audience/reach before
            activating an Influencer ID.
          </p>
          <p>
            4.5 <strong>Parties</strong> may be formed once the minimum
            participation threshold set within the Platform is met; Party
            administrators are responsible for the Party&rsquo;s profile,
            disclosures, and compliance with Section 3.2.
          </p>

          <h2>5. Platform Neutrality</h2>
          <p>
            We are strictly non-partisan. Every Candidate and Party that
            satisfies our eligibility and verification requirements receives
            equal access to the Platform&rsquo;s tools — including rotation in
            posters/banners, print features, and baseline advertising support —
            regardless of ideology. We do not editorialize, rank, or promote any
            Candidate or Party except through the neutral, disclosed mechanisms
            in these Terms (e.g., the contribution-weighting formula in Section
            6.6).
          </p>

          <h2>6. Donations, Escrow, and Fund Release</h2>
          <p>
            6.1 <strong>Indirect fund management.</strong> Contributions are not
            transferred directly to a Recipient. They are held in a
            Company-designated escrow arrangement (maintained with a scheduled
            commercial bank or an RBI-authorised/regulated payment institution,
            as applicable) pending release under this Section.
          </p>
          <p>
            6.2 <strong>Release process.</strong> To access held funds, a
            Recipient must: (a) publicly state the intended use of the funds; (b)
            obtain the approval of at least 50% of the Donors who contributed to
            the relevant pool (calculated as specified in-app — e.g., by number
            of Donors or by value); (c) after using the funds, upload a bill or
            other verifiable proof of expenditure within the timeframe specified
            in-app; and (d) obtain approval of that proof from at least 50% of
            the relevant Donors before further funds from that pool, or future
            pools, are released.
          </p>
          <p>
            6.3 <strong>Non-transferability.</strong> Contributions may not be
            redirected to a different Recipient, or repurposed for a different
            stated use, without going through the approval process in this
            Section.
          </p>
          <p>
            6.4 <strong>Revenue-sharing tiers.</strong> Unless we notify you of a
            different arrangement for a specific campaign, Contributions are
            split as follows:
          </p>
          <table>
            <thead>
              <tr>
                <th>Recipient type</th>
                <th>Direct / escrow use</th>
                <th>Aligned recipients</th>
                <th>Platform pool</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Newcomer Candidates / new Parties</td>
                <td>80%</td>
                <td>—</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>Established Candidates / established Parties</td>
                <td>50%</td>
                <td>—</td>
                <td>50%</td>
              </tr>
              <tr>
                <td>Ideological Influencers</td>
                <td>50% (own use)</td>
                <td>30% (to aligned Candidates)</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>Neutral commentators</td>
                <td>50%</td>
                <td>—</td>
                <td>50%</td>
              </tr>
            </tbody>
          </table>
          <p>
            We define &ldquo;newcomer&rdquo; and &ldquo;established&rdquo; in-app
            and may revise these ratios prospectively, with notice.
          </p>
          <p>
            6.5 <strong>Use of the platform pool.</strong> The portion retained
            by the Company funds: (a) collective digital advertising for all
            eligible Candidates/Parties on an equitable basis; (b) the print
            media, outdoor advertising, and auditorium infrastructure in Section
            9; (c) a platform service fee, currently contemplated at
            approximately 2–3% of total collections; and (d) general corporate
            overhead. Allocations within the pool may change over time; the
            then-current allocation will be disclosed in-app.
          </p>
          <p>
            6.6 <strong>Contribution-weighting.</strong> The visibility a topic,
            issue, or campaign receives on the Platform is influenced by the
            volume of Contributions it attracts, but deliberately on a{' '}
            <strong>non-linear, diminishing-returns basis</strong>, so a single
            large contributor cannot buy dominant visibility while a broad base
            of small Contributions is amplified. This mechanism may be refined
            over time and is not a guarantee of any particular visibility
            outcome.
          </p>
          <p>
            6.7 <strong>Refunds.</strong> If a Candidate withdraws, is
            disqualified, or a Party dissolves before designated funds are
            released under Section 6.2, we will handle unspent, unapproved
            Contributions as described in-app at the time of contribution (for
            example, refund to Donors or reallocation within the same pool,
            subject to Donor consent).
          </p>
          <p>
            6.8 <strong>No guarantee of tax benefit.</strong> Contributions to
            individual Candidates are generally <strong>not</strong> eligible for
            deduction under the Income Tax Act, 1961. Contributions to a Party
            registered under Section 29A of the Representation of the People Act,
            1951 may qualify for deduction under Sections 80GGB/80GGC, subject to
            the conditions in force at the time (including that the contribution
            is not made in cash) and to that Party&rsquo;s own compliance with
            its disclosure obligations.{' '}
            <strong>Poltu does not provide tax advice</strong> — consult a
            qualified professional and rely only on the receipt issued for your
            specific Contribution.
          </p>
          <p>
            6.9 <strong>Cash and instrument limits.</strong> Contributions are
            subject to the cash-donation limits and instrument requirements
            imposed by law from time to time. We may decline or reverse a
            Contribution that does not comply.
          </p>

          <h2>7. Candidate Obligations and Security Deposit</h2>
          <p>
            7.1 Before we provide subsidized, pre-funding-stage support (such as
            constituency-geofenced advertising), an emerging Candidate must pay a{' '}
            <strong>refundable security deposit of INR 5,000</strong>, intended
            solely to establish good-faith seriousness and deter spam or
            fraudulent registrations. Refund conditions (timing, forfeiture for
            fraudulent or abandoned candidacy) are specified in-app.
          </p>
          <p>
            7.2{' '}
            <strong>
              Candidates are solely responsible for complying with all applicable
              election law
            </strong>
            , including the expenditure ceilings the Election Commission of India
            prescribes under the Conduct of Election Rules, 1961, and for
            maintaining the separate election-expenditure account required under
            Section 77 of the Representation of the People Act, 1951.{' '}
            <strong>
              Advertising, print features, or other promotional support Poltu
              provides on a Candidate&rsquo;s behalf may count toward that
              Candidate&rsquo;s statutory expenditure ceiling.
            </strong>{' '}
            It is the Candidate&rsquo;s responsibility — not Poltu&rsquo;s — to
            value and report Platform-attributable support to their election
            agent. We will provide reasonable documentation of the value of
            support provided, but we do not guarantee it will match any figure
            required by the ECI.
          </p>
          <p>
            7.3 Candidates must not use the Platform to solicit or accept
            contributions from any source prohibited under Section 3.2.
          </p>

          <h2>8. Influencer Program</h2>
          <p>
            8.1 Influencers may pool donations from their audience and direct
            them, per Section 6.4, to Candidates whose stated ideology aligns
            with the Influencer&rsquo;s own.
          </p>
          <p>
            8.2 Influencers must clearly and conspicuously disclose, in any
            content soliciting funds through the Platform: (a) that they are
            fundraising through Poltu, and (b) the Candidate(s) or ideology to
            which pooled funds may be directed. Misleading solicitation,
            undisclosed compensation from a Candidate/Party, or redirecting funds
            without disclosure is prohibited.
          </p>
          <p>
            8.3 We may introduce, modify, or phase in the revenue-sharing
            arrangement in Section 6.4 for Influencers, with notice.
          </p>

          <h2>9. Print Media, Advertising, and Physical Infrastructure</h2>
          <p>
            9.1 Once the Platform reaches a funding threshold we determine, we
            intend to operate free daily newspapers, weekly magazines, rotating
            outdoor posters/banners, and public auditoriums, funded from the
            platform pool in Section 6.5.
          </p>
          <p>
            9.2 Placement, frequency, and rotation of any Candidate or Party
            across these channels follows our neutral, equal-opportunity
            allocation policy, published in-app. We do not guarantee any specific
            placement, frequency, or reach.
          </p>
          <p>
            9.3 We may accept, edit for length/format, or decline reader-submitted
            content (e.g., discourse columns) at our discretion, applying the
            content standards in Section 11.
          </p>

          <h2>10. Community Content, Discussion, and Idea Sponsorship</h2>
          <p>
            10.1 Users may create community issue-tracking pages, comment, and
            submit content for our discourse columns or &ldquo;idea
            sponsorship&rdquo; profiles.
          </p>
          <p>
            10.2 You retain ownership of Content you submit. By submitting
            Content, you grant Poltu a non-exclusive, worldwide, royalty-free
            license to host, display, reproduce (including in print), and
            distribute that Content on and through the Platform for as long as it
            remains posted, or as required for our records/legal retention.
          </p>
          <p>
            10.3 Community &ldquo;adoption&rdquo; of an issue into a
            Candidate&rsquo;s manifesto, or community &ldquo;validation&rdquo; of
            a claim, reflects User activity on the Platform. It is{' '}
            <strong>not</strong> Poltu&rsquo;s endorsement, verification, or
            guarantee.
          </p>

          <h2>11. Acceptable Use</h2>
          <p>You must not use the Platform to:</p>
          <ul>
            <li>
              (a) post or transmit hate speech, incitement to violence, or
              content that is defamatory, obscene, or otherwise unlawful under
              Indian law;
            </li>
            <li>
              (b) impersonate any Candidate, Party, official, or other person;
            </li>
            <li>
              (c) publish knowingly false statements about a Candidate or Party,
              including deceptively altered images, audio, or video;
            </li>
            <li>
              (d) engage in fraud, money laundering, or structuring of
              Contributions to evade donation caps, KYC, or verification
              requirements;
            </li>
            <li>
              (e) solicit or funnel Contributions from a source prohibited under
              Section 3.2;
            </li>
            <li>
              (f) manipulate voting, engagement, or verification in the
              institutional/virtual elections feature in Section 12 (e.g., fake
              identities, bot activity, vote-buying);
            </li>
            <li>
              (g) scrape, reverse-engineer, or interfere with the Platform&rsquo;s
              operation or security; or
            </li>
            <li>
              (h) violate any applicable law, including election law and the
              Model Code of Conduct when in force.
            </li>
          </ul>
          <p>
            We may remove Content, suspend features, or take the actions in
            Section 18 in response to a violation, a valid legal order, or a
            report through our grievance mechanism (Section 17).
          </p>

          <h2>12. Institutional and Virtual Elections</h2>
          <p>
            12.1 We may let eligible organizations (e.g., universities, IITs&rsquo;
            software development clubs) run small-scale elections through the
            Platform, with voting eligibility verified through official government
            or institutional identity credentials.
          </p>
          <p>
            12.2 We provide this feature on an &ldquo;as-is&rdquo; basis to
            support integrity, but do not guarantee against all forms of
            technical failure, and are not the returning authority for any
            institution&rsquo;s election — the conducting institution remains
            responsible for the validity and results of its own election under
            its own rules.
          </p>

          <h2>13. Third-Party Tools and Services</h2>
          <p>
            We may facilitate access to third-party political-technology tools
            (e.g., voter analytics, campaign-consultancy platforms) on a
            subscription basis. These are provided by independent third parties
            under their own terms; we are not responsible for their performance,
            and facilitating access is not an endorsement.
          </p>

          <h2>14. Fees</h2>
          <p>
            Other than the security deposit (Section 7.1) and the platform-pool
            allocation already reflected in the revenue-sharing tiers (Section
            6.4–6.5), we do not charge Donors or Candidates an additional platform
            fee to use core features. Payment-processing charges levied by our
            payment partner(s) may apply separately and will be disclosed before
            you contribute.
          </p>

          <h2>15. Intellectual Property</h2>
          <p>
            15.1 The Platform, including its software, design, the
            &ldquo;Poltu&rdquo; name and marks, and our contribution-weighting and
            matching methodology, is owned by the Company or its licensors and is
            protected by applicable intellectual property law. Nothing in these
            Terms transfers any of that IP to you.
          </p>
          <p>
            15.2 See Section 10.2 for the license you grant us in Content you
            submit.
          </p>

          <h2>16. Disclaimers</h2>
          <p>
            16.1 The Platform is provided &ldquo;as is&rdquo; and &ldquo;as
            available.&rdquo; We do not guarantee any election outcome,
            fundraising target, candidate quality, or influencer reach.
          </p>
          <p>
            16.2 We are a technology intermediary, not a law firm, chartered
            accountant, or tax advisor. Nothing on the Platform is legal,
            financial, or tax advice.
          </p>
          <p>
            16.3 We do our best to keep disclosed candidate and Party information
            accurate and current, but we do not independently verify every
            disclosure and are not liable for inaccuracies in User-submitted
            Content.
          </p>

          <h2>17. Grievance Redressal</h2>
          <p>
            In accordance with the Information Technology Act, 2000 and the
            Information Technology (Intermediary Guidelines and Digital Media
            Ethics Code) Rules, 2021, as amended, we have appointed a Grievance
            Officer:
          </p>
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
            We will acknowledge complaints within 24 hours and work to resolve
            them within the statutory timeline. If our user base crosses the
            threshold for a &ldquo;significant social media intermediary,&rdquo;
            we will additionally appoint a Chief Compliance Officer, a Nodal
            Contact Person, and a Resident Grievance Officer, and publish a
            periodic compliance report, as required.
          </p>

          <h2>18. Suspension and Termination</h2>
          <p>
            We may suspend or terminate your account, with or without notice, for
            violation of these Terms, suspected fraud, a legal requirement, or to
            protect the integrity of the Platform. You may close your account at
            any time; certain records (e.g., donation and disclosure records) may
            be retained as described in our Privacy Policy for legal and audit
            purposes.
          </p>

          <h2>19. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, the Company will not be liable
            for indirect, incidental, special, or consequential damages arising
            from your use of the Platform, or for any election result, campaign
            outcome, or third-party conduct. Nothing in these Terms limits
            liability that cannot be excluded under Indian law.
          </p>

          <h2>20. Indemnification</h2>
          <p>
            You agree to indemnify and hold the Company harmless from claims
            arising out of your breach of these Terms, your Content, your election
            disclosures, or your violation of applicable law, including election
            law.
          </p>

          <h2>21. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms are governed by the laws of India. Any dispute will first
            be referred to good-faith negotiation, failing which it will be
            resolved by arbitration under the Arbitration and Conciliation Act,
            1996, seated in [City], India, in English — except that either party
            may seek urgent injunctive relief from the competent courts at [City],
            India.
          </p>

          <h2>22. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. We will post the updated
            Terms with a new &ldquo;Last Updated&rdquo; date and, for material
            changes, provide additional notice (e.g., in-app or by email) before
            the changes take effect.
          </p>

          <h2>23. General</h2>
          <p>
            If any provision of these Terms is found unenforceable, the remaining
            provisions continue in effect. These Terms, together with our Privacy
            Policy, are the entire agreement between you and the Company regarding
            the Platform. We are not liable for delay or failure caused by events
            beyond our reasonable control (force majeure).
          </p>

          <h2>24. Contact</h2>
          <p>
            [Legal Entity Name]
            <br />
            [Registered Office Address]
            <br />
            <a href="mailto:support.poltu@gmail.com">
              support.poltu@gmail.com
            </a>{' '}
            | [Phone]
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
