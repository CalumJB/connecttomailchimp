import React from 'react';
import {
  Box,
  Button,
  Inline,
  Icon
} from "@stripe/ui-extension-sdk/ui";

interface MailchimpConnectionProps {
  getAuthUrl: () => string;
}

export const MailchimpConnection: React.FC<MailchimpConnectionProps> = ({
  getAuthUrl
}) => {

  return (
    <Box css={{ stack: "y", rowGap: "medium" }}>
      <Inline css={{font: 'heading', color: 'primary', fontWeight: 'semibold'}}>
        Welcome
      </Inline>
      <Inline>
        Connect your Mailchimp account and we&apos;ll start syncing your Stripe customers automatically.
      </Inline>

      <Button
        href={getAuthUrl()}
        type="primary"
        css={{
          width: "fill",
        }}
      >
        Connect to Mailchimp
        <Icon name="external"/>
      </Button>
    </Box>
  );
};