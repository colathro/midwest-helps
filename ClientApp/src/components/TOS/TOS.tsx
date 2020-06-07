import React from "react";
import { Form, Modal, Button, Row, Col, Typography } from "antd";
import { TextField } from "../FormFields/TextField";
import { FolksLinker } from "../Folks/components/FolksLinker";
import "./TOS.scss";
import { NavBar } from "../NavBar";

const { Title } = Typography;

export const TOS: React.FC = () => {
  return (
    <NavBar>
      <Title>Terms and conditions</Title>
      <p>This Agreement was last revised on May 29th, 2020.</p>
      <b>Introduction</b>
      <p>
        www.midwesthelps.com (“we,” “us,” or “our”) welcomes you. We offer you
        access to our services through our “Website” (defined below) subject to
        the following terms, which may be updated by us from time to time with
        or without notice to you.
      </p>
      <p>
        By accessing and using this Website, you acknowledge that you have read,
        understood and agree to be lawfully bound by these terms and conditions
        and our Privacy Policy, which are hereby incorporated by reference
        (collectively, this “Agreement”). In case you do not agree with any of
        these terms, then please do not use the Website.
      </p>
      <b>Definitions</b>
      <ul>
        <li>
          “Agreement” denotes to the terms of this agreement and the Privacy
          Policy and other documents provided to you by the Website;
        </li>
        <li>
          “User”, “You” and “your” denotes the person who is accessing for
          taking any service or buying any product from us;
        </li>
        <li>
          “Donor” refer to any user who makes donation to the Organization
          listed on the website;
        </li>
        <li>
          “Organization” refer to any user who makes registration on the website
          for accepting donation from donors.
        </li>
        <li>
          “We”, “us”, “our” and “Company” are references to Midwest Helps;
        </li>
        <li>
          ”Website” shall mean and include "https://midwesthelps.com, and any
          successor Website of the Company or any of its affiliates;
        </li>
        <li>
          "User Account” shall mean an electronic account opened for the user
          for making a donation on the website;
        </li>
        <li>
          Eligibility: the Product and Service of the Website is not available
          to minors under the age of 13 or to any users suspended or removed
          from the system by us for any reason.
        </li>
        <li>
          Electronic Communication: When you use this Website or send e-mails
          and other electronic communications from your desktop or mobile device
          to us, you are communicating with us electronically. By sending, you
          agree to receive a reply communications from us electronically in the
          same format and you can keep copies of these communications for your
          records.
        </li>
      </ul>
      <p>
        <b>Modifications to the website</b>
        <p>
          We reserve the right, in our discretion, to change, modify, add to, or
          remove portions of the Terms (collectively, “Changes”), at any time.
          We may notify you of changes by sending an email to the address
          identified in your Account or by posting a revised version of the
          Terms incorporating the changes to its Website.
        </p>
      </p>
      <b>User content</b>
      <p>
        The website permits you to share content, post comments, feedback etc.
        but you are solely responsible for the content posted by you. You
        represent that you have required permission to use the content.
      </p>
      <p>
        When posting content to the website, please do not post content that:
      </p>
      <ul>
        <li>
          contains ill-mannered, profane, abusive, racist or hateful language or
          expressions, text, photographs or illustrations that are pornographic
          or in poor taste, inflammatory attacks of a personal, racial or
          religious nature;
        </li>
        <li>
          is defamatory, threatening, disparaging, grossly inflammatory, false,
          misleading, fraudulent, inaccurate, unfair, contains gross
          exaggeration or unsubstantiated claims;
        </li>
        <li>
          violates the privacy rights of any third party, is unreasonably
          harmful or offensive to any individual or community;
        </li>
        <li>
          discriminates on the grounds of race, religion, national origin,
          gender, age, marital status, sexual orientation or disability, or
          refers to such matters in any manner prohibited by law;
        </li>
        <li>
          violates or inappropriately encourages the violation of any municipal,
          state, federal or international law, rule, regulation or ordinance;
        </li>
        <li>
          uses or attempts to use another's account, password, service or system
          except as expressly permitted by the Terms of use uploads or transmits
          viruses or other harmful, disruptive or destructive files;
        </li>
        <li>
          sends repeated messages related to another user and/or makes
          derogatory or offensive comments about another individual or repeats
          prior posting of the same message under multiple emails or subjects.
        </li>
      </ul>
      <p>
        Any submitted content will be refused by us. If repeated violations
        occur, we reserve the right to cancel user access to the website without
        advanced notice.
      </p>
      <p>
        <b>Geographic Restriction</b>
        <p>
          We reserve the right, but not the obligation, to limit the usage or
          supply of any service to any person, geographic region or
          jurisdiction. We may use this right as per the necessity. We reserve
          the right to suspend any Service at any time. Any offer to provide any
          Service made on this Website is invalid where banned.
        </p>
      </p>
      <p>
        <b>YOUR RESPONSIBILITIES</b>
        <p>
          <ul>
            <li>
              You shall use our service and website for a lawful purpose and
              comply with all the applicable laws while using the Website;
            </li>
            <li>
              You shall not use or access the Website for collecting any market
              research for some competing business;
            </li>
            <li>
              You shall not misrepresent or personate any person or entity for
              any false or illegal purpose;
            </li>
            <li>
              You shall not use any virus, hacking tool for interfering in the
              operation of the Website or data and files of the Website;
            </li>
            <li>
              You will not use any device, scraper or any automated thing to
              access the Website for any means without taking permission.
            </li>
            <li>
              You will inform us about anything is inappropriate or you can
              inform us if you find something illegal;
            </li>
            <li>
              You will not interfere with or try to interrupt the proper
              operation of the Website through the use of any virus, device,
              information collection or transmission mechanism, software or
              routine, or access or try to gain access to any data, files, or
              passwords connected to the Website through hacking, password or
              data mining, or any other means;
            </li>
            <li>
              You will not cover, obscure, block, or in any way interfere with
              any advertisements and/or safety features (e.g., report abuse
              button) on the Website;
            </li>
            <li>
              You will not take any action that levies or may levy (in our sole
              decision) an unreasonable or unreasonably big load on our
              technical arrangement; and
            </li>
            <li>
              You will let us know about unsuitable content of which you become
              aware. If you discover something that infringes any law, please
              let us know, and we’ll review it.
            </li>
          </ul>
        </p>
        <p>
          We reserve the right, in our sole and absolute discretion, to deny you
          access to the Website or any service, or any portion of the Website or
          service, without notice, and to remove any content.
        </p>
      </p>
      <p>
        <b>General conditions</b>
        <p>
          <ul>
            <li>
              We do not guarantee the accuracy, completeness, validity, or
              timeliness of information listed by us.
            </li>
            <li>
              We make material changes to these terms and conditions from time
              to time, we may notify you either by prominently posting a notice
              of such changes or via email communication.
            </li>
          </ul>
        </p>
      </p>
      <p>
        <b>Exclusion of liability</b>

        <p>
          You understand and agree that we (a) do not guarantee the accuracy,
          completeness, validity, or timeliness of information listed by us or
          any third parties; and (b) shall not be responsible for any materials
          posted by us or any third party. You shall use your own judgment,
          caution, and common sense in evaluating any prospective methods or
          offers and any information provided by us or any third party.
        </p>
        <p>
          Further, we shall not be liable for direct, indirect consequential or
          any other form of loss or damage that may be suffered by a user
          through the use of the www.midwesthelps.com Website including loss of
          data or information or any kind of financial or physical loss or
          damage.
        </p>
        <p>
          In no event shall Midwest Helps, nor its owners, directors, employees,
          partners, agents, suppliers, or affiliates, be accountable for any
          indirect, incidental, special, eventful or exemplary costs, including
          without limitation, loss of proceeds, figures, usage, goodwill, or
          other intangible losses, consequential from (i) your use or access of
          or failure to access or use the Service; (ii) any conduct or content
          of any third party on the Service; (iii) any content attained from the
          Service; and (iv) unlawful access, use or alteration of your
          transmissions or content, whether or not based on guarantee,
          agreement, domestic wrong (including carelessness) or any other lawful
          concept, whether or not we've been aware of the possibility of such
          damage, and even if a cure set forth herein is originated to have
          futile of its important purpose.
        </p>
      </p>
      <p>
        <b>Third party links</b>
        <p>
          The Website may comprise links to external or third-party Websites
          (“External Sites”). These links are provided exclusively as ease to
          you and not as an authorization by us of the content on such External
          Sites. The content of such External Sites is created and used by
          others. You can communicate the site administrator for those External
          Sites. We are not accountable for the content provided in the link of
          any External Sites and do not provide any representations about the
          content or correctness of the information on such External Sites. You
          should take safety measures when you are downloading files from all
          these Websites to safeguards your computer from viruses and other
          critical programs. If you agree to access linked External Sites, you
          do so at your own risk.
        </p>
      </p>
      <p>
        <b>Personal information and privacy policy</b>
        <p>
          By accessing or using this Website, you approve us to use, store or
          otherwise process your personal information as per our Privacy Policy.
        </p>
      </p>
      <p>
        <b>Errors, inaccuracies, and omissions</b>
        <p>
          Every effort has been taken to ensure that the information offered on
          this Website is accurate and error-free. We apologize for any errors
          or omissions that may have occurred. We cannot give you any warranty
          that usage of the Website will be error-free or fit for purpose,
          timely, that defects will be amended, or that the site or the server
          that makes it available are free of viruses or bugs or signifies the
          full functionality, accuracy, reliability of the Website and we do not
          make any warranty whatsoever, whether express or implied, relating to
          fitness for purpose, or accuracy.
        </p>
      </p>
      <p>
        <b>DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</b>
        <p>
          THE WEBSITE AND THE SERVICE ARE PROVIDED ON AN “AS IS” AND “AS
          AVAILABLE” BASIS WITHOUT ANY WARRANTIES OF ANY KIND, INCLUDING THAT
          THE WEBSITE WILL OPERATE ERROR-FREE OR THAT THE WEBSITE, ITS SERVERS
          OR ITS CONTENT OR SERVICE ARE FREE OF COMPUTER VIRUSES OR SIMILAR
          CONTAMINATION OR DESTRUCTIVE FEATURES.
        </p>

        <p>
          WE DISCLAIM ALL LICENSES OR WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
          LICENSES OR WARRANTIES OF TITLE, MERCHANTABILITY, NON-VIOLATION OF
          THIRD PARTIES’ RIGHTS, AND FITNESS FOR PARTICULAR PURPOSE AND ANY
          WARRANTIES ARISING FROM A MATTER OF DEALING, COURSE OF PERFORMANCE, OR
          USAGE OF TRADE. IN RELATION WITH ANY WARRANTY, CONTRACT, OR COMMON LAW
          TORT CLAIMS: (I) WE SHALL NOT BE LIABLE FOR ANY UNINTENDED,
          INCIDENTAL, OR SUBSTANTIAL DAMAGES, LOST PROFITS, OR DAMAGES RESULTING
          FROM LOST DATA OR BUSINESS STOPPAGE RESULTING FROM THE USE OR
          INABILITY TO ACCESS AND USE THE WEBSITE OR THE CONTENT, EVEN IF WE
          HAVE BEEN RECOMMENDED OF THE POSSIBILITY OF SUCH DAMAGES. THE WEBSITE
          MAY COMPRISE TECHNICAL INCORRECTNESS OR TYPOGRAPHICAL ERRORS OR
          OMISSIONS. UNLESS REQUIRED BY APPLICABLE LAWS, WE ARE NOT ACCOUNTABLE
          FOR ANY SUCH TYPOGRAPHICAL, TECHNICAL, OR PRICING ERRORS RECORDED ON
          THE WEBSITE. THE WEBSITE MAY CONTAIN INFORMATION ON CERTAIN SERVICES,
          NOT ALL OF WHICH ARE AVAILABLE IN EVERY LOCATION. A REFERENCE TO A
          SERVICE ON THE WEBSITES DOES NOT SUGGEST THAT SUCH SERVICE IS OR WILL
          BE ACCESSIBLE IN YOUR LOCATION. WE RESERVE THE RIGHT TO DO CHANGES,
          CORRECTIONS, AND/OR IMPROVEMENTS TO THE WEBSITE AT ANY TIME WITHOUT
          NOTICE.
        </p>
      </p>
      <p>
        <b>Copyright and trademark</b>
        <p>
          The Website contains material, such as software, text, graphics,
          images, designs, sound recordings, audiovisual works, and other the
          material provided by or on behalf of us (collectively referred to as
          the “Content”). The Content may be possessed by us or third parties.
          Unauthorized use of the Content may infringe copyright, trademark, and
          other laws. You have no rights in or to the Content, and you will not
          take the Content except as allowed under this Agreement. No other use
          is allowed without prior written consent from us. You must recollect
          all copyright and other proprietary notices contained in the original
          Content on any copy you make of the Content. You may not transfer,
          provide license or sub-license, sell, or modify the Content or
          reproduce, display, publicly perform, make a derivative version of,
          distribute, or otherwise use the Content in any way for any public or
          commercial purpose. The use or posting of the Content on any other
          Website or in a networked computer environment for any purpose is
          expressly prohibited.
        </p>
        <p>
          If you infringe any part of this Agreement, your permission to access
          and/or use the Content and the Website automatically terminates and
          you must immediately destroy any copies you have made of the Content.
        </p>
        <p>
          Our trademarks, service marks, and logos used and displayed on the
          Website are registered and unregistered trademarks or service marks of
          us. Other company, product, and service names located on the Website
          may be trademarks or service marks owned by others (the “Third-Party
          Trademarks,” and, collectively with us, the “Trademarks”). Nothing on
          the Website should be construed as granting, by implication, estoppel,
          or otherwise, any license or right to use the Trademarks, without our
          prior written permission specific for each such use. None of the
          Content may be retransmitted without our express, written consent for
          each and every instance.
        </p>
      </p>
      <p>
        <b>Indemnification</b>
        <p>
          You agree to defend, indemnify, and hold us and our officers,
          directors, employees, successors, licensees, and assigns harmless from
          and against any claims, actions, or demands, including, without
          limitation, reasonable legal and accounting fees, arising or resulting
          from your breach of this Agreement or your misuse of the Content or
          the Website. We shall provide notice to you of any such claim, suit,
          or proceeding and shall assist you, at your expense, in defending any
          such claim, suit, or proceeding. We reserve the right, at your
          expense, to assume the exclusive defense and control of any matter
          that is subject to indemnification under this section. In such case,
          you agree to cooperate with any reasonable requests assisting our
          defense of such matter.
        </p>
      </p>
      <p>
        <b>Severability</b>
        <p>
          If any provision of these Terms is found to be unenforceable or
          invalid, that provision will be limited or eliminated to the minimum
          extent necessary so that the Terms will otherwise remain in full force
          and effect and enforceable.
        </p>
        <b>Termination</b>
        <p>
          The Services will be provided to you can be cancelled or terminated by
          us. We may terminate these Services at any time, with or without
          cause, upon written notice. We will have no liability to you or any
          third party because of such termination. Termination of these Terms
          will terminate all of your Services subscriptions. Effect of
          Termination. Upon termination of these Terms for any reason, or
          cancellation or expiration of your Services: (a) We will cease
          providing the Services; (b) you will not be entitled to any refunds or
          usage fees, or any other fees, pro-rata or otherwise; (c) any fees you
          owe to us will immediately become due and payable in full, and (d) we
          may delete your archived data within 30 days. All sections of the
          Terms that expressly provide for survival, or by their nature should
          survive, will survive termination of the Terms, including, without
          limitation, indemnification, warranty disclaimers, and limitations of
          liability.
        </p>
        <b>Entire Agreement</b>
        <p>
          This Agreement constitutes the entire agreement between the parties
          hereto with respect to the subject matter contained in this Agreement.
        </p>
        <b>Governs law and judicial recourse</b>
        <p>
          The terms herein will be governed by and construed in accordance with
          the Law of the United States of America and the State of North Dakota
          without giving effect to any principles of conflicts of law. The
          Courts of the State of North Dakota shall have exclusive jurisdiction
          over any dispute arising from the use of the Website.
        </p>
        <b>Force Majeure</b>
        <p>
          We will have no liability to you, your users, or any third party for
          any failure us to perform its obligations under these Terms in the
          event that such non-performance arises as a result of the occurrence
          of an event beyond the reasonable control of us, including, without
          limitation, an act of war or terrorism, natural disaster, failure of
          electricity supply, riot, civil disorder, or civil commotion or other
          force majeure event.
        </p>
        <b>Assignment</b>
        <p>
          The Company shall have the right to assign/transfer this agreement to
          any third party including its holding company, subsidiaries,
          affiliates, associates and group companies, without any consent of the
          User.
        </p>
        <b>Contact Information</b>
        <p>
          If you have any questions about these Terms, please contact us at
          support@midwesthelps.com.
        </p>
      </p>

      <FolksLinker />
    </NavBar>
  );
};
