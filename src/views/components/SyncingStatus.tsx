import React from 'react';
import {
  Box,
  Inline,
  Badge
} from "@stripe/ui-extension-sdk/ui";

interface SyncingStatusProps {
  isMailchimpConnected: boolean;
  isAudienceConfigured: boolean;
  isPermissionConfigured: boolean;
}

export const SyncingStatus: React.FC<SyncingStatusProps> = ({
  isMailchimpConnected,
  isAudienceConfigured,
  isPermissionConfigured
}) => {
  const isSyncingActive = isMailchimpConnected && isAudienceConfigured && isPermissionConfigured;

  return (
    <Box css={{
      stack: "x",
      distribute: "space-between",
      alignY: "center",
      padding: "medium",
      background: "surface",
      borderRadius: "medium",
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
          { isMailchimpConnected && isAudienceConfigured && !isPermissionConfigured && 
            "Configure permissions to begin syncing"
          }
          {
            isMailchimpConnected && isAudienceConfigured && isPermissionConfigured &&
            "New customers are being synced to Mailchimp"
          }
        </Inline>
      </Box>
      
    </Box>
  );
};