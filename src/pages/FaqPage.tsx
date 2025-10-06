import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Layout from "../Layout";

const faqList = [
  {
    code: "What is your return policy for coffee products?",
    desc: "Our return policy allows returns within 30 days of purchase for unopened coffee products in their original condition.",
  },
  {
    code: "How can I track my coffee order?",
    desc: "You can track your coffee order using the tracking number provided in your order confirmation email.",
  },
  {
    code: "Do you offer international shipping for coffee?",
    desc: "Yes, we offer international shipping for our coffee products to numerous countries. Check our shipping policy for more details.",
  },
  {
    code: "What payment methods do you accept for coffee?",
    desc: "We accept various payment methods including credit/debit cards, PayPal, and bank transfers for coffee purchases.",
  },
  {
    code: "Can I change or cancel my coffee order?",
    desc: "You can change or cancel your coffee order within 24 hours of placing it. After that, the order processing begins, and changes may not be possible.",
  },
  {
    code: "What is your warranty policy on coffee equipment?",
    desc: "We offer a one-year warranty on all our coffee equipment. The warranty covers manufacturing defects and excludes any damage caused by misuse.",
  },
  {
    code: "How can I contact customer service for coffee inquiries?",
    desc: "You can reach our customer service team via email at coffee_support@example.com or by calling (+081) 5678 1234.",
  },
  {
    code: "Are there any discounts available on coffee products?",
    desc: "Yes, we offer seasonal discounts and promotions on our coffee products. Subscribe to our newsletter to stay updated on the latest offers.",
  },
  {
    code: "How do I subscribe to your newsletter for coffee updates?",
    desc: "You can subscribe to our coffee updates by entering your email address in the subscription box at the bottom of our website.",
  },
  {
    code: "What is your privacy policy regarding customer data?",
    desc: "Our privacy policy details how we collect, use, and protect your personal information. Please review it to understand our practices.",
  },
];

const FaqPage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "light.main",
          padding: 4,
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            maxWidth: 800,
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            FAQ
          </Typography>

          {faqList.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                backgroundColor: "secondary.main",
                mb: 2,
                // borderRadius: "20px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography variant="h6">{faq.code}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" textAlign="left">
                  {faq.desc}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default FaqPage;
