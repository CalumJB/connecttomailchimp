import React from 'react';
import {
  Box,
  Inline,
  Badge
} from "@stripe/ui-extension-sdk/ui";

interface SyncingStatusProps {
  isMailchimpConnected: boolean;
  isAudienceConfigured: boolean;
}

export const SyncingStatus: React.FC<SyncingStatusProps> = ({
  isMailchimpConnected,
  isAudienceConfigured
}) => {
  const isSyncingActive = isMailchimpConnected && isAudienceConfigured;

  return (
    <Box css={{
      stack: "x",
      distribute: "space-between",
      alignY: "center",
      padding: "medium",
      background: "container",
      borderRadius: "medium"
    }}>
      <Box css={{ stack: "y", rowGap: "small" }}>
        <Box css={{ stack: "x", columnGap: "small" }}>
          <Inline css={{  font: 'body', fontWeight: 'semibold' }}>Status</Inline>
          {isSyncingActive ? (
            <Badge type="positive">Active</Badge>
            ) : (
           <Badge type="negative">Inactive</Badge>
          )}
        </Box>
        <Inline css={{ font: 'caption' }}>
          { !isMailchimpConnected && 
            "Manage Mailchimp to begin syncing"
          }
          { isMailchimpConnected && !isAudienceConfigured && 
            "Manage Audience to begin syncing"
          }
          {
            isMailchimpConnected && isAudienceConfigured &&
            "New customers are being synced to Mailchimp"
          }
        </Inline>
      </Box>
      
    </Box>
  );
};