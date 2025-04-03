import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

function FullAccordion() {
  return (
    <Accordion type="multiple" collapsible="true">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it free?</AccordionTrigger>
        <AccordionContent>
          Yes you can create as many shortned URLs as you want
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I edit my URLs</AccordionTrigger>
        <AccordionContent>
          Yes you can edit your redirect path we got you covered 😀
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          You give us the URL you wanna shorten and then we'll generate a custom
          short link for your long URL
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Do I need an account to use this?</AccordionTrigger>
        <AccordionContent>
          Yes , since we need to store your custom URL for your future access
          and analytics
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What analytics do you provide</AccordionTrigger>
        <AccordionContent>
          We offer a number of services for link analytics like number of clicks
          , geoloaction , device 🤠
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default FullAccordion;
