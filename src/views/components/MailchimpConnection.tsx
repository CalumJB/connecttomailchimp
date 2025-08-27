import React, { useState } from 'react';
import {
  Box,
  Button,
  Inline,
  Icon
} from "@stripe/ui-extension-sdk/ui";

interface MailchimpConnectionProps {
  getAuthUrl: () => string;
  onCheckConnection: () => Promise<boolean>;
  onError: (error: string) => void;
}

export const MailchimpConnection: React.FC<MailchimpConnectionProps> = ({
  getAuthUrl,
  onCheckConnection,
  onError
}) => {
  const [loading, setLoading] = useState(false);
  const [showReloadButton, setShowReloadButton] = useState(false);

  const handleReload = async () => {
    setLoading(true);
    try {
      const isConnected = await onCheckConnection();
      if (!isConnected) {
        onError("Mailchimp connection not found. Please try connecting again.");
      }
      setShowReloadButton(false);
    } catch (err) {
      onError((err as Error).message || "Failed to check Mailchimp connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box css={{ stack: "y", rowGap: "medium" }}>
      <Inline css={{font: 'heading', color: 'primary', fontWeight: 'semibold'}}>
        Welcome
      </Inline>
      <Inline>
        Connect your Mailchimp account and we&apos;ll start syncing your Stripe customers automatically.
      </Inline>
      <Inline/>

      {!showReloadButton ? (
        <Button
          href={getAuthUrl()}
          type="primary"
          onPress={() => setShowReloadButton(true)}
          css={{
            width: "fill",
          }}
        >
          Connect to Mailchimp
        </Button>
      ) : (
        <Button
          onPress={handleReload}
          loading={loading}
          type="primary"
          css={{
            width: "fill",
          }}
        >
          Reload
        </Button>
      )}
    </Box>
  );
};