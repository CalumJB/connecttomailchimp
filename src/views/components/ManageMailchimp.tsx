import React, { useState } from 'react';
import {
  Box,
  Button,
  Inline,
  Icon,
  Link,
  Spinner
} from "@stripe/ui-extension-sdk/ui";

interface ManageMailchimpProps {
  mailchimpExists: boolean;
  onDisconnect: () => Promise<void>;
  getAuthUrl: () => string;
  onError: (error: string) => void;
  onShowSuccess: (message: string) => void;
}

export const ManageMailchimp: React.FC<ManageMailchimpProps> = ({
  mailchimpExists,
  onDisconnect,
  getAuthUrl,
  onError,
  onShowSuccess
}) => {
  const [showConfirmDisconnect, setShowConfirmDisconnect] = useState(false);
  const [disconnectLoading, setDisconnectLoading] = useState(false);

  const handleDisconnect = async () => {
    setDisconnectLoading(true);
    try {
      await onDisconnect();
      setShowConfirmDisconnect(false);
      onShowSuccess("Mailchimp disconnected.");
    } catch (err) {
      onError((err as Error).message || "Failed to disconnect Mailchimp");
    } finally {
      setDisconnectLoading(false);
    }
  };

  if (!mailchimpExists) {
    return (
      
      <Box css={{
        stack: "y",
        rowGap: "medium",
        distribute: "space-between",
        alignY: "center",
        padding: "medium",
        background: "container",
        borderRadius: "medium"
      }}>
        <Inline css={{ color: 'primary', fontWeight: 'semibold'}}>
          Connect to Mailchimp
        </Inline>
        <Inline>
          Connect your Mailchimp account and we'll start syncing your Stripe customers automatically.
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
  }

  return (
    <Box css={{
      stack: "y",
      rowGap: "medium",
      distribute: "space-between",
      alignY: "center",
      padding: "medium",
      background: "container",
      borderRadius: "medium"
    }}>
      <Inline css={{color: 'primary', fontWeight: 'semibold'}}>
        Manage Mailchimp
      </Inline>
      
      <Box css={{ stack: "y", rowGap: "medium" }}>
        <Inline>
          Disconnect your Mailchimp account to stop all syncing and remove the integration.
        </Inline>

        <Box css={{ stack: "x", columnGap: "medium" }}>
          {!showConfirmDisconnect && (
            <Button 
              onPress={() => setShowConfirmDisconnect(true)}
              loading={disconnectLoading}
              type="destructive"
              size="medium"
            >
              Disconnect Mailchimp
            </Button>
          )}
        </Box>
        
        {showConfirmDisconnect && (
          <Box css={{ stack: "y", rowGap: "medium", background: "container" }}>
            <Inline css={{ fontWeight: "semibold" }}>
              Are you sure you want to disconnect Mailchimp?
            </Inline>
            <Inline>
              This will permanently remove the integration and stop all email syncing. You will need to reconnect if you want to use this service again.
            </Inline>
            <Box css={{ stack: "x", columnGap: "medium" }}>
              <Button 
                onPress={handleDisconnect}
                disabled={disconnectLoading}
                type="destructive"
                size="medium"
              >
                {disconnectLoading && (<Spinner size='small'/>)}
                Yes, Disconnect
              </Button>
              <Button 
                onPress={() => setShowConfirmDisconnect(false)}
                type="secondary"
                size="medium"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};