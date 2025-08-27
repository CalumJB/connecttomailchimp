import React, { useState } from 'react';
import {
  Box,
  Button,
  Inline
} from "@stripe/ui-extension-sdk/ui";

interface ManageMailchimpProps {
  onDisconnect: () => Promise<void>;
  onError: (error: string) => void;
  onShowSuccess: (message: string) => void;
}

export const ManageMailchimp: React.FC<ManageMailchimpProps> = ({
  onDisconnect,
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
      onShowSuccess("Mailchimp disconnected successfully");
    } catch (err) {
      onError((err as Error).message || "Failed to disconnect Mailchimp");
    } finally {
      setDisconnectLoading(false);
    }
  };

  return (
    <Box css={{ stack: "y", rowGap: "medium" }}>
      <Inline css={{font: 'heading', color: 'primary', fontWeight: 'semibold'}}>
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
          <Box css={{ stack: "y", rowGap: "small", padding: "medium", background: "container" }}>
            <Inline css={{ fontWeight: "semibold" }}>
              Are you sure you want to disconnect Mailchimp?
            </Inline>
            <Inline>
              This will permanently remove the integration and stop all email syncing. You will need to reconnect if you want to use this service again.
            </Inline>
            <Box css={{ stack: "x", columnGap: "medium" }}>
              <Button 
                onPress={handleDisconnect}
                loading={disconnectLoading}
                type="destructive"
                size="small"
              >
                Yes, Disconnect
              </Button>
              <Button 
                onPress={() => setShowConfirmDisconnect(false)}
                type="secondary"
                size="small"
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