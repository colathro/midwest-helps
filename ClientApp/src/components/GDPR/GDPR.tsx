import React from "react";
import { Form, Modal, Button, Row, Col, Typography } from "antd";
import { TextField } from "../FormFields/TextField";
import { FolksLinker } from "../Folks/components/FolksLinker";
import "./GDPR.scss";
import { NavBar } from "../NavBar";

const { Title } = Typography;

export const GDPR: React.FC = () => {
  return (
    <NavBar>
      <Title>Privacy Policy</Title>
      <p>Last updated [May 29th, 2020]</p>
      <p>
        Our Privacy Policy forms part of and must be read in conjunction with,
        website Terms and Conditions. We reserve the right to change this
        Privacy Policy at any time.
      </p>
      <p>
        We respect the privacy of our users and every person who visits our
        sites www.midwesthelps.com. Here at, Midwest Helps (“we”, “us”, or
        “our”), we are committed to protecting your personal information and
        your right to privacy in accordance with General Data Protection
        Regulation (GDPR). If you have any questions or concerns about our
        policy or our practices with regards to your personal information,
        please contact us at info@midwesthelps.com.
      </p>
      <p>
        When you visit our website www.midwesthelps.com (“Site”, and use our
        services, you trust us with your personal information. We take your
        privacy very seriously. In this privacy notice, we describe our privacy
        policy. We seek to explain to you in the clearest way possible what
        information we collect, how we use it and what rights you have in
        relation to it. We hope you take some time to read through it carefully,
        as it is important. If there are any terms in this privacy policy that
        you do not agree with, please discontinue the use of our site and our
        services.
      </p>
      <p>
        This privacy policy applies to all information collected through our
        website, and/or any related services, sales, marketing or events (we
        refer to them collectively in this privacy policy as the “Site“).
      </p>
      <Title level={3}>About Us</Title>
      <p>
        Midwest Helps is focused on providing a bulletin board for businesses
        and organizations to get connected to awesome makers.
      </p>
      <p>
        <b>
          Please read this privacy policy carefully as it will help you make
          informed decisions about sharing your personal information with us.
        </b>
      </p>
      <ol>
        <li>
          <b>What information do we collect?</b>
          <p>
            We collect personal information that you voluntarily provide to us
            when expressing an interest in obtaining information about us or our
            products and services when participating in activities on the Site
            or otherwise contacting us.
          </p>
          <p>
            The personal information that we collect depends on the context of
            your interactions with us and the Site, the choices you make and the
            products and features you use. The personal information we collect
            can include the following:
          </p>
          <p>
            <b>Name and Contact Data.</b> We collect your first and last name,
            email address, postal address, phone number, and other similar
            contact data.
          </p>
          <p>
            <b>Credentials.</b> We collect passwords, password hints, and
            similar security information used for authentication and account
            access.
          </p>
          <p>
            <b>Information automatically collected</b>
          </p>
          <p>
            We automatically collect certain information when you visit, use or
            navigate the Site. This information does not reveal your specific
            identity (like your name or contact information) but may include
            device and usage information, such as your IP address, browser and
            device characteristics, operating system, language preferences,
            referring URLs, device name, country, location, information about
            how and when you use our Site and other technical information. If
            you access our site with your mobile device, we may automatically
            collect device information (such as your mobile device ID, model and
            manufacturer), operating system, version information and IP address.
            This information is primarily needed to maintain the security and
            operation of our Site, and for our internal analytics and reporting
            purposes.
          </p>
          <p>
            Like many businesses, we also collect information through cookies
            and similar technologies. You can find out more about this in our
            Cookie Policy.
          </p>
          <b>Information collected from other Sources</b>
          <p>
            We may obtain information about you from other sources, such as
            public databases, joint marketing partners, social media platforms
            (such as Facebook), as well as from other third parties.
          </p>
        </li>

        <li>
          <b>How do we use your information?</b>
          <p>
            We use your personal information for these purposes in reliance on
            our legitimate business interests (“Business Purposes”), in order to
            enter into or perform a contract with you (“Contractual”), with your
            consent (“Consent”), and/or for compliance with our legal
            obligations (“Legal Reasons”). We indicate the specific processing
            grounds we rely on next to each purpose listed below.
          </p>
          <p>
            We use the information we collect or receive:
            <ul>
              <li>
                To send you marketing and promotional communications for
                Business Purposes and/or with your Consent. We and/or our third
                party marketing partners may use the personal information you
                send to us for our marketing purposes, if this is in accordance
                with your marketing preferences. You can opt-out of our
                marketing emails at any time (see below).
              </li>
              <li>
                To send administrative information to you for related to your
                account, our business purposes, and/or for legal reasons. We may
                use your personal information to send you product, service and
                new feature information and/or information about changes to our
                terms, conditions, and policies.
              </li>
              <li>
                Deliver targeted advertising to you for our Business Purposes
                and/or with your Consent. We may use your information to develop
                and display content and advertising (and work with third parties
                who do so) tailored to your interests and/or location and to
                measure its effectiveness. [For more information, see our Cookie
                Policy.
              </li>
              <li>
                Request Feedback for our Business Purposes and/or with your
                Consent. We may use your information to request feedback and to
                contact you about your use of our Site.
              </li>
              <li>
                To protect our Site for Business Purposes and/or Legal Reasons.
                We may use your information as part of our efforts to keep our
                Site safe and secure (for example, for fraud monitoring and
                prevention).
              </li>
              <li>
                To enable user-to-user communications with your consent. We may
                use your information in order to enable user-to-user
                communications with each user’s consent.
              </li>
              <li>
                To enforce our terms, conditions and policies for our business
                purposes and as legally required.
              </li>
              <li>
                To respond to legal requests and prevent harm as legally
                required. If we receive a subpoena or other legal request, we
                may need to inspect the data we hold to determine how to
                respond.
              </li>
              <li>
                For other Business Purposes. We may use your information for
                other Business Purposes, such as data analysis, identifying
                usage trends, determining the effectiveness of our promotional
                campaigns and to evaluate and improve our Site, products,
                services, marketing and your experience.
              </li>
            </ul>
          </p>
        </li>
        <li>
          <b>Will your information be shared with anyone?</b>
          <p>
            We only share and disclose your information in the following
            situations:
          </p>
          <p>
            <ul>
              <li>
                Compliance with Laws. We may disclose your information where we
                are legally required to do so in order to comply with applicable
                law, governmental requests, a judicial proceeding, court order,
                or legal process, such as in response to a court order or a
                subpoena (including in response to public authorities to meet
                national security or law enforcement requirements).
              </li>
              <li>
                Vital Interests and Legal Rights. We may disclose your
                information where we believe it is necessary to investigate,
                prevent, or take action regarding potential violations of our
                policies, suspected fraud, situations involving potential
                threats to the safety of any person and illegal activities, or
                as evidence in litigation in which we are involved.
              </li>
              <li>
                Vendors, Consultants and Other Third-Party Service Providers. We
                may share your data with third party vendors, service providers,
                contractors or agents who perform services for us or on our
                behalf and require access to such information to do that work.
              </li>
              <li>
                Business Transfers. We may share or transfer your information in
                connection with, or during negotiations of, any merger, sale of
                company assets, financing, or acquisition of all or a portion of
                our business to another company.
              </li>
              <li>
                Third-Party Advertisers. We may use third-party advertising
                companies to serve ads when you visit the Site. These companies
                may use information about your visits to our Site and other
                websites that are contained in web cookies and other tracking
                technologies in order to provide advertisements about goods and
                services of interest to you. See our Cookie Policy for further
                information.
              </li>
              <li>
                Affiliates. We may share your information with our affiliates,
                in which case we will require those affiliates to honor this
                privacy policy. Affiliates include our parent company and any
                subsidiaries, joint venture partners or other companies that we
                control or that are under common control with us.
              </li>
              <li>
                Business Partners. We may share your information with our
                business partners to offer you certain products, services or
                promotions.
              </li>
              <li>
                With your Consent. We may disclose your personal information for
                any other purpose with your consent.
              </li>
              <li>
                Other Users. When you share personal information (for example,
                by posting comments, contributions or other content to the Site)
                or otherwise interact with public areas of the Site, such
                personal information may be viewed by all users and may be
                publicly distributed outside the Site in perpetuity.
              </li>
            </ul>
          </p>
        </li>
        <li>
          <b>Do we use cookies and other tracking technologies?</b>
          <p>
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information. Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Policy.
          </p>
        </li>
        <li>
          <b>Is your information transfered internationally?</b>
          <p>
            Our website server is located at https://midwesthelps.com. We will
            not transfer your personal information to an overseas recipient.
          </p>
        </li>
        <li>
          <b>What is our stance on 3rd-party websites?</b>
          <p>
            The Site may contain advertisements from third parties that are not
            affiliated with us and which may link to other websites, online
            services or mobile applications. We cannot guarantee the safety and
            privacy of data you provide to any third parties. Any data collected
            by third parties is not covered by this privacy policy. We are not
            responsible for the content or privacy and security practices and
            policies of any third parties, including other websites, services or
            applications that may be linked to or from the Site. You should
            review the policies of such third parties and contact them directly
            to respond to your questions.
          </p>
        </li>
        <li>
          <b>How long do we keep your information?</b>
          <p>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy policy, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting or other legal requirements). No purpose in this
            policy will require us keeping your personal information for longer
            than 90 days past the termination of your account.
          </p>
          <p>
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymize it, or, if
            this is not possible (for example, because your personal information
            has been stored in backup archives), then we will securely store
            your personal information and isolate it from any further processing
            until deletion is possible.
          </p>
        </li>
        <li>
          <b>How do we keep your information safe?</b>
          <p>
            We have implemented appropriate technical and organizational
            security measures designed to protect the security of any personal
            information we process. However, please also remember that we cannot
            guarantee that the internet itself is 100% secure. Although we will
            do our best to protect your personal information, transmission of
            personal information to and from our Site is at your own risk. You
            should only access the services within a secure environment.
          </p>
        </li>
        <li>
          <b>Do we collect information from minors?</b>
          <p>
            We do not knowingly solicit data from or market to children under 16
            years of age. By using the Site, you represent that you are at least
            16 or that you are the parent or guardian of such a minor and
            consent to such minor dependent’s use of the Site. If we learn that
            personal information from users less than 16 years of age has been
            collected, we will deactivate the account and take reasonable
            measures to promptly delete such data from our records. If you
            become aware of any data we have collected from children under age
            16, please contact us at support@midwesthelps.com.
          </p>
        </li>
        <li>
          <b>GDPR Entitlement</b>
          <p>
            EU General Data Protection Regulation (GDPR) has provided the below
            rights to the EU residents:
          </p>
          <p>
            <ul>
              <li>
                Right to information - the purposes for processing Personal
                Information and the rights of the individual.
              </li>
              <li>
                Right to access the Personal Information that are processed.
              </li>
              <li>Right to erasure (”Right to be forgotten”).</li>
              <li>Right to rectification.</li>
              <li>Right to restriction of processing.</li>
              <li>Right to object (opt-out) to processing.</li>
            </ul>
          </p>
          <p>
            EU residents can exercise these rights by raising a request directly
            at info@midwesthelps.com.
          </p>
        </li>
        <li>
          <div>
            <b>What are your privacy rights?</b>
          </div>
          <b>Personal Information:</b>
          <p>
            You may at any time review or change the information in your account
            or terminate your account by:
          </p>
          <p>
            <ul>
              <li>
                Logging into your account settings and updating your account
              </li>
              <li>
                Contacting us using the contact information provided below
              </li>
            </ul>
          </p>
          <p>
            Upon your request to terminate your account, we will deactivate or
            delete your account and information from our active databases.
            However, some information may be retained in our files to prevent
            fraud, troubleshoot problems, assist with any investigations,
            enforce our Terms of Use and/or comply with legal requirements.
          </p>
          <p>
            <b>Cookies and similar technologies:</b> Most Web browsers are set
            to accept cookies by default. If you prefer, you can usually choose
            to set your browser to remove cookies and to reject cookies. If you
            choose to remove cookies or reject cookies, this could affect
            certain features or services of our Site.
          </p>
        </li>
        <li>
          <b>Do we make updates to this policy?</b>
          <p>
            We may update this privacy policy from time to time. The updated
            version will be indicated by an updated “Revised” date and the
            updated version will be effective as soon as it is accessible. If we
            make material changes to this privacy policy, we may notify you
            either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy policy frequently to be informed of how we are protecting
            your information.
          </p>
        </li>
        <li>
          <b>Data protection officer</b>
          <p>
            We have appointed a Data Protection Officer (“DPO”) who is
            responsible for overseeing questions in relation to this privacy
            notice. If you have any questions about this privacy notice,
            including any requests to exercise your legal rights, please contact
            Data Protection Officer, at our e-mail support@midwesthelps.com.
          </p>
        </li>
        <li>
          <b>How can you contact us about this privacy policy?</b>
          <p>
            If you have questions or comments about this policy, email us at
            info@midwesthelps.com.{" "}
          </p>
        </li>
      </ol>
      <FolksLinker />
    </NavBar>
  );
};
